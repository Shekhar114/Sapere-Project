import { useState } from "react";
import { useNavigate } from "react-router-dom";

const pillars = [
  { id: 1, label: "HOSPITALITY,\nREAL ESTATE &\nPLACES", hasPattern: true, size: "large" },
  { id: 2, label: "FASHION &\nCREATIVE\nDIRECTION", hasPattern: false, size: "large" },
  { id: 3, label: "HOSPITALITY,\nREAL ESTATE &\nPLACES", hasPattern: true, size: "large" },
  { id: 4, label: "INDUSTRY NEWS\n& THE BUSINESS\nOF LUXURY", hasPattern: true, size: "large" },
  { id: 5, label: "BEAUTY\nINDUSTRY", hasPattern: false, size: "small" },
  { id: 6, label: "JEWELRY &\nWATCHES", hasPattern: true, size: "small" },
  { id: 7, label: "PEOPLE &\nPOWER", hasPattern: true, size: "small" },
  { id: 8, label: "ART, MUSIC &\nFILM", hasPattern: false, size: "small" },
  { id: 9, label: "EVENT\nREPORTING", hasPattern: true, size: "small" },
];

const OrnamentSVG = () => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      opacity: 0.18,
      pointerEvents: "none",
    }}
  >
    <path d="M100 10 L175 45 L175 110 C175 150 140 178 100 192 C60 178 25 150 25 110 L25 45 Z" fill="none" stroke="#c8c4a0" strokeWidth="1.5" />
    <path d="M100 28 L160 58 L160 108 C160 140 133 163 100 175 C67 163 40 140 40 108 L40 58 Z" fill="none" stroke="#c8c4a0" strokeWidth="1" />
    <path d="M60 40 Q100 28 140 40 Q120 52 100 48 Q80 52 60 40Z" fill="none" stroke="#c8c4a0" strokeWidth="1" />
    <path d="M20 80 Q10 90 15 105 Q20 120 10 130" fill="none" stroke="#c8c4a0" strokeWidth="1" />
    <path d="M20 80 Q30 70 35 85 Q38 95 25 98" fill="none" stroke="#c8c4a0" strokeWidth="1" />
    <path d="M180 80 Q190 90 185 105 Q180 120 190 130" fill="none" stroke="#c8c4a0" strokeWidth="1" />
    <path d="M180 80 Q170 70 165 85 Q162 95 175 98" fill="none" stroke="#c8c4a0" strokeWidth="1" />
    <text x="100" y="122" textAnchor="middle" fontFamily="Georgia, serif" fontSize="52" fill="#c8c4a0" stroke="#c8c4a0" strokeWidth="0.5">S</text>
    <path d="M70 170 Q100 180 130 170" fill="none" stroke="#c8c4a0" strokeWidth="1" />
    <path d="M80 175 Q100 185 120 175" fill="none" stroke="#c8c4a0" strokeWidth="0.8" />
  </svg>
);

interface PillarCardProps {
  label: string;
  hasPattern: boolean;
  size: string;
  onClick: () => void; // ✅ onClick prop add kiya
}

const PillarCard = ({ label, hasPattern, onClick }: PillarCardProps) => {
  const [hovered, setHovered] = useState(false);
  const lines = label.split("\n");

  return (
    <div
      onClick={onClick} // ✅ click handler
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        backgroundColor: hovered ? "#7a8a5a" : "#6b7a4e",
        overflow: "hidden",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.35)" : "0 2px 8px rgba(0,0,0,0.2)",
        borderRadius: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        aspectRatio: "1 / 1",
      }}
    >
      {hasPattern && <OrnamentSVG />}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "12px" }}>
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: "'Crimson Pro', serif",
              fontWeight: 600,
              fontSize: "clamp(10px, 1.1vw, 13px)",
              letterSpacing: "0.12em",
              color: "#f0ead6",
              lineHeight: 1.5,
              textTransform: "uppercase",
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function OurPillars() {
  const navigate = useNavigate(); // ✅ navigate hook
  const topRow = pillars.slice(0, 4);
  const bottomRow = pillars.slice(4);

  return (
    <section
      style={{
        backgroundColor: "#2e2e1a",
        minHeight: "100vh",
        padding: "80px 64px",
        fontFamily: "'Crimson Pro', serif",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "48px", marginBottom: "56px" }}>
        <h1 style={{ margin: 0, fontFamily: "'Crimson Pro', serif", fontWeight: 400, fontSize: "clamp(48px, 5vw, 72px)", color: "#f0ead6", lineHeight: 1, flexShrink: 0 }}>
          Our Pillars
        </h1>
        <p style={{ margin: 0, marginTop: "8px", fontFamily: "'Crimson Pro', serif", fontSize: "clamp(13px, 1.2vw, 16px)", color: "#c8c4a0", lineHeight: 1.6, maxWidth: "380px", fontWeight: 400 }}>
          Sapere is built on nine core pillars, each explaining the intrinsic foundation of the luxury industry
        </p>
      </div>

      {/* Top Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "16px" }}>
        {topRow.map((pillar) => (
          <PillarCard
            key={pillar.id}
            label={pillar.label}
            hasPattern={pillar.hasPattern}
            size={pillar.size}
            onClick={() => navigate("/articles")} // ✅ navigate to articles
          />
        ))}
      </div>

      {/* Bottom Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
        {bottomRow.map((pillar) => (
          <PillarCard
            key={pillar.id}
            label={pillar.label}
            hasPattern={pillar.hasPattern}
            size={pillar.size}
            onClick={() => navigate("/articles")} // ✅ navigate to articles
          />
        ))}
      </div>
    </section>
  );
}