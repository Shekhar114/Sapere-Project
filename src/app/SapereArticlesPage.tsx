import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import landing1 from "../assets/landing1.png";
import logo from "../assets/saperelogo.png";
import logo1 from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";

interface Article {
  id: number;
  title: string;
  author: string;
  readTime: string;
  image: string;
}

const articles: Article[] = [
  { id: 1, title: "The architecture of silence", author: "Sebastián Mora", readTime: "9 min read", image: landing1 },
  { id: 2, title: "The architecture of silence", author: "Sebastián Mora", readTime: "9 min read", image: landing1 },
  { id: 3, title: "The architecture of silence", author: "Sebastián Mora", readTime: "9 min read", image: landing1 },
  { id: 4, title: "The architecture of silence", author: "Sebastián Mora", readTime: "9 min read", image: landing1 },
];

const ArticleCard = ({ article, isMobile }: { article: Article; isMobile: boolean }) => {
  return (
    <article
      style={{
        cursor: "pointer",
        width: isMobile ? "325px" : "352px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image Container */}
      <div
        style={{
          width: "100%",
          height: isMobile ? "365px" : "523px",
          overflow: "hidden",
          borderRadius: "2px",
          marginBottom: "16px",
        }}
      >
        <img
          src={article.image}
          alt="article"
          style={{
            width: "100%",
            height: "100%",
            objectFit: isMobile ? "fill" : "cover",
            display: "block",
          }}
        />
      </div>

      {/* Title */}
      <h2
        style={{
          margin: "0 0 8px 0",
          fontFamily: "'Crimson Pro', serif",
          fontWeight: 700,
          fontSize: isMobile ? "24px" : "24px",
          color: "#2a3d2a",
          lineHeight: 1.25,
        }}
      >
        {article.title}
      </h2>

      {/* Author + Read Time */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontFamily: "'Crimson Pro', serif",
          fontSize: "12px",
          color: "#6b6b60",
          lineHeight: 1.13,
        }}
      >
        <span>{article.author}</span>
        <span>{article.readTime}</span>
      </div>
    </article>
  );
};

export default function SapereArticlesPage() {
  const navigate = useNavigate();
  const [logoHovered, setLogoHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
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
      {/* Header */}
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
              width: isMobile ? "140px" : "179px",
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
          flexDirection: "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT: Logo & Copyright */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
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
              maxWidth: isMobile ? "140px" : "auto",
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
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "12px" : "32px",
            alignItems: isMobile ? "flex-start" : "center",
          }}
        >
          {["Instagram", "TikTok", "LinkedIn"].map((link) => (
            <a
              key={link}
              href={link === "Instagram" ? "https://www.instagram.com/saperepublication/" : "#"}
              target={link === "Instagram" ? "_blank" : "_self"}
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