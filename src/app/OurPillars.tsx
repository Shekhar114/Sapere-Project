import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ornamentImg from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";

const pillars = [
  { id: 1, label: "HOSPITALITY,\nREAL ESTATE &\nPLACES", bg: "#6F7140", hasPattern: true, patternSide: "left", size: "large" },
  { id: 2, label: "FASHION &\nCREATIVE\nDIRECTION", bg: "#999678", hasPattern: false, patternSide: "none", size: "large" },
  { id: 3, label: "HOSPITALITY,\nREAL ESTATE &\nPLACES", bg: "#656643", hasPattern: true, patternSide: "left", size: "large" },
  { id: 4, label: "INDUSTRY NEWS\n& THE BUSINESS\nOF LUXURY", bg: "#6F7140", hasPattern: true, patternSide: "right", size: "large" },
  { id: 5, label: "BEAUTY\nINDUSTRY", bg: "#999678", hasPattern: false, patternSide: "none", size: "small" },
  { id: 6, label: "JEWELRY &\nWATCHES", bg: "#656643", hasPattern: true, patternSide: "left", size: "small" },
  { id: 7, label: "PEOPLE &\nPOWER", bg: "#6F7140", hasPattern: true, patternSide: "right", size: "small" },
  { id: 8, label: "ART, MUSIC &\nFILM", bg: "#999678", hasPattern: false, patternSide: "none", size: "small" },
  { id: 9, label: "EVENT\nREPORTING", bg: "#656643", hasPattern: true, patternSide: "left", size: "small" },
];

interface PillarCardProps {
  label: string;
  hasPattern: boolean;
  patternSide: string;
  size: string;
  bg: string;
  onClick: () => void;
}

const PillarCard = ({ label, hasPattern, patternSide, size, bg, onClick }: PillarCardProps) => {
  const [hovered, setHovered] = useState(false);
  const lines = label.split("\n");

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        backgroundColor: hovered ? bg + "CC" : bg, // 🔥 hover slightly darker
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 32px rgba(0,0,0,0.35)"
          : "0 2px 8px rgba(0,0,0,0.2)",
        borderRadius: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size === "large" ? "232px" : "179px",
        height: size === "large" ? "232px" : "179px",
      }}
    >
      {hasPattern && (
        <img
          src={ornamentImg}
          alt=""
          style={{
            position: "absolute",
            top: "50%",
            left: patternSide === "left" ? "-50%" : "auto",
            right: patternSide === "right" ? "-50%" : "auto",
            transform: "translateY(-50%)",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: patternSide === "left" ? "right center" : "left center",
            opacity: 0.25,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "12px",
        }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: "'Crimson Pro', serif",
              fontWeight: 600,
              fontSize: "clamp(20px, 1.1vw, 13px)",
              letterSpacing: "0.12em",
              color: "#f0ead6",
              lineHeight: 1.38,
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
  const navigate = useNavigate();
  const topRow = pillars.slice(0, 4);
  const bottomRow = pillars.slice(4);

  return (
    <section
      style={{
        backgroundColor: "#332C0F",
        minHeight: "100vh",
        padding: "80px 64px",
        fontFamily: "'Crimson Pro', serif",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1050px" }}>
        
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "48px",
            marginBottom: "56px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontWeight: 400,
              fontSize: "clamp(90px, 5vw, 72px)",
              color: "#f0ead6",
              lineHeight: 1.1,
            }}
          >
            Our Pillars
          </h1>

          <p
            style={{
              flex: 1,
              fontSize: "16px",
              color: "#c8c4a0",
              lineHeight: 1.6,
              textAlign: "left",
              maxWidth: "600px",
              paddingTop: "12px",
              fontFamily: "'Crimson Pro', serif",
              fontWeight: 400,
            }}
          >
            Sapere is built on nine core pillars, each explaining the intrinsic
            foundation <br />of the luxury industry
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
              width: "100%",
            }}
          >
            {topRow.map((pillar) => (
              <PillarCard key={pillar.id} {...pillar} onClick={() => navigate("/articles")} />
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "16px",
              width: "100%",
              marginTop: "24px",
            }}
          >
            {bottomRow.map((pillar) => (
              <PillarCard key={pillar.id} {...pillar} onClick={() => navigate("/articles")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}