import { ImageResponse } from "next/og";
import worksData from "@/content/works.json";

export const alt = "Muhar Ferdiansyah project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface ImageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return worksData.projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const project = worksData.projects.find((item) => item.id === slug);
  const title = project?.title ?? "Muhar Ferdiansyah";
  const headline = project?.headline ?? "Full Stack Developer";
  const category = project?.category ?? "CASE STUDY";
  const year = project?.year ?? "";

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
          padding: "64px",
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

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "4px",
              color: "#9aa79e",
            }}
          >
            {`${category}${year ? ` / ${year}` : ""}`}
          </div>
          <div
            style={{
              fontSize: "64px",
              lineHeight: 1.06,
              letterSpacing: "-1.5px",
              maxWidth: "1040px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "30px",
              lineHeight: 1.3,
              color: "#c9d3cb",
              maxWidth: "1040px",
            }}
          >
            {headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "20px",
            color: "#7f8d84",
            letterSpacing: "3px",
          }}
        >
          <div>CASE STUDY</div>
          <div>muharferdiansyah.my.id</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
