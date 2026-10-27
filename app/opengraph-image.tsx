import { ImageResponse } from "next/og";
import siteData from "@/content/site.json";

export const dynamic = "force-static";
export const alt = "Muhar Ferdiansyah, Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#111c17",
          color: "#edf0ea",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "22px",
            letterSpacing: "4px",
            color: "#e07a52",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "9999px",
              backgroundColor: "#c9552e",
            }}
          />
          <div>MUHAR FERDIANSYAH</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              fontSize: "62px",
              lineHeight: 1.08,
              letterSpacing: "-1.5px",
              maxWidth: "980px",
            }}
          >
            {siteData.statement}
          </div>
          <div style={{ fontSize: "28px", color: "#9aa79e" }}>
            Next.js, Laravel, and Flutter systems
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#7f8d84",
            letterSpacing: "3px",
          }}
        >
          <div>PORTFOLIO</div>
          <div>SOFTWARE / BUSINESS / PEOPLE</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
