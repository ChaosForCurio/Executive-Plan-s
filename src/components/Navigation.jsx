import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[90] pointer-events-none">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 py-8 flex justify-between items-start w-full">
        {/* Logo */}
        <a 
          href="/" 
          className={`pointer-events-auto newsreader text-2xl font-bold tracking-tight transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
        >
          Joel Maynard
        </a>

        {/* Floating Rotating Button */}
        <a 
          href="mailto:hello@mynrd.co.uk"
          className="relative pointer-events-auto group hidden md:block"
        >
          <div className="relative w-32 h-32 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-110">
            {/* Rotating Text SVG */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite]">
              <path
                id="textPath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="text-[10px] uppercase tracking-[0.2em] font-medium fill-current">
                <textPath xlinkHref="#textPath">
                  • Get in touch • Get in touch • Get in touch
                </textPath>
              </text>
            </svg>
            
            {/* Center Icon */}
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-lg transition-colors duration-300 group-hover:bg-accent overflow-hidden">
               <span className="material-symbols-outlined text-background text-2xl">computer</span>
            </div>
          </div>
        </a>

        {/* Mobile Toggle (Simple for now) */}
        <button className="md:hidden pointer-events-auto p-2">
           <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>
    </div>
  );
}
