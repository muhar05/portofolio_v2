import { ImageResponse } from "next/og";
import siteData from "@/content/site.json";

export const dynamic = "force-static";
export const alt = "Muhar Ferdiansyah, Full Stack Engineer";
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
          backgroundColor: "#08080a",
          color: "#f4f4f5",
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
            color: "#f97316",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "9999px",
              backgroundColor: "#f97316",
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
          <div style={{ fontSize: "28px", color: "#a1a1aa" }}>
            Web, Laravel, and Flutter systems
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#71717a",
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
