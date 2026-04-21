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

  // Function to handle native sharing
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
      // Fallback: Copy to clipboard if Web Share API is not supported
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F2EDE4] text-[#1A2F1C] font-serif selection:bg-[#1A2F1C] selection:text-white">
      
      {/* Top Logo Section */}
      <header className="flex justify-center py-14">
        <img 
          src={logo} 
          alt="Sapere Logo" 
          className="object-contain w-[179px] h-[41px]"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </header>

      <main className="flex-grow max-w-4xl mx-auto px-6 pb-20">
        <p className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-sans font-semibold mb-8 opacity-70">
          {category}
        </p>

        <h1 className="md:text-[60px] leading-[1.1] font-medium mb-12 tracking-tight">
          {title}
        </h1>

        <hr className="border-[#1A2F1C]/20 mb-6" />

        {/* Meta Info Bar with Logic */}
        <div className="flex justify-between items-center text-xs md:text-sm font-sans mb-12">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="font-bold border-b border-transparent hover:border-[#1A2F1C] cursor-pointer transition-colors">
              {author}
            </span>
            <span className="opacity-30">•</span>
            <span className="opacity-60">{date}</span>
            <span className="opacity-30">•</span>
            <span className="opacity-60">{readTime}</span>
          </div>
          
          <div className="flex gap-5">
            {/* Bookmark Toggle */}
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="hover:scale-110 transition-transform active:scale-95"
              aria-label="Bookmark article"
            >
              <BookmarkIcon filled={isBookmarked} />
            </button>
            
            {/* Share Trigger */}
            <button 
              onClick={handleShare}
              className="hover:scale-110 transition-transform active:scale-95"
              aria-label="Share article"
            >
              <ShareIcon />
            </button>
          </div>
        </div>

        <p className="text-[18px]/[1.61] leading-relaxed opacity-90 font-normal w-full text-justify">
          {excerpt}
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-[#262318] text-[#F2EDE4]/60 py-6 px-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-sans tracking-widest uppercase">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <img
            src={logo1}
            alt="Sapere Icon"
            className="w-[44px] h-[44px] object-contain"
          />
          <span>© 2026 Sapēre. All rights reserved.</span>
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

// --- Updated Icons with State Props ---
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