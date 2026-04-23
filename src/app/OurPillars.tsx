import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ornamentImg from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";

const pillars = [
  { id: 1, label: "HOSPITALITY,\nREAL ESTATE &\nPLACES", bg: "#6F7140", hasPattern: true, patternSide: "left", size: "large" },
  { id: 2, label: "FASHION &\nCREATIVE\nDIRECTION", bg: "#999678", hasPattern: false, patternSide: "none", size: "large" },
  { id: 3, label: "TECHNOLOGY,\nINNOVATION &\nSUSTAINABILITY", bg: "#656643", hasPattern: true, patternSide: "left", size: "large" },
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
  isMobile: boolean;
}

const PillarCard = ({ label, hasPattern, patternSide, size, bg, onClick, isMobile }: PillarCardProps) => {
  const [hovered, setHovered] = useState(false);
  const lines = label.split("\n");

  // Only apply hover effects if it is NOT mobile
  const activeHover = hovered && !isMobile;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        backgroundColor: activeHover ? bg + "CC" : bg,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: activeHover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: activeHover
          ? "0 12px 32px rgba(0,0,0,0.35)"
          : "0 2px 8px rgba(0,0,0,0.2)",
        borderRadius: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: isMobile ? "152px" : (size === "large" ? "232px" : "179px"),
        height: isMobile ? "152px" : (size === "large" ? "232px" : "179px"),
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
              // Fixed CSS Clamp: min must be smaller than max
              fontSize: isMobile ? "13px" : "clamp(13px, 1.1vw, 20px)",
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
  
  // Instantly initialize state to avoid layout flashes on mobile load
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const topRow = pillars.slice(0, 4);
  const bottomRow = pillars.slice(4);

  return (
    <section
      style={{
        backgroundColor: "#332C0F",
        minHeight: "100vh",
        padding: isMobile ? "60px 24px" : "80px 64px",
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
        overflowX: "hidden"
      }}
    >
      <div style={{ width: "100%", maxWidth: "1050px" }}>
        
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "flex-start",
            gap: isMobile ? "16px" : "48px",
            marginBottom: isMobile ? "40px" : "56px",
            width: "100%",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontWeight: 600,
              // Fixed CSS Clamp
              fontSize: isMobile ? "44px" : "clamp(72px, 5vw, 90px)",
              color: "#f0ead6",
              lineHeight: 1.1,
              fontFamily: "'Crimson Pro', serif",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Our Pillars
          </h1>

          <p className="font-work"
            style={{
              flex: isMobile ? "none" : 1,
              // Changed from strict "320px" to prevent overflow on very narrow screens
              width: isMobile ? "min(320px, 100%)" : "100%", 
              maxWidth: isMobile ? "320px" : "600px",
              fontSize: isMobile ? "14px" : "16px",
              color: "#e8e4d8",
              lineHeight: 1.5,
              textAlign: isMobile ? "center" : "left", 
              paddingTop: isMobile ? "0px" : "12px",
              margin: 0,
              fontWeight: 400,
            }}
          >
            {isMobile ? (
              "Sapēre is built on nine core pillars, each explaining the intrinsic foundation of the luxury industry"
            ) : (
              <>
                Sapēre is built on nine core pillars, each explaining the intrinsic
                foundation <br />of the luxury industry
              </>
            )}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
            gap: isMobile ? "16px" : "40px", 
            width: "100%"
          }}
        >
          {/* Top Row Grid */}
          <div
            style={{
              display: "grid",
              // Adjusted to exact widths for desktop to ensure proper spacing
              gridTemplateColumns: isMobile ? "repeat(2, 152px)" : "repeat(4, 232px)",
              justifyContent: isMobile ? "center" : "space-between",
              gap: "16px",
              width: "100%",
            }}
          >
            {topRow.map((pillar) => (
              <PillarCard 
                key={pillar.id} 
                {...pillar} 
                isMobile={isMobile} 
                onClick={() => navigate("/articles")} 
              />
            ))}
          </div>

          {/* Bottom Row Grid */}
          <div
            style={{
              display: "grid",
              // Adjusted to exact widths for desktop
              gridTemplateColumns: isMobile ? "repeat(2, 152px)" : "repeat(5, 179px)",
              justifyContent: isMobile ? "center" : "space-between",
              gap: "16px",
              width: "100%",
              marginTop: isMobile ? "0px" : "24px",
            }}
          >
            {bottomRow.map((pillar) => (
              <PillarCard 
                key={pillar.id} 
                {...pillar} 
                isMobile={isMobile} 
                onClick={() => navigate("/articles")} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}