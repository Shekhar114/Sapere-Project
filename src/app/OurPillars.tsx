import { useState, useEffect } from "react";
import ornamentImg from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";
import Comingsoon from "./Comingsoon";

const pillars = [
  { id: 1, label: "EDITORIAL", desc: "Where luxury is broken down beyond the surface. Clarity on how the industry actually works.", bg: "#6F7140", hasPattern: true, patternSide: "right" },
  { id: 2, label: "SIGNATURE\nEXPERIENCES", desc: "Designed to connect you with the right people. Not everything happens online.", bg: "#999678", hasPattern: false, patternSide: "none" },
  { id: 3, label: "COLLABORATIONS", desc: "Strategic partnerships that open the right doors. Chosen carefully.", bg: "#656643", hasPattern: true, patternSide: "right" },
  { id: 4, label: "INCUBATOR", desc: "Supporting those building something worth watching.", bg: "#6F7140", hasPattern: true, patternSide: "left" },
  { id: 5, label: "MENTORSHIPS", desc: "Direct access to those who have built before you. Guidance where it actually matters.", bg: "#999678", hasPattern: false, patternSide: "none" },
  { id: 6, label: "PODCASTS", desc: "Conversations beyond the surface. What's usually not said, is explored here.", bg: "#656643", hasPattern: true, patternSide: "left" },
];

const PillarCard = ({ label, desc, hasPattern, patternSide, bg }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      style={{
        position: "relative", backgroundColor: bg, width: "284px", height: "221px",
        overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.4s ease", cursor: "default", borderRadius: "2px"
      }}
    >
      {hasPattern && (
        <img src={ornamentImg} alt=""
          style={{
            position: "absolute", top: "50%",
            left: patternSide === "left" ? "-48%" : "auto",
            right: patternSide === "right" ? "-48%" : "auto",
            transform: "translateY(-45%)", height: "115%", opacity: 0.22,
            pointerEvents: "none", zIndex: 1, objectFit: "contain"
          }}
        />
      )}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{
          fontFamily: "'Crimson Pro', serif", fontWeight: 600, fontSize: "18px",
          letterSpacing: "0.15em", color: "#f0ead6", textTransform: "uppercase",
          opacity: isHovered ? 0 : 1, transform: isHovered ? "translateY(-10px)" : "translateY(0)",
          transition: "all 0.3s ease", padding: "0 20px",
        }}>
          {label.split("\n").map((line, i) => <div key={i}>{line}</div>)}
        </div>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: isHovered ? "translate(-50%, -50%)" : "translate(-50%, -30%)",
          width: "255px", color: "#f0ead6", fontSize: "13.5px", lineHeight: "1.6",
          fontFamily: "'Work Sans', sans-serif", textAlign: "center",
          opacity: isHovered ? 1 : 0, transition: "all 0.3s ease",
          pointerEvents: "none", whiteSpace: "normal",
        }}>
          {desc}
        </div>
      </div>
    </div>
  );
};

export default function OurPillars() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Button click hone par Comingsoon dikhao — woh khud SapereArticlesPage pe jayega
  if (showComingSoon) return <Comingsoon />;

  return (
    <section style={{ backgroundColor: "#332C0F", minHeight: "100vh", padding: isMobile ? "60px 20px" : "80px 40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "900px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "center" : "flex-end", gap: isMobile ? "15px" : "30px", marginBottom: "60px", textAlign: isMobile ? "center" : "left" }}>
        <h1 style={{ margin: 0, fontSize: isMobile ? "48px" : "72px", color: "#f0ead6", fontFamily: "'Crimson Pro', serif", lineHeight: 0.9 }}>
          Our Pillars
        </h1>
        <p style={{ color: "#e8e4d8", fontSize: "16px", maxWidth: "500px", lineHeight: "1.25", fontFamily: "'Work Sans', sans-serif", margin: 0, paddingBottom: isMobile ? "0px" : "4px" }}>
          Sapēre is built on nine core pillars, each explaining the intrinsic foundation of the luxury industry
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "284px" : "repeat(3, 284px)", gap: "24px", justifyContent: "center", width: "100%" }}>
        {pillars.map((pillar) => <PillarCard key={pillar.id} {...pillar} />)}
      </div>

      <button
        onClick={() => setShowComingSoon(true)}
        style={{ marginTop: "60px", padding: "12px 32px", backgroundColor: "#f0ead6", color: "#332C0F", border: "none", fontFamily: "'Crimson Pro', serif", fontWeight: "bold", fontSize: "16px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em" }}
      >
        Read Articles
      </button>
    </section>
  );
}