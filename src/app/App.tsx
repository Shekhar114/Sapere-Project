import { useState } from "react";
import imgLogo from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";
import { Page2 } from "./welcomePage";

export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const handleSubmit = () => {
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  // --- Logic Check ---
  // If the user has submitted OR skipped, we show the Welcome Page (Page2)
  if (submitted || skipped) {
    return <Page2 />;
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-6"
      style={{ backgroundColor: "#332c0f" }}
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-[595px]">
        {/* Logo + Tagline */}
        <div className="flex flex-col items-center w-full">
          <div className="w-[280px] h-[260px] md:w-[302px] md:h-[281px] shrink-0">
            <img
              src={imgLogo}
              alt="Sapere Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <p
            className="text-white text-center mt-2"
            style={{
              fontFamily: "'Crimson Pro', serif",
              fontWeight: 500,
              fontSize: "clamp(26px, 4vw, 36px)",
              lineHeight: "1.3",
            }}
          >
            Your inside view into the world of luxury
          </p>
        </div>

        {/* Email input + Submit */}
        <div className="flex flex-col gap-2 w-full">
          <div
            className="flex items-center justify-between pb-2 w-full"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.5)" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Enter email"
              className="bg-transparent outline-none flex-1 text-white placeholder-white"
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "75px",
              }}
            />
            <button
              onClick={handleSubmit}
              className="shrink-0 cursor-pointer transition-opacity hover:opacity-90 active:opacity-75"
              style={{
                backgroundColor: "#92671d",
                color: "#f5f3eb",
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                padding: "10px 32px",
                borderRadius: "59px",
                border: "none",
              }}
            >
              Submit
            </button>
          </div>

          {/* Skip + Disclaimer */}
          <div
            className="flex flex-col items-center text-center"
            style={{ color: "#8e8871", lineHeight: "29.25px" }}
          >
            <button
              onClick={() => setSkipped(true)}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 300,
                fontSize: "14px",
                textDecoration: "underline",
                background: "none",
                border: "none",
                color: "#8e8871",
                padding: 0,
              }}
            >
              Skip
            </button>
            <p
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 500,
                fontSize: "15px",
              }}
            >
              By subscribing, you agree to receive the Sapere newsletter. Unsubscribe anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}