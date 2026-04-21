import React, { useState } from 'react';
import logo from "../assets/saperelogo.png";
import logo1 from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";

interface ArticleProps {
  category?: string;
  title?: string;
  author?: string;
  date?: string;
  readTime?: string;
  excerpt?: string;
}

const SapereArticle: React.FC<ArticleProps> = ({
  category = "FASHION & CREATIVE DIRECTION",
  title = "The economics of fashion show production in the digital age",
  author = "Margot Delacroix",
  date = "February 14, 2026",
  readTime = "10 min read",
  excerpt = "Fashion shows remain one of the most visible expenses in luxury brand marketing, yet their value proposition has fundamentally shifted. This analysis examines the strategic logic behind runway investments in an era of digital saturation."
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: excerpt,
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
    <div className="min-h-screen flex flex-col bg-[#F2EDE4] text-[#1A2F1C] font-serif selection:bg-[#1A2F1C] selection:text-white">
      
      {/* Top Logo Section - Made responsive width */}
      <header className="flex justify-center py-8 md:py-14 w-full max-w-[695px] mx-auto px-6">
        <img 
          src={logo} 
          alt="Sapere Logo" 
          className="object-contain w-[140px] md:w-[179px] h-auto"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </header>

      <main className="flex-grow w-full max-w-[704px] mx-auto px-6 pb-20">
        {/* Category - Adjusted font size for mobile */}
        <p className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-sans font-semibold mb-6 md:mb-8 opacity-70 text-[#6F7140]">
          {category}
        </p>

        {/* Title - Changed from fixed width to dynamic, fluid text size */}
        <h1 className="text-[32px] md:text-[60px] leading-[1.2] md:leading-[1.1] font-medium mb-8 md:mb-12 tracking-tight">
          {title}
        </h1>

        <hr className="border-[#1A2F1C]/20 mb-6" />
        
        {/* Meta Info Bar - Wrapped for small screens */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs md:text-sm font-sans mb-6">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 font-worksans">
            <span className="border-b border-transparent cursor-pointer transition-colors text-[#043506]">
              {author}
            </span>
            <span className="opacity-30">•</span>
            <span className="opacity-60">{date}</span>
            <span className="opacity-30 hidden xs:inline">•</span>
            <span className="opacity-60">{readTime}</span>
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
        
        {/* Excerpt - Removed fixed width for fluid container */}
        <p className="text-[16px] md:text-[18px] leading-[1.61] opacity-90 font-normal text-justify">
          {excerpt}
        </p>
      </main>

      {/* Footer - Existing responsive logic maintained and polished */}
      <footer className="bg-[#262318] text-[#F2EDE4]/60 py-8 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-sans tracking-widest uppercase">
        <div className="flex items-center gap-4 mb-6 md:mb-0">
          <img
            src={logo1}
            alt="Sapere Icon"
            className="w-[36px] md:w-[44px] h-auto object-contain"
          />
          <span className="text-center md:text-left">© 2026 Sapēre. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/saperepublication/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">TikTok</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

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

export default SapereArticle;