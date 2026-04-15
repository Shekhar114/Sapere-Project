import { useNavigate } from "react-router-dom";
import landingImg from "../assets/landing.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-16 py-16 md:py-24"
      style={{ backgroundColor: "#e8e4d8" }}>
      <section className="w-full max-w-5xl">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">

          <div className="w-full md:w-[42%] flex-shrink-0">
            {/* Adjust maxHeight to control image height */}
            <div
              className="relative w-full overflow-hidden"
              style={{ borderRadius: "32px", maxHeight: "567px", height: "567px" }}
            >
              <img
                src={landingImg}
                alt="Sapēre storefront"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center center",
                  borderRadius: "6px",
                  display: "block",
                }}
              />
            </div>
          </div>

          <div className="w-full flex flex-col justify-start">
            <h1
              className="mb-6 md:mb-8 leading-tight"
              style={{
                fontFamily: "Crimson Pro",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                color: "#1a1a0f",
                lineHeight: "1.25",
              }}
            >
              Luxury finally understood.
            </h1>

            <div
              className="space-y-4 text-sm md:text-[15px] leading-relaxed font-aileron"
              style={{
                color: "#2c2c1a",
                letterSpacing: "0.01em",
                lineHeight: "1.75",
              }}
            >
              <p className="font-semibold" style={{ fontSize: "1rem", lineHeight: "1.38" }}>
                Luxury is often talked about, but rarely understood.
              </p>
              <p>
                Sapere was created to bring clarity to an industry that moves
                fast, evolves constantly, and isn't always easy to navigate
                from the inside.
              </p>
              <p className="font-semibold" style={{ fontSize: "1rem", lineHeight: "1.38" }}>
                It's a space for professionals across the luxury world, from
                fashion to hospitality, strategy to culture, who want
                perspectives that go beyond trends. Not just to stay informed,
                but to make better decisions in their careers and within the
                industry.
              </p>
              <p className="font-semibold" style={{ fontSize: "1rem", lineHeight: "1.38" }}>
                Because understanding what's happening, and why, is what
                creates a real competitive advantage.
              </p>
              <p className="font-semibold" style={{ fontSize: "1rem", lineHeight: "1.38" }}>
                Sapere brings together voices from across the industry to
                share insights, context, and direction. The kind that helps you
                see more clearly, think more critically, and move with
                intention.
              </p>
              <p className="font-semibold" style={{ fontSize: "1rem", lineHeight: "1.38" }}>
                For those building what comes next, to the future leaders of
                luxury, shaped here.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-14 md:mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/pillars")}
            className="px-10 py-4 text-sm font-semibold tracking-widest transition-all duration-200"
            style={{
              backgroundColor: "#043506",
              color: "#f0edda",
              fontFamily: "'Works Sans'",
              letterSpacing: "0.1em",
              border: "none",
              cursor: "pointer",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3a5e3a")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2d4a2d")
            }
          >
            Explore Pillars
          </button>
        </div>
      </section>
    </main>
  );
}