import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const infoRef = useRef(null);
  const overlayRef = useRef(null);

  // Handle scroll state for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Magnetic Effect Hook (Internal)
  const magneticRef = useRef(null);
  const inquiryRef = useRef(null);

  useEffect(() => {
    const elements = [magneticRef.current, inquiryRef.current].filter(Boolean);
    
    elements.forEach(el => {
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = el.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        gsap.to(el, {
          x: distanceX * 0.35,
          y: distanceY * 0.35,
          duration: 0.6,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        });
      };

      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  // GSAP Animation Logic
  useEffect(() => {
    const menu = menuRef.current;
    const links = linksRef.current;
    const info = infoRef.current;

    if (isOpen) {
      if (window.lenis) window.lenis.stop();
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline();

      tl.set(menu, { visibility: 'visible' })
        .fromTo(menu, 
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" }
        )
        .fromTo(links,
          { y: 150, opacity: 0, skewY: 10 },
          { 
            y: 0, 
            opacity: 1, 
            skewY: 0,
            duration: 1.2, 
            stagger: 0.1, 
            ease: "expo.out",
            delay: -0.8
          }
        )
        .fromTo(info,
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power4.out",
            delay: -1
          }
        );
    } else {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';

      const tl = gsap.timeline();

      tl.to(links, {
        y: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "expo.in"
      })
      .to(menu, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1,
        ease: "expo.inOut",
        onComplete: () => gsap.set(menu, { visibility: 'hidden' })
      }, "-=0.2");
    }
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Hover image reveal logic
  const handleLinkHover = (e, index, isEnter) => {
    const img = e.currentTarget.querySelector('.hover-image');
    if (!img) return;

    if (isEnter) {
      gsap.to(img, {
        opacity: 1,
        scale: 1,
        rotate: index % 2 === 0 ? 5 : -5,
        duration: 0.6,
        ease: "power3.out"
      });
    } else {
      gsap.to(img, {
        opacity: 0,
        scale: 0.8,
        rotate: 0,
        duration: 0.4,
        ease: "power3.in"
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 ${scrolled ? 'py-4 backdrop-blur-sm' : 'py-8'}`}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 flex justify-between items-center w-full">
        {/* Logo */}
        <a 
          href="/" 
          onClick={closeMenu}
          className={`group relative flex items-center gap-2 pointer-events-auto transition-colors duration-500 ${isOpen ? 'text-background' : 'text-primary'}`}
        >
          <span className="newsreader text-3xl font-bold tracking-tighter">EP.</span>
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 group-hover:scale-[2.5] ${isOpen ? 'bg-background' : 'bg-primary'} group-hover:bg-secondary`}></div>
        </a>

        {/* Floating Action / Menu */}
        <div className="flex items-center gap-8 pointer-events-auto">
          <a 
            ref={inquiryRef}
            href="mailto:hello@executiveplan.co"
            className={`hidden md:flex items-center gap-3 group px-4 py-2 border rounded-full transition-all duration-500 ${isOpen ? 'border-background/10 hover:border-background/30' : 'border-primary/5 hover:border-primary/20'}`}
          >
            <span className={`inter text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-500 ${isOpen ? 'text-background/40 group-hover:text-background' : 'text-primary/40 group-hover:text-primary'}`}>
              Inquiry
            </span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-700 overflow-hidden relative ${isOpen ? 'bg-background text-primary' : 'bg-primary text-background'}`}>
               <span className="material-symbols-outlined text-base group-hover:-translate-y-10 transition-transform duration-500 absolute">mail</span>
               <span className="material-symbols-outlined text-base translate-y-10 group-hover:translate-y-0 transition-transform duration-500">mail</span>
            </div>
          </a>

          {/* Premium Menu Trigger */}
          <button 
            ref={magneticRef}
            onClick={toggleMenu}
            className="group relative w-12 h-12 flex flex-col items-center justify-center gap-1.5 pointer-events-auto"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isOpen}
          >
            <div className={`w-6 h-[1.5px] transition-all duration-500 ease-expo ${isOpen ? 'bg-background rotate-45 translate-y-[4px] w-7' : 'bg-primary group-hover:w-4'}`}></div>
            <div className={`w-6 h-[1.5px] transition-all duration-500 ease-expo ${isOpen ? 'bg-background -rotate-45 -translate-y-[4px] w-7' : 'bg-primary group-hover:w-8'}`}></div>
            
            {/* Background Circle on Hover */}
            <div className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10 ${isOpen ? 'bg-background/10' : 'bg-primary/5'}`}></div>
          </button>
        </div>
      </div>
      
      {/* Premium Full-Screen Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-primary z-[-1] pointer-events-none invisible"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 h-screen flex flex-col justify-center pt-24 pb-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 h-full min-h-max py-12 md:py-0">
            {/* Main Links */}
            <div className="md:col-span-8 flex flex-col justify-center gap-4 md:gap-6">
              {[
                { title: 'Index', url: '/', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600' },
                { title: 'Work', url: '#', img: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=600' },
                { title: 'Studio', url: '#', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600' },
                { title: 'Journal', url: '#', img: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=600' },
                { title: 'Contact', url: '#', img: 'https://images.unsplash.com/photo-1516387933999-ed3347c1b181?auto=format&fit=crop&q=80&w=600' }
              ].map((link, i) => (
                <div key={i} className="overflow-hidden">
                  <a 
                    href={link.url} 
                    onClick={closeMenu}
                    onMouseEnter={(e) => handleLinkHover(e, i, true)}
                    onMouseLeave={(e) => handleLinkHover(e, i, false)}
                    ref={el => linksRef.current[i] = el}
                    className="group flex items-center gap-8 w-max opacity-0 relative" 
                  >
                    {/* Hover Image Reveal */}
                    <div className="hover-image absolute left-[120%] top-1/2 -translate-y-1/2 w-48 h-64 bg-secondary/20 pointer-events-none opacity-0 scale-80 overflow-hidden rounded-lg hidden md:block">
                      <img 
                        src={link.img} 
                        alt="" 
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>

                    <span className="newsreader text-[12vw] md:text-[7vw] font-bold text-background leading-[0.85] tracking-tighter group-hover:italic group-hover:text-background/80 transition-all duration-500">
                      {link.title}
                    </span>
                    <span className="material-symbols-outlined text-3xl md:text-5xl text-background opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 hidden md:block">
                      arrow_forward
                    </span>
                  </a>
                </div>
              ))}
            </div>

            {/* Secondary Info */}
            <div 
              ref={infoRef}
              className="md:col-span-4 flex flex-col justify-end pb-8 opacity-0"
            >
              <div className="mb-12">
                <div className="inter text-[10px] uppercase tracking-[0.4em] font-bold text-background/30 mb-6">Connect</div>
                <ul className="flex flex-col gap-4">
                  {['Instagram', 'Twitter / X', 'LinkedIn', 'Awwwards'].map((social, i) => (
                    <li key={i}>
                      <a href="#" className="inter text-sm text-background hover:opacity-50 transition-opacity">
                        {social}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="inter text-[10px] uppercase tracking-[0.4em] font-bold text-background/30 mb-6">Location & Contact</div>
                <p className="inter text-sm text-background opacity-80">Rajasthan, India (IST)</p>
                <a href="mailto:hello@executiveplan.co" className="inter text-sm text-background mt-2 block hover:opacity-50 transition-opacity">hello@executiveplan.co</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}



