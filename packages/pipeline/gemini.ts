// Gemini TTS (Google AI Studio, free tier), Interactions API: one request = one take. The key is read from the
// environment (the repository secret GEMINI_API_KEY), sent only in a header, never printed. Same endpoint and reply as
// tools/tts/gemini.py of quran-themes-demo, where it works every day; the two-speaker body follows Google's guide
// (`speech_config.speakers`), single-speaker keeps the list form that works there.
import type { Turn } from "./voice.ts";

const URL = "https://generativelanguage.googleapis.com/v1beta/interactions";
const RETRY_AFTER = [30, 60];   // seconds, on 429 or a server error (a daily limit is not worth a wait)

export type SpeakRequest = { model: string; turns: Turn[]; voices: Record<string, string> };

/** The request body. One text item per turn, its direction in speech_metadata (never spoken); a long pause after
 *  every turn but the last, so that the take splits at silences before Whisper is asked anything. */
export function body(r: SpeakRequest): unknown {
  const speakers = [...new Set(r.turns.map((t) => t.speaker))];
  if (speakers.length > 2) throw new Error(`${speakers.length} speakers in one request (2 at most)`);
  const dialogue = speakers.length === 2;
  const content = r.turns.map((t, i) => ({
    type: "text",
    text: i < r.turns.length - 1 ? `${t.text} <long pause>` : t.text,
    annotations: [{ type: "speech_metadata", style: t.style, ...(dialogue ? { speaker: t.speaker } : {}) }],
  }));
  const voice = (s: string) => {
    const v = r.voices[s];
    if (!v) throw new Error(`no voice for ${s}`);
    return v;
  };
  return {
    model: r.model,
    input: [{ type: "user_input", content }],
    response_format: { type: "audio" },
    generation_config: {
      speech_config: dialogue ? { speakers: speakers.map((s) => ({ speaker: s, voice: voice(s) })) } : [{ voice: voice(speakers[0]!) }],
    },
  };
}

type Reply = { steps?: { type?: string; content?: { type?: string; data?: string }[] }[] };

/** The last audio block of the model's output (base64 in steps[].content[].data). */
function audioOf(reply: Reply): Buffer {
  const blocks = (reply.steps ?? []).filter((s) => s.type === "model_output").flatMap((s) => s.content ?? []).filter((c) => c.type === "audio" && c.data);
  if (!blocks.length) throw new Error(`no audio in the reply: ${JSON.stringify(reply).slice(0, 400)}`);
  return Buffer.from(blocks.at(-1)!.data!, "base64");
}

/** A WAV file (24 kHz mono 16-bit): the reply is one, or raw PCM wrapped the same way. */
export function toWav(data: Buffer): Buffer {
  if (data.subarray(0, 4).toString("latin1") === "RIFF") return data;
  const h = Buffer.alloc(44);
  h.write("RIFF", 0, "latin1"); h.writeUInt32LE(36 + data.length, 4); h.write("WAVEfmt ", 8, "latin1");
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(24000, 24);
  h.writeUInt32LE(48000, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write("data", 36, "latin1"); h.writeUInt32LE(data.length, 40);
  return Buffer.concat([h, data]);
}

export function wavSeconds(wav: Buffer): number {
  const rate = wav.readUInt32LE(24), bytes = wav.readUInt32LE(28);
  return (wav.length - 44) / (bytes || rate * 2);
}

/** Sends one request. `onAttempt` is called before every send (the ledger counts attempts, not successes). */
export async function speak(r: SpeakRequest, key: string, onAttempt: () => void): Promise<Buffer> {
  const payload = JSON.stringify(body(r));
  for (let attempt = 0; ; attempt++) {
    onAttempt();
    const res = await fetch(URL, { method: "POST", headers: { "x-goog-api-key": key, "Content-Type": "application/json" }, body: payload });
    if (res.ok) return toWav(audioOf((await res.json()) as Reply));
    const detail = (await res.text()).slice(0, 800);
    const wait = RETRY_AFTER[attempt];
    if (![429, 500, 502, 503, 504].includes(res.status) || wait === undefined || /per day/i.test(detail)) {
      throw new Error(`Gemini answered ${res.status}: ${detail}`);
    }
    console.log(`  ${res.status}, attempt ${attempt + 1}: waiting ${wait} s`);
    await new Promise((ok) => setTimeout(ok, wait * 1000));
  }
}
