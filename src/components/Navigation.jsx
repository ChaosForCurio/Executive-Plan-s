import { useEffect, useRef } from 'react';

export default function Navigation() {
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 bg-transparent" id="main-nav">
      <div className="flex justify-between items-center px-8 py-6 w-full max-w-[1440px] mx-auto">
        <a
          className="text-2xl font-serif italic text-[#00272a] font-['Newsreader'] tracking-tight"
          href="#"
        >
          The Curator
        </a>
        <div className="hidden md:flex items-center gap-12">
          <a
            className="text-[#00272a] font-semibold border-b border-[#00272a] pb-1 font-['Newsreader'] tracking-tight hover:scale-105 transition-transform duration-300 ease-out active:scale-95"
            href="#"
          >
            Work
          </a>
          <a
            className="text-[#201b12]/60 font-medium font-['Newsreader'] tracking-tight hover:scale-105 transition-transform duration-300 ease-out active:scale-95"
            href="#"
          >
            Archive
          </a>
          <a
            className="text-[#201b12]/60 font-medium font-['Newsreader'] tracking-tight hover:scale-105 transition-transform duration-300 ease-out active:scale-95"
            href="#"
          >
            Studio
          </a>
        </div>
        <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-medium hover:scale-105 transition-transform duration-300 ease-out active:scale-95">
          Let's Talk
        </button>
      </div>
    </nav>
  );
}
