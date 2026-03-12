import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Infini Imaginator Tech — AI Automation & Business Intelligence Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080808",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* II monogram */}
        <div style={{ display: "flex", alignItems: "center", gap: "0px", marginBottom: "40px" }}>
          {/* Left I */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "18px", height: "72px", background: "#C0392B", borderRadius: "4px" }} />
          </div>
          {/* Connector */}
          <div style={{ width: "36px", height: "14px", background: "#E8E8E8", borderRadius: "3px", margin: "0 -2px" }} />
          {/* Right I */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "18px", height: "72px", background: "#C0392B", borderRadius: "4px" }} />
          </div>
        </div>

        {/* Brand name */}
        <div
          style={{
            color: "#f5f5f5",
            fontSize: "56px",
            fontWeight: "900",
            letterSpacing: "6px",
            textAlign: "center",
            textTransform: "uppercase",
            lineHeight: 1,
            marginBottom: "20px",
          }}
        >
          INFINI IMAGINATOR TECH
        </div>

        {/* Divider */}
        <div
          style={{
            width: "120px",
            height: "2px",
            background: "#C0392B",
            marginBottom: "20px",
            borderRadius: "2px",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            color: "#999999",
            fontSize: "22px",
            letterSpacing: "3px",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          AI AUTOMATION · BUSINESS INTELLIGENCE · STRATEGY
        </div>

        {/* Domain */}
        <div
          style={{
            color: "#C0392B",
            fontSize: "18px",
            marginTop: "32px",
            letterSpacing: "4px",
            fontFamily: "monospace",
          }}
        >
          imaginator.in
        </div>
      </div>
    ),
    { ...size }
  );
}
