import { useState } from "react";
import { useNavigate } from "react-router-dom";
import landing1 from "../assets/landing1.png";
import logo from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";

interface Article {
  id: number;
  image: string;
}

const articles: Article[] = [
  { id: 1, image: landing1 },
  { id: 2, image: landing1 },
  { id: 3, image: landing1 },
  { id: 4, image: landing1 },
];

// ── Article Card ──
const ArticleCard = ({ article }: { article: Article }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        width: "352px",
        height: "523px",
        overflow: "hidden",
        borderRadius: "2px",
      }}
    >
      <img
        src={article.image}
        alt="article"
        style={{
          width: "352px",
          height: "523px",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.55s",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
      />
    </article>
  );
};

export default function SapereArticlesPage() {
  const navigate = useNavigate();
  const [logoHovered, setLogoHovered] = useState(false);

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
          padding: "52px 0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        {/* Clickable Logo Button */}
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
          title="Go to Handing Page"
        >
          <img
            src={logo}
            alt="Sapere Logo - Click to navigate"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
              filter: logoHovered ? "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" : "none",
              transition: "filter 0.3s ease",
            }}
          />
        </button>

        {/* Title */}
        <h1
          style={{
            margin: 0,
            fontFamily: "Crimson Pro",
            fontWeight: 600,
            fontSize: "42px",
            letterSpacing: "0.28em",
            color: "#1e3322",
          }}
        >
          SAPĒRE
        </h1>
      </header>

      {/* Articles Grid */}
      <main
        style={{
          flex: 1,
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "0 64px 80px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 352px)",
            gap: "48px 56px",
            justifyContent: "center",
          }}
        >
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#2e2e1a",
          padding: "28px 64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT: Logo & Copyright */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            src={logo}
            alt="Sapere Logo"
            style={{
              width: "44px",
              height: "44px",
              objectFit: "contain",
            }}
          />

          <span
            style={{
              fontFamily: "Crimson Pro",
              fontSize: "13px",
              color: "#c8c4a0",
            }}
          >
            © 2026 Sapère. All rights reserved.
          </span>
        </div>

        {/* RIGHT: Social Links */}
        <nav style={{ display: "flex", gap: "32px" }}>
          {["Instagram", "TikTok", "Linkedin"].map((link) => (
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
                fontFamily: "Crimson Pro",
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