import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import landing1 from "../assets/landing1.png";
import logo from "../assets/saperelogo.png";
import logo1 from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";

interface Article {
  id: number;
  image: string;
}

// Removed title, author, and readTime as requested
const articles: Article[] = [
  { id: 1, image: landing1 },
  { id: 2, image: landing1 },
  { id: 3, image: landing1 },
  { id: 4, image: landing1 },
];

// ── Article Card ──
const ArticleCard = ({ article, isMobile }: { article: Article; isMobile: boolean }) => {
  return (
    <article
      style={{
        cursor: "pointer",
        // Mobile aur desktop dono ke liye fix width set ki hai
        width: isMobile ? "325px" : "352px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image Container */}
      <div
        style={{
          width: "100%",
          // Height ko explicitly set kar diya mobile aur desktop ke liye
          height: isMobile ? "365px" : "523px",
          overflow: "hidden",
          borderRadius: "2px",
        }}
      >
        <img
          src={article.image}
          alt="article"
          style={{
            width: "100%",
            height: "100%",
            // Mobile me 'fill' taaki puri image usi 325x365 box me fit ho jaye bina kate.
            // Note: Agar image stretched lage, to aap "fill" ki jagah "contain" likh sakte hain.
            objectFit: isMobile ? "fill" : "cover",
            display: "block",
            // Removed transition and transform for hover effect
          }}
        />
      </div>
    </article>
  );
};

export default function SapereArticlesPage() {
  const navigate = useNavigate();
  const [logoHovered, setLogoHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Hook to detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogoClick = () => {
    navigate("/landing");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e8e4d8",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with Logo */}
      <header
        style={{
          textAlign: "center",
          padding: isMobile ? "40px 0 32px" : "52px 0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <button
          onClick={handleLogoClick}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            transform: logoHovered ? "scale(1.08)" : "scale(1)",
          }}
          title="Go to Landing Page"
        >
          <img
            src={logo}
            alt="Sapere Logo - Click to navigate"
            style={{
              width: isMobile ? "140px" : "179px", // Slightly smaller logo on mobile
              height: "auto",
              objectFit: "contain",
              filter: logoHovered ? "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" : "none",
              transition: "filter 0.3s ease",
            }}
          />
        </button>
      </header>

      {/* Articles Grid */}
      <main
        style={{
          flex: 1,
          maxWidth: "1000px",
          margin: "0 auto",
          padding: isMobile ? "0 24px 64px" : "0 64px 80px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            // Mobile par 325px ka ek column, Desktop par 352px ke 2 columns
            gridTemplateColumns: isMobile ? "325px" : "repeat(2, 352px)",
            gap: isMobile ? "40px" : "48px 56px",
            justifyContent: "center",
          }}
        >
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} isMobile={isMobile} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#2e2e1a",
          padding: isMobile ? "32px 24px" : "28px 64px",
          display: "flex",
          flexDirection: "row", // Flex row even on mobile to split left and right sides
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT: Logo & Copyright */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row", // Stack logo & copyright on mobile
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? "12px" : "16px",
          }}
        >
          <img
            src={logo1}
            alt="Sapere Logo"
            style={{
              width: "44px",
              height: "44px",
              objectFit: "contain",
            }}
          />

          <span
            style={{
              fontFamily: "'Crimson Pro', serif",
              fontSize: "13px",
              color: "#c8c4a0",
              maxWidth: isMobile ? "140px" : "auto", // Wraps text neatly on mobile
              lineHeight: 1.4,
            }}
          >
            © 2026 Sapère. All rights reserved.
          </span>
        </div>

        {/* RIGHT: Social Links */}
        <nav
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row", // Stack links on mobile
            gap: isMobile ? "12px" : "32px",
            alignItems: isMobile ? "flex-start" : "center", // Align them neatly
          }}
        >
          {["Instagram", "TikTok", "LinkedIn"].map((link) => (
            <a
              key={link}
              href={
                link === "Instagram"
                  ? "https://www.instagram.com/saperepublication/"
                  : link === "TikTok"
                  ? "https://www.tiktok.com/@saperepublication"
                  : "https://www.linkedin.com/company/saperepublication"
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: "14px",
                color: "#c8c4a0",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#e8e4d8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#c8c4a0";
              }}
            >
              {link}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}