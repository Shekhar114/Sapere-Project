import imgLogo from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";

export function Page2() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-6"
      style={{ backgroundColor: "#332c0f" }}
    >
      <div className="flex flex-col items-center gap-4 w-full max-w-[595px]">
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
    </div>
  );
}

