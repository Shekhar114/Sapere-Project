import { useState } from "react";
import landing1 from "../assets/landing1.png";
// ── Types ──────────────────────────────────────────────────────────────────
interface Article {
  id: number;
  title: string;
  author: string;
  readTime: string;
  image: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
const articles: Article[] = [
  {
    id: 1,
    title: "The architecture of silence",
    author: "Sebastián Mora",
    readTime: "9 min read",
    image:
      landing1
  },
  {
    id: 2,
    title: "The architecture of silence",
    author: "Sebastián Mora",
    readTime: "9 min read",
    image:
      landing1
  },
  {
    id: 3,
    title: "The architecture of silence",
    author: "Sebastián Mora",
    readTime: "9 min read",
    image:
    landing1
  },
  {
    id: 4,
    title: "The architecture of silence",
    author: "Sebastián Mora",
    readTime: "9 min read",
    image:
    landing1
  },
];

// ── Crest SVG (footer) ─────────────────────────────────────────────────────
const CrestSVG = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 10 L175 45 L175 110 C175 150 140 178 100 192 C60 178 25 150 25 110 L25 45 Z"
      fill="none"
      stroke="#c8c4a0"
      strokeWidth="2"
    />
    <path
      d="M100 28 L160 58 L160 108 C160 140 133 163 100 175 C67 163 40 140 40 108 L40 58 Z"
      fill="none"
      stroke="#c8c4a0"
      strokeWidth="1.2"
    />
    <path
      d="M60 40 Q100 28 140 40 Q120 52 100 48 Q80 52 60 40Z"
      fill="none"
      stroke="#c8c4a0"
      strokeWidth="1"
    />
    <path
      d="M20 80 Q10 90 15 105 Q20 120 10 130"
      fill="none"
      stroke="#c8c4a0"
      strokeWidth="1"
    />
    <path
      d="M20 80 Q30 70 35 85 Q38 95 25 98"
      fill="none"
      stroke="#c8c4a0"
      strokeWidth="1"
    />
    <path
      d="M180 80 Q190 90 185 105 Q180 120 190 130"
      fill="none"
      stroke="#c8c4a0"
      strokeWidth="1"
    />
    <path
      d="M180 80 Q170 70 165 85 Q162 95 175 98"
      fill="none"
      stroke="#c8c4a0"
      strokeWidth="1"
    />
    <text
      x="100"
      y="122"
      textAnchor="middle"
      fontFamily="Georgia, serif"
      fontSize="52"
      fill="#c8c4a0"
    >
      S
    </text>
    <path
      d="M70 170 Q100 180 130 170"
      fill="none"
      stroke="#c8c4a0"
      strokeWidth="1"
    />
  </svg>
);

// ── Article Card ───────────────────────────────────────────────────────────
const ArticleCard = ({ article }: { article: Article }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Image */}
      <div
        style={{
          overflow: "hidden",
          marginBottom: "16px",
          borderRadius: "2px",
        }}
      >
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: "100%",
            height: "380px",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      </div>

      {/* Title */}
      <h2
        style={{
          margin: "0 0 8px 0",
          fontFamily: "Crimson Pro, serif",
          fontWeight: 700,
          fontSize: "22px",
          color: "#2a3d2a",
          lineHeight: 1.25,
          transition: "color 0.2s ease",
          letterSpacing: "-0.01em",
        }}
      >
        {article.title}
      </h2>

      {/* Meta */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontFamily: "'Crimson Pro', serif",
          fontSize: "13.5px",
          color: "#6b6b60",
          letterSpacing: "0.01em",
        }}
      >
        <span>{article.author}</span>
        <span>{article.readTime}</span>
      </div>
    </article>
  );
};

// ── Main Page ──────────────────────────────────────────────────────────────
export default function SapereArticlesPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e8e4d8",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Header / Logo ── */}
      <header
        style={{
          textAlign: "center",
          paddingTop: "52px",
          paddingBottom: "40px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "Crimson Pro",
            fontWeight: 600,
            fontSize: "42px",
            letterSpacing: "0.28em",
            color: "#1e3322",
            textTransform: "uppercase",
          }}
        >
          SAP<span style={{ letterSpacing: "0.28em" }}>Ē</span>RE
        </h1>
      </header>

      {/* ── Article Grid ── */}
      <main
        style={{
          flex: 1,
          maxWidth: "1000px",
          margin: "0 auto",
          width: "100%",
          padding: "0 64px 80px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px 56px",
          }}
        >
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          backgroundColor: "#2e2e1a",
          padding: "28px 64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: crest + copyright */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <CrestSVG />
          <span
            style={{
              fontFamily: "Crimson Pro",
              fontSize: "13px",
              color: "#c8c4a0",
              letterSpacing: "0.03em",
            }}
          >
            © 2026 Sapère. All rights reserved.
          </span>
        </div>

        {/* Right: social links */}
        <nav style={{ display: "flex", gap: "32px" }}>
          {["Instagram", "TikTok", "Linkedin"].map((link) => (
            <a
              key={link}
              href={link === "Instagram" ? "https://www.instagram.com/saperepublication/" : link === "TikTok" ? "https://www.tiktok.com/@saperepublication" : "https://www.linkedin.com/company/saperepublication"}
              style={{
                fontFamily: "Crimson Pro",
                fontSize: "14px",
                color: "#c8c4a0",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.color = "#f0ead6")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.color = "#c8c4a0")
              }
            >
              {link}
            </a>
          ))}
        </nav>
      </footer>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}