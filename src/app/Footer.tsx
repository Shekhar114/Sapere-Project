import React from 'react';
import logo1 from "../assets/b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png"; // Adjust the path to your actual logo location

interface SocialLink {
  name: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  { name: 'Instagram', href: 'https://www.instagram.com/saperepublication/' },
  { name: 'TikTok', href: '#' },
  { name: 'LinkedIn', href: '#' },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#262318] text-[#F2EDE4]/60 py-6 px-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-sans tracking-widest uppercase">
      {/* Brand Section */}
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <img
          src={logo1}
          alt="Sapere Icon"
          className="w-[44px] h-[44px] object-contain"
        />
        <span>© {currentYear} Sapēre. All rights reserved.</span>
      </div>

      {/* Navigation Section */}
      <div className="flex gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : '_self'}
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;