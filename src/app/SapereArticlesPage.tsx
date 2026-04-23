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
  excerpt: string;
  category: string;
  date: string;
  content: string;
}

const WP_API = "https://saperepublication.com/wp/wp-json/wp/v2";

import { useState as useLocalState } from "react";
const ArticleCard = ({ article, isMobile, onArticleClick }: {
  article: Article;
  isMobile: boolean;
  onArticleClick: (article: Article) => void;
}) => {
  const [hovered, setHovered] = useLocalState(false);
  return (
    <article
      onClick={() => onArticleClick(article)}
      style={{
        cursor: "pointer",
        width: isMobile ? "325px" : "352px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          height: isMobile ? "365px" : "461px",
          overflow: "hidden",
          borderRadius: "2px",
          marginBottom: "16px",
          backgroundColor: "#d0ccc0",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.1)" : "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={article.image}
          alt={article.title}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = landing1; }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <h2 style={{
        margin: "0 0 8px 0",
        fontFamily: "'Crimson Pro', serif",
        fontWeight: 700,
        fontSize: "24px",
        color: "#2a3d2a",
        lineHeight: 1.25,
      }}>
        {article.title}
      </h2>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        fontFamily: "'Crimson Pro', serif",
        fontSize: "12px",
        color: "#6b6b60",
      }}>
        <span>{article.author}</span>
        <span>{article.readTime}</span>
      </div>
    </article>
  );
};

export default function SapereArticlesPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [logoHovered, setLogoHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Step 1: Posts fetch karo
        const res = await fetch(`${WP_API}/posts?per_page=10`);
        const posts = await res.json();

        // Step 2: Har post ke liye media alag se fetch karo
        const formatted: Article[] = await Promise.all(
          posts.map(async (post: any) => {
            const words = post.content.rendered
              .replace(/<[^>]+>/g, "")
              .split(/\s+/).length;

            const excerpt = post.excerpt.rendered
              .replace(/<[^>]+>/g, "")
              .replace(/\[…\]/g, "...")
              .replace(/\[&hellip;\]/g, "...")
              .trim();

            // Featured image - media ID se directly fetch karo
            let image = landing1;
            if (post.featured_media && post.featured_media !== 0) {
              try {
                const mediaRes = await fetch(
                  `${WP_API}/media/${post.featured_media}`
                );
                const mediaData = await mediaRes.json();
                // Full size image lo, ya large, ya medium - jo bhi mile
                image =
                  mediaData?.media_details?.sizes?.full?.source_url ||
                  mediaData?.media_details?.sizes?.large?.source_url ||
                  mediaData?.media_details?.sizes?.medium_large?.source_url ||
                  mediaData?.media_details?.sizes?.medium?.source_url ||
                  mediaData?.source_url ||
                  landing1;
              } catch {
                image = landing1;
              }
            }

            // Author fetch karo
            let author = "Sapere";
            try {
              const authorRes = await fetch(`${WP_API}/users/${post.author}`);
              const authorData = await authorRes.json();
              author = authorData?.name || "Sapere";
            } catch {
              author = "Sapere";
            }

            // Category fetch karo
            let category = "Article";
            if (post.categories && post.categories.length > 0) {
              try {
                const catRes = await fetch(
                  `${WP_API}/categories/${post.categories[0]}`
                );
                const catData = await catRes.json();
                category = catData?.name || "Article";
              } catch {
                category = "Article";
              }
            }

            return {
              id: post.id,
              title: post.title.rendered,
              author,
              date: new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              excerpt,
              category,
              image,
              readTime: `${Math.max(1, Math.ceil(words / 200))} min read`,
              content: post.content.rendered,
            };
          })
        );

        setArticles(formatted);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#e8e4d8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Crimson Pro', serif",
      fontSize: "22px",
      color: "#2a3d2a",
    }}>
      Loading articles...
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e8e4d8", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header style={{
        textAlign: "center",
        padding: isMobile ? "40px 0 32px" : "52px 0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <button
          onClick={() => navigate("/landing")}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: "0",
            transition: "all 0.3s ease",
            transform: logoHovered ? "scale(1.08)" : "scale(1)",
          }}
        >
          <img src={logo} alt="Sapere Logo" style={{
            width: isMobile ? "140px" : "179px",
            height: "auto",
            filter: logoHovered ? "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" : "none",
            transition: "filter 0.3s ease",
          }} />
        </button>
      </header>

      {/* Articles Grid */}
      <main style={{
        flex: 1,
        maxWidth: "1000px",
        margin: "0 auto",
        padding: isMobile ? "0 24px 64px" : "0 64px 80px",
        width: "100%",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "325px" : "repeat(2, 352px)",
          gap: isMobile ? "40px" : "48px 56px",
          justifyContent: "center",
        }}>
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              isMobile={isMobile}
              onArticleClick={(a) => navigate("/article", { state: { article: a } })}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#2e2e1a",
        padding: isMobile ? "32px 24px" : "28px 64px",
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img src={logo1} alt="Sapere Logo" style={{ width: "44px", height: "44px", objectFit: "contain" }} />
          <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: "13px", color: "#c8c4a0" }}>
            © 2026 Sapēre. All rights reserved.
          </span>
        </div>
        <nav style={{ display: "flex", gap: isMobile ? "12px" : "32px", flexDirection: isMobile ? "column" : "row" }}>
          {["Instagram", "TikTok", "LinkedIn"].map((link) => (
            <a key={link}
              href={link === "Instagram" ? "https://www.instagram.com/saperepublication/" : "#"}
              target={link === "Instagram" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              style={{ fontFamily: "'Crimson Pro', serif", fontSize: "14px", color: "#c8c4a0", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e8e4d8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#c8c4a0")}
            >
              {link}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}