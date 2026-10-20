import { ImageResponse } from "next/og";

export const alt = "Pramod Kumar Bindhani | Full-stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0a0a0a 0%, #312e81 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 30, color: "#a5b4fc", display: "flex" }}>
          Portfolio & Blog
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 16, display: "flex" }}>
          Pramod Kumar Bindhani
        </div>
        <div style={{ fontSize: 36, color: "#d4d4d8", marginTop: 20, display: "flex" }}>
          Full-stack developer · React · Node.js · Next.js
        </div>
      </div>
    ),
    size
  );
}