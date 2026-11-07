import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { person } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

/** Shared OG card renderer, generated at build time. Uses the repo's own copy of Instrument Serif. */
export async function renderOg({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  const fonts = join(process.cwd(), "src/assets/fonts");
  const [regular, italic] = await Promise.all([
    readFile(join(fonts, "InstrumentSerif-Regular.ttf")),
    readFile(join(fonts, "InstrumentSerif-Italic.ttf")),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0A0A0B",
          color: "#F2F2F0",
          fontFamily: "Instrument Serif",
          backgroundImage: "radial-gradient(circle at 85% 20%, rgba(200,255,77,0.14), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#8A8A92" }}>
          <div style={{ width: 12, height: 12, borderRadius: 99, background: "#C8FF4D" }} />
          {eyebrow}
        </div>
        <div style={{ display: "flex", fontSize: 104, lineHeight: 0.95, letterSpacing: "-0.02em", maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#8A8A92", borderTop: "1px solid #1F1F23", paddingTop: 24 }}>
          <span style={{ fontStyle: "italic", color: "#F2F2F0" }}>{person.name}</span>
          <span>{footer}</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Instrument Serif", data: regular, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: italic, style: "italic", weight: 400 },
      ],
    }
  );
}
