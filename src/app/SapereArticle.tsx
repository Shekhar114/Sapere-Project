import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/saperelogo.png";
import logo1 from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";

export default function SapereArticle() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state?.article;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Agar koi direct URL pe aaye bina data ke
  if (!article) {
    navigate("/articles");
    return null;
  }

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F2EDE4] text-[#1A2F1C] font-serif">

      {/* Header */}
      <header className="flex justify-center py-8 md:py-14 w-full max-w-[695px] mx-auto px-6">
        <img
          src={logo}
          alt="Sapere Logo"
          className="object-contain w-[140px] md:w-[179px] h-auto cursor-pointer"
          onClick={() => navigate("/articles")}
        />
      </header>

      <main className="flex-grow w-full max-w-[704px] mx-auto px-6 pb-20">

        {/* Category */}
        <p className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-sans font-semibold mb-6 md:mb-8 opacity-70 text-[#6F7140]">
          {article.category}
        </p>

        {/* Title */}
        <h1 className="text-[32px] md:text-[60px] leading-[1.2] md:leading-[1.1] font-medium mb-8 md:mb-12 tracking-tight">
          {article.title}
        </h1>

        {/* Featured Image - agar hai toh dikhao */}
        {article.image && !article.image.includes("landing1") && (
          <div className="mb-10 w-full">
            <img
              src={article.image}
              alt={article.title}
              className="w-full object-cover rounded-sm"
              style={{ maxHeight: "480px" }}
            />
          </div>
        )}

        <hr className="border-[#1A2F1C]/20 mb-6" />

        {/* Meta Info Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs md:text-sm font-sans mb-6">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="text-[#043506] font-medium">{article.author}</span>
            <span className="opacity-30">•</span>
            <span className="opacity-60">{article.date}</span>
            <span className="opacity-30">•</span>
            <span className="opacity-60">{article.readTime}</span>
          </div>

          <div className="flex gap-5 self-end sm:self-auto">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="hover:scale-110 transition-transform active:scale-95"
              aria-label="Bookmark article"
            >
              <BookmarkIcon filled={isBookmarked} />
            </button>
            <button
              onClick={handleShare}
              className="hover:scale-110 transition-transform active:scale-95"
              aria-label="Share article"
            >
              <ShareIcon />
            </button>
          </div>
        </div>

        <hr className="border-[#1A2F1C]/20 mb-8" />

        {/* Full Article Content from WordPress */}
        <div
          className="text-[16px] md:text-[18px] leading-[1.75] opacity-90 font-normal
            [&>h2]:text-[24px] [&>h2]:md:text-[32px] [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4
            [&>h3]:text-[20px] [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3
            [&>p]:mb-6 [&>p]:text-justify
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6
            [&>blockquote]:border-l-4 [&>blockquote]:border-[#2a3d2a] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:opacity-80 [&>blockquote]:my-6
            [&>img]:w-full [&>img]:rounded-sm [&>img]:my-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </main>

      {/* Footer */}
      {/* <footer className="bg-[#332C0F] text-[#F2EDE4]/60 py-8 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-sans tracking-widest uppercase">
        <div className="flex items-center gap-4 mb-6 md:mb-0">
          <img src={logo1} alt="Sapere Icon" className="w-[36px] md:w-[44px] h-auto object-contain" />
          <span>© 2026 Sapēre. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/saperepublication/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">TikTok</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </footer> */}
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

const BookmarkIcon = ({ filled }: { filled: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);