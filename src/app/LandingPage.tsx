import { useNavigate } from "react-router-dom";
import landingImg from "../assets/landing.png";
import signatureImg from "../assets/signature.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-16 py-12 md:py-0 overflow-hidden"
      style={{ backgroundColor: "#e8e4d8" }}
    >
      <section className="w-full max-w-6xl px-2 md:px-0 flex flex-col justify-center">
        {/* Changed items-center to md:items-start to pin the image and text to the top */}
        <div className="flex flex-col md:flex-row md:items-start gap-10 lg:gap-20">
          
          {/* Left Side: Main Image */}
          <div className="w-full md:w-[45%] flex-shrink-0">
            <div
              className="relative w-full overflow-hidden flex items-start justify-center"
              style={{ 
                borderRadius: "24px", 
                height: "clamp(350px, 65vh, 650px)" 
              }}
            >
              <img
                src={landingImg}
                alt="Sapēre storefront"
                className="w-full h-full object-cover md:object-contain transition-transform duration-700 hover:scale-105"
                style={{
                  display: "block",
                  objectPosition: "top" // Ensures the image content starts from the top
                }}
              />
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-start">
            <h1
              className="mb-6 md:mb-8 leading-tight"
              style={{
                fontFamily: "Crimson Pro, serif",
                fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
                color: "#1a1a0f",
                lineHeight: "1.1",
                marginTop: "0.2em" // Minor offset to perfectly align with the top of the image
              }}
            >
              Luxury finally understood.
            </h1>

            <div
              className="space-y-4 md:space-y-5 text-sm md:text-[15px] leading-relaxed"
              style={{
                color: "#2c2c1a",
                letterSpacing: "0.01em",
                lineHeight: "1.6",
              }}
            >
              <div className="font-semibold space-y-4" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", textAlign: "justify" }}>
                <p>
                  Luxury is often talked about, but rarely understood.
                </p>
                <p>
                  Sapēre was created to bring clarity to an industry that moves
                  fast, evolves constantly, and isn't always easy to navigate
                  from the inside.
                </p>
                <p>
                  It's a space for professionals across the luxury world, from
                  fashion to hospitality, strategy to culture, who want
                  perspectives that go beyond trends. Not just to stay informed,
                  but to make better decisions in their careers and within the
                  industry.
                </p>
                <p>
                  Because understanding what's happening, and why, is what
                  creates a real competitive advantage.
                </p>
                <p>
                  Sapēre brings together voices from across the industry to
                  share insights, context, and direction.
                </p>
                <p className="mb-0">
                  For those building what comes next, to the future leaders of
                  luxury, shaped here.
                </p>
              </div>

              {/* Signature Image */}
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
            onClick={() => navigate("/pillars")}
            className="px-12 py-4 text-[13px] font-semibold tracking-[0.2em] transition-all duration-300 font-work uppercase hover:shadow-lg"
            style={{
              backgroundColor: "#043506",
              color: "#f0edda",           
              border: "none",
              cursor: "pointer",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#144a16")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#043506")
            }
          >
            Explore Pillars
          </button>
        </div>
      </section>
    </main>
  );
}