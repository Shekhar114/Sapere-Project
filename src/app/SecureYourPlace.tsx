import { KeyboardEvent } from "react";
import imgLogo from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";

interface SecureYourPlaceProps {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  loading: boolean;
  error: string;
}

export default function SecureYourPlace({
  email,
  onEmailChange,
  onSubmit,
  onCancel,
  loading,
  error,
}: SecureYourPlaceProps) {
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center px-6"
      style={{ backgroundColor: "#332C0F" }}
    >
      <div className="w-full max-w-[760px]">
        <div className="flex flex-col items-center gap-10">
          <div className="w-[280px] h-[260px] md:w-[302px] md:h-[281px] shrink-0">
            <img
              src={imgLogo}
              alt="Sapere logo"
              className="w-full h-full object-contain opacity-90"
            />
          </div>

          <div
            style={{
              width: "min(100%, 560px)",
              display: "inline-flex",
              padding: "14px 18px",
              alignItems: "center",
              gap: "14px",
              borderBottom: "1px solid rgba(255,255,255,0.85)",
            }}
          >
            <input
              id="secure-email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") onSubmit();
                if (e.key === "Escape") onCancel();
              }}
              placeholder="Enter email"
              className="bg-transparent outline-none text-[#f0ead6]"
              style={{
                flex: 1,
                minWidth: 0,
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "14px",
                letterSpacing: "0.02em",
                padding: "10px 0",
              }}
            />
            <button
              type="button"
              onClick={onSubmit}
              disabled={loading}
              style={{
                backgroundColor: "#92671d",
                color: "#f5f3eb",
                border: "none",
                borderRadius: "999px",
                padding: "12px 20px",
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                cursor: loading ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "Saving..." : "JOIN THE WAITLIST"}
            </button>
          </div>

          {error && (
            <p
              style={{
                color: "#ff6b6b",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "13px",
              }}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
