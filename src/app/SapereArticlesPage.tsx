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

  const fetchPosts = async (isBackground = false) => {
    try {
      if (!isBackground) setLoading(true);
      
      
      const res = await fetch(`${WP_API}/posts?per_page=10&_embed`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      
      const posts = await res.json();
      console.log("Fetched posts with embed:", posts);

      // Step 2: Format posts using embedded data
      const formatted: Article[] = posts.map((post: any) => {
        const words = post.content.rendered
          ? post.content.rendered.replace(/<[^>]+>/g, "").split(/\s+/).length
          : 0;

        const excerpt = post.excerpt?.rendered
          ? post.excerpt.rendered
              .replace(/<[^>]+>/g, "")
              .replace(/\[…\]/g, "...")
              .replace(/\[&hellip;\]/g, "...")
              .trim()
          : "";

        // Featured image extraction from embedded data
        let image = landing1;
        const embeddedMedia = post._embedded?.["wp:featuredmedia"]?.[0];
        if (embeddedMedia) {
          image =
            embeddedMedia?.media_details?.sizes?.full?.source_url ||
            embeddedMedia?.media_details?.sizes?.large?.source_url ||
            embeddedMedia?.source_url ||
            landing1;
        }

        // Author extraction from embedded data
        const author = post._embedded?.["author"]?.[0]?.name || "Sapere";

        // Category extraction from embedded data
        let category = "Article";
        const categories = post._embedded?.["wp:term"]?.[0];
        if (categories && categories.length > 0) {
          category = categories[0].name || "Article";
        }

        return {
          id: post.id,
          title: post.title?.rendered || "Untitled",
          author,
          date: post.date
            ? new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "",
          excerpt,
          category,
          image,
          readTime: `${Math.max(1, Math.ceil(words / 200))} min read`,
          content: post.content?.rendered || "",
        };
      });

      setArticles(formatted);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchPosts();

    // Auto-sync: Check for new posts every 60 seconds
    const interval = setInterval(() => {
      console.log("Auto-syncing articles...");
      fetchPosts(true);
    }, 6000);

    // Focus-sync: Check for new posts when user returns to the tab
    const handleFocus = () => {
      console.log("Window focused, refreshing articles...");
      fetchPosts(true);
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
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