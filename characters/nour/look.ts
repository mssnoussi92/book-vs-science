// Nour: invented, about 28, a colleague and friend of Karim. Two looks are on the sheet for the owner to choose.
import type { Look } from "../../packages/rig/Rig.tsx";

export const look: Look = { skin: "#e8b48f", top: "#2f8f8a", bottom: "#3b3f4d", hair: "#3a2418", hairStyle: "bun" };
export const lookHijab: Look = { ...look, hairStyle: "hijab", hijab: "#c9a27a" };
