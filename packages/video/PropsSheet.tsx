// Every drawn object and effect on one page, to look at before an episode uses it (npx remotion still Sheet-props).
import type React from "react";
import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { Board, CalendarPage, Choices, Meter, Notebook, NotebookOpen, Notification, Phone, Slide, ThoughtBubble } from "../rig/fx.tsx";
import { loadFonts } from "./fonts.ts";

const Cell: React.FC<{ x: number; y: number; label: string; children: React.ReactNode }> = ({ x, y, label, children }) => (
  <g transform={`translate(${x} ${y})`}>
    {children}
    <text y={150} textAnchor="middle" fontFamily="sans-serif" fontSize={26} fill="#555">{label}</text>
  </g>
);

export const PropsSheet: React.FC = () => {
  const [handle] = useState(() => delayRender("fonts"));
  useEffect(() => { loadFonts().then(() => continueRender(handle)); }, [handle]);
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <rect width={1080} height={1920} fill="#f6f3ec" />
      <Cell x={180} y={170} label="bubble day-thu"><ThoughtBubble x={0} y={0} k={1} image="day-thu" /></Cell>
      <Cell x={540} y={170} label="bubble trophy"><ThoughtBubble x={0} y={0} k={1} image="trophy" /></Cell>
      <Cell x={900} y={170} label="bubble obstacle"><ThoughtBubble x={0} y={0} k={1} image="obstacle" /></Cell>
      <Cell x={180} y={500} label="calendar sun"><CalendarPage day="sun" /></Cell>
      <Cell x={540} y={500} label="notebook open-thu"><NotebookOpen x={0} y={0} day="thu" k={1} /></Cell>
      <Cell x={900} y={500} label="hand: slide / notebook / phone">
        <g transform="translate(-90 0) scale(1.6)"><Slide state="rejected" /></g>
        <g transform="translate(0 0) scale(1.6)"><Notebook state="writing" f={10} /></g>
        <g transform="translate(90 0) scale(1.6)"><Phone state="raise" /></g>
      </Cell>
      <Cell x={190} y={830} label="board rejected"><g transform="translate(-180 -150)"><Board state="rejected" /></g></Cell>
      <Cell x={560} y={830} label="board clear"><g transform="translate(-180 -150) scale(0.9)"><Board state="clear" /></g></Cell>
      <Cell x={900} y={830} label="board first"><g transform="translate(-150 -125) scale(0.85)"><Board state="first" /></g></Cell>
      <Cell x={270} y={1200} label="meter"><Meter x={0} y={0} k={1} f={0} level={2} /></Cell>
      <Cell x={780} y={1200} label="notification"><Notification x={0} y={0} k={1} /></Cell>
      <Cell x={540} y={1620} label="choices (countdown 2)"><Choices x={0} y={0} count={12} k={1} f={0} left={1.5} /></Cell>
    </svg>
  );
};
