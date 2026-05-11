// LandingPage.tsx
import { useNavigate } from "react-router-dom";
import landingImg from "../assets/landing.png";
import signatureImg from "../assets/sign.png";

interface LandingPageProps {
  isLoggedIn: boolean;
}

export default function LandingPage({ isLoggedIn }: LandingPageProps) {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate(isLoggedIn ? "/pillars" : "/pillarsCard");
  };

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-16 py-12 md:py-0 overflow-hidden"
      style={{ backgroundColor: "#332C0F" }}
    >
      <section className="w-full max-w-6xl px-2 md:px-0 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row md:items-start gap-10 lg:gap-20">

          {/* Left: Image */}
          <div className="w-full md:w-[45%] flex-shrink-0">
            <div
              className="relative w-full overflow-hidden flex items-start justify-center"
              style={{ borderRadius: "24px", height: "clamp(350px, 65vh, 650px)" }}
            >
              <img
                src={landingImg}
                alt="Sapēre storefront"
                className="w-full h-full object-cover md:object-contain transition-transform duration-700 hover:scale-105"
                style={{ display: "block", objectPosition: "top" }}
              />
            </div>
          </div>

          {/* Right: Text */}
          <div className="w-full md:w-1/2 flex flex-col justify-start">
            <h1
              className="mb-6 md:mb-8 leading-tight"
              style={{
                fontFamily: "Crimson Pro, serif",
                fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
                color: "#f0ead6",
                lineHeight: "1.1",
                marginTop: "0.2em",
              }}
            >
              Luxury finally understood.
            </h1>

            <div
              className="space-y-4 md:space-y-5 text-sm md:text-[15px] leading-relaxed"
              style={{ color: "#e8e0c8", letterSpacing: "0.01em", lineHeight: "1.6" }}
            >
              <div
                className="font-semibold space-y-4"
                style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", textAlign: "justify" }}
              >
                <p>Luxury is often talked about, but rarely understood.</p>
                <p>
                  Sapēre was built for those creating in this industry, where access, structure,
                  and relationships define what is possible.
                </p>
                <p>
                  It brings together the elements required to build: insights, guidance, and real
                  access, not as separate pieces, but as one system.
                </p>
                <p>
                  Because building in luxury is different. <br />
                  And those who understand that, build differently. <br />
                  To the future leaders of luxury!
                </p>
              </div>

              {/* Signature */}
              <div className="flex justify-start md:justify-end pt-4">
                <img
                  src={signatureImg}
                  alt="Signature"
                  className="h-[50px] md:h-[65px] w-auto object-contain opacity-90"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12 md:mt-0.5">
          <button
            type="button"
            onClick={handleExplore}
            className="px-12 py-4 text-[13px] font-semibold tracking-[0.2em] transition-all duration-300 font-work uppercase hover:shadow-lg"
            style={{
              backgroundColor: "#f0ead6",
              color: "#332C0F",
              border: "none",
              cursor: "pointer",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#d8d0b8")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f0ead6")
            }
          >
            Explore Pillars
          </button>
        </div>
      </section>
    </main>
  );
}