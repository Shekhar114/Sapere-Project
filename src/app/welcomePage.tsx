import { useEffect, useState } from "react";
import imgLogo from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";
import LandingPage from "./LandingPage";
 
export function Page2() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);
 
  useEffect(() => {
    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => setFade(true), 1000);
    // Swap to LandingPage after fade completes
    const switchTimer = setTimeout(() => setShow(false), 1300);
 
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(switchTimer);
    };
  }, []);
 
  // Once done, render LandingPage directly
  if (!show) return <LandingPage />;
 
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-between py-16 px-6"
      style={{
        backgroundColor: "#332c0f",
        opacity: fade ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 w-full max-w-[595px]">
        {/* Logo */}
        <div className="w-[280px] h-[260px] md:w-[302px] md:h-[281px] shrink-0">
          <img
            src={imgLogo}
            alt="Sapere Logo"
            className="w-full h-full object-contain"
          />
        </div>
 
        {/* Text block */}
        <div className="flex flex-col items-center gap-4 w-full">
          <p
            className="text-white text-center w-full"
            style={{
              fontFamily: "'Crimson Pro', serif",
              fontWeight: 500,
              fontSize: "clamp(24px, 3.5vw, 36px)",
              lineHeight: "40px",
            }}
          >
            Welcome, you will gain early access
          </p>
          <p
            className="text-white text-center w-full"
            style={{
              fontFamily: "'Crimson Pro', serif",
              fontWeight: 500,
              fontSize: "clamp(24px, 3.5vw, 36px)",
              lineHeight: "40px",
            }}
          >
            Launching 1st of May
          </p>
        </div>
      </div>
 
      {/* Social links */}
      <div className="flex items-center gap-8">
        <a
          href="https://www.instagram.com/saperepublication/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2"
          style={{ textDecoration: "none", opacity: 1, transition: "opacity 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontWeight: 300,
              fontSize: "13px",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            Instagram
          </span>
        </a>
      </div>
    </div>
  );
}
 