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
  link: string;
}

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  link: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
}

const ArticleCard = ({
  article,
  isMobile,
  onArticleClick,
}: {
  article: Article;
  isMobile: boolean;
  onArticleClick: (article: Article) => void;
}) => {
  return (
    <article
      onClick={() => onArticleClick(article)}
      style={{
        cursor: "pointer",
        width: isMobile ? "325px" : "352px",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image Container */}
      <div
        style={{
          width: "100%",
          height: isMobile ? "365px" : "461px",
          overflow: "hidden",
          borderRadius: "2px",
          marginBottom: "16px",
          backgroundColor: "#ddd",
        }}
      >
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: isMobile ? "fill" : "cover",
            display: "block",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = landing1;
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
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
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
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // WordPress API URL
  const WORDPRESS_URL = "https://saperepublication.com/wp";
  const API_ENDPOINT = `${WORDPRESS_URL}/wp-json/wp/v2/posts?_embed`;

  // CORS Proxy Options (fallback)
  const CORS_PROXIES = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(API_ENDPOINT)}`,
    `https://corsproxy.io/?${encodeURIComponent(API_ENDPOINT)}`,
  ];

  // Fetch articles from WordPress
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("🔄 Attempting to fetch articles from:", API_ENDPOINT);

        let data: WordPressPost[] | null = null;

        // Try direct fetch first
        try {
          const response = await fetch(API_ENDPOINT, {
            method: "GET",
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
              Accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          data = await response.json();
          console.log("✅ Articles fetched successfully (Direct):", data);
        } catch (directError) {
          console.warn("⚠️ Direct fetch failed, trying CORS proxy...", directError);

          // If direct fetch fails, try CORS proxies
          for (let i = 0; i < CORS_PROXIES.length; i++) {
            try {
              console.log(`🔄 Trying CORS proxy ${i + 1}...`);
              const response = await fetch(CORS_PROXIES[i], {
                method: "GET",
                headers: {
                  Accept: "application/json",
                },
              });

              if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
              }

              data = await response.json();
              console.log(`✅ Articles fetched successfully (CORS Proxy ${i + 1}):`, data);
              break;
            } catch (proxyError) {
              console.warn(`❌ CORS Proxy ${i + 1} failed:`, proxyError);
              if (i === CORS_PROXIES.length - 1) {
                throw proxyError;
              }
            }
          }
        }

        if (!data || data.length === 0) {
          setArticles([]);
          setError("No articles found");
          return;
        }

        // Transform WordPress posts to Article format
        const transformedArticles: Article[] = data.map((post) => {
          // Calculate read time (rough estimate: 200 words per minute)
          const plainText = post.excerpt.rendered.replace(/<[^>]*>/g, "");
          const wordCount = plainText.split(/\s+/).length;
          const readTime = Math.max(1, Math.ceil(wordCount / 200));

          return {
            id: post.id,
            title: post.title.rendered.replace(/<[^>]*>/g, ""),
            author: "Sapēre Publication",
            readTime: `${readTime} min read`,
            image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || landing1,
            excerpt: post.excerpt.rendered,
            link: post.link,
          };
        });

        console.log("📝 Transformed articles:", transformedArticles);
        setArticles(transformedArticles);
        setError(null);
      } catch (err: any) {
        console.error("❌ Error fetching articles:", {
          message: err.message,
          name: err.name,
          stack: err.stack,
        });

        const errorMessage = err.message || "Failed to fetch articles";
        setError(errorMessage);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [retryCount]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogoClick = () => {
    navigate("/landing");
  };

  const handleArticleClick = (article: Article) => {
    navigate("/article", { state: { article } });
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  // LOADING STATE
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#e8e4d8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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

        {/* Loading Content */}
        <div
          style={{
            textAlign: "center",
            padding: "60px 24px",
            maxWidth: "500px",
          }}
        >
          {/* Spinner */}
          <div
            style={{
              width: "60px",
              height: "60px",
              margin: "0 auto 24px",
              borderRadius: "50%",
              border: "4px solid #d4cfc0",
              borderTop: "4px solid #2a3d2a",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>

          <h2
            style={{
              fontFamily: "'Crimson Pro', serif",
              fontSize: "28px",
              fontWeight: 700,
              color: "#2a3d2a",
              margin: "0 0 12px",
            }}
          >
            Loading Articles
          </h2>
          <p
            style={{
              fontFamily: "'Crimson Pro', serif",
              fontSize: "16px",
              color: "#6b6b60",
              margin: "0",
            }}
          >
            We're fetching the latest articles for you...
          </p>
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
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

        {/* Error Content */}
        <main
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "24px" : "64px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: "500px",
              padding: "40px",
              backgroundColor: "#fff",
              borderRadius: "4px",
              borderLeft: "4px solid #8b4513",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "16px",
              }}
            >
              ⚠️
            </div>

            <h2
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#2a3d2a",
                margin: "0 0 12px",
              }}
            >
              Unable to Load Articles
            </h2>

            <p
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: "16px",
                color: "#6b6b60",
                margin: "0 0 24px",
                lineHeight: 1.6,
              }}
            >
              {error}
            </p>

            <div
              style={{
                backgroundColor: "#f5f1e8",
                padding: "16px",
                borderRadius: "4px",
                marginBottom: "24px",
                textAlign: "left",
              }}
            >
              <p
                style={{
                  fontFamily: "'Crimson Pro', serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#2a3d2a",
                  margin: "0 0 8px",
                }}
              >
                Troubleshooting Tips:
              </p>
              <ul
                style={{
                  fontFamily: "'Crimson Pro', serif",
                  fontSize: "12px",
                  color: "#6b6b60",
                  margin: "0",
                  paddingLeft: "20px",
                }}
              >
                <li>Check if the WordPress site is accessible</li>
                <li>Verify internet connection</li>
                <li>Try again in a moment</li>
                <li>Check browser console (F12) for more details</li>
              </ul>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              <button
                onClick={handleRetry}
                style={{
                  fontFamily: "'Crimson Pro', serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "12px 32px",
                  backgroundColor: "#2a3d2a",
                  color: "#e8e4d8",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1a2d1a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2a3d2a";
                }}
              >
                🔄 Try Again
              </button>

              <button
                onClick={() => window.location.reload()}
                style={{
                  fontFamily: "'Crimson Pro', serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "12px 32px",
                  backgroundColor: "#6b6b60",
                  color: "#e8e4d8",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4b4b40";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#6b6b60";
                }}
              >
                🔁 Reload Page
              </button>
            </div>
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
              © 2026 Sapēre. All rights reserved.
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

  // EMPTY STATE
  if (articles.length === 0) {
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

        {/* Empty Content */}
        <main
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "24px" : "64px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: "500px",
            }}
          >
            <div
              style={{
                fontSize: "64px",
                marginBottom: "16px",
              }}
            >
              📭
            </div>

            <h2
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#2a3d2a",
                margin: "0 0 12px",
              }}
            >
              No Articles Available
            </h2>

            <p
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: "16px",
                color: "#6b6b60",
                margin: "0 0 24px",
              }}
            >
              There are no published articles at the moment. Please check back soon!
            </p>

            <button
              onClick={handleRetry}
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: "14px",
                fontWeight: 600,
                padding: "12px 32px",
                backgroundColor: "#2a3d2a",
                color: "#e8e4d8",
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1a2d1a";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2a3d2a";
              }}
            >
              🔄 Refresh
            </button>
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
              © 2026 Sapēre. All rights reserved.
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

  // SUCCESS STATE - Display dynamic articles from WordPress
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
            <ArticleCard
              key={article.id}
              article={article}
              isMobile={isMobile}
              onArticleClick={handleArticleClick}
            />
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
            © 2026 Sapēre. All rights reserved.
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