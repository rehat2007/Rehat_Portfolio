import { ImageResponse } from "next/og";

export const alt = "Alex Rivera — Frontend Engineer & Creative Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090a",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(201,247,90,0.18), transparent 52%), radial-gradient(circle at 8% 92%, rgba(167,139,250,0.16), transparent 50%)",
          color: "#f4f3ef",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "serif" }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              background: "#c9f75a",
              color: "#0b0d06",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              fontStyle: "italic",
            }}
          >
            a
          </div>
          <div style={{ fontSize: 34 }}>alex rivera.</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#8b8b84",
              fontSize: 20,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 99, background: "#c9f75a" }} />
            Available for select projects / Lisbon, PT
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              lineHeight: 0.98,
              letterSpacing: "-0.05em",
            }}
          >
            <div>Interfaces</div>
            <div style={{ display: "flex", gap: 18 }}>
              <span>that feel</span>
              <span style={{ color: "#c9f75a", fontStyle: "italic", fontFamily: "serif" }}>alive</span>
              <span>.</span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 24,
            color: "#8b8b84",
            fontSize: 20,
          }}
        >
          <span>Frontend engineer &amp; creative developer</span>
          <span>alexrivera.dev</span>
        </div>
      </div>
    ),
    size
  );
}
