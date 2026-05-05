import React, { useEffect, useState } from "react";
import imgLogo from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";
import SapereArticlesPage from "./SapereArticlesPage";

const TIMER_DURATION = 3000;

const Comingsoon: React.FC = () => {
  const [fade, setFade] = useState(false);
  const [showArticles, setShowArticles] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), TIMER_DURATION - 400);
    const timer = setTimeout(() => setShowArticles(true), TIMER_DURATION);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, []);

  if (showArticles) return <SapereArticlesPage />;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: "#332C0F",
        opacity: fade ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 50% at 50% 45%, rgba(255,245,200,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-14">
        <img src={imgLogo} alt="Crest Logo" className="w-[220px] h-auto object-contain opacity-90" />
        <p
          className="text-center font-medium tracking-wide px-6"
          style={{ color: "#e8e0c8", fontSize: "36px", lineHeight: "75px", fontFamily: "Crimson Pro", letterSpacing: "0.01em" }}
        >
          Your place is set, we'll open the doors soon.
        </p>
      </div>
    </div>
  );
};

export default Comingsoon;