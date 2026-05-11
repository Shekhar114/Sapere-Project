// OurPillars.tsx
import { useState, useEffect } from "react";
import ornamentImg from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";
import Comingsoon from "./Comingsoon";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxS9FxgrWwssXTt3kLzZphi91gnaH92a1iPopJudu3eCX5HfwhgpZRfsVHk4NrsY1Ml/exec";

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
        transition: "all 0.4s ease", cursor: "default", borderRadius: "2px",
      }}
    >
      {hasPattern && (
        <img
          src={ornamentImg}
          alt=""
          style={{
            position: "absolute", top: "50%",
            left: patternSide === "left" ? "-48%" : "auto",
            right: patternSide === "right" ? "-48%" : "auto",
            transform: "translateY(-45%)", height: "115%", opacity: 0.22,
            pointerEvents: "none", zIndex: 1, objectFit: "contain",
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
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleJoinUs = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), timestamp: new Date().toISOString() }),
      });
      setShowComingSoon(true); // ✅ email save hone ke baad Comingsoon dikhao
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (showComingSoon) return <Comingsoon />;

  return (
    <section
      style={{
        backgroundColor: "#332C0F",
        minHeight: "100vh",
        padding: isMobile ? "60px 20px" : "80px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header Row */}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: isMobile ? "16px" : "0px",
          marginBottom: "48px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: isMobile ? "48px" : "72px",
            color: "#f0ead6",
            fontFamily: "'Crimson Pro', serif",
            lineHeight: 0.9,
          }}
        >
          Our Pillars
        </h1>

        <button
          onClick={() => setShowComingSoon(true)}
          style={{
            padding: "12px 32px",
            backgroundColor: "#f0ead6",
            color: "#332C0F",
            border: "none",
            fontFamily: "'Crimson Pro', serif",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Read Articles
        </button>
      </div>

      {/* Pillar Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 284px)",
          gap: "24px",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {pillars.map((pillar) => (
          <PillarCard key={pillar.id} {...pillar} />
        ))}
      </div>

      {/* Email Subscribe Row */}
      <div style={{ marginTop: "52px", width: "100%", maxWidth: isMobile ? "100%" : "440px" }}>
        <div
          style={{
            borderBottom: "1.5px solid #a09878",
            display: "flex",
            alignItems: "center",
            paddingBottom: "10px",
            gap: "12px",
          }}
        >
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJoinUs()}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#f0ead6",
              fontSize: "15px",
              fontFamily: "'Work Sans', sans-serif",
              letterSpacing: "0.03em",
              padding: 0,
            }}
          />

          <button
            onClick={handleJoinUs}
            disabled={loading}
            style={{
              padding: "9px 22px",
              backgroundColor: "#8B6914",
              color: "#f0ead6",
              border: "none",
              borderRadius: "999px",
              fontFamily: "'Work Sans', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              cursor: loading ? "not-allowed" : "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
              flexShrink: 0,
              opacity: loading ? 0.6 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "Saving..." : "Join Us"}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p
            style={{
              marginTop: "8px",
              color: "#ff6b6b",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "13px",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </section>
  );
}