import { useEffect, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 ${scrolled ? 'py-4 backdrop-blur-sm' : 'py-8'}`}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 flex justify-between items-center w-full">
        {/* Logo */}
        <a 
          href="/" 
          className="group relative flex items-center gap-2 pointer-events-auto"
        >
          <span className="newsreader text-3xl font-bold tracking-tighter text-primary">EP.</span>
          <div className="w-1.5 h-1.5 bg-primary rounded-full transition-all duration-500 group-hover:scale-[2.5] group-hover:bg-secondary"></div>
        </a>

        {/* Floating Action / Menu */}
        <div className="flex items-center gap-8 pointer-events-auto">
          <a 
            href="mailto:hello@executiveplan.co"
            className="hidden md:flex items-center gap-3 group px-4 py-2 border border-primary/5 rounded-full hover:border-primary/20 transition-colors"
          >
            <span className="inter text-[10px] uppercase tracking-[0.2em] font-bold text-primary/40 group-hover:text-primary transition-colors duration-500">
              Inquiry
            </span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all duration-700 overflow-hidden relative">
               <span className="material-symbols-outlined text-base group-hover:-translate-y-10 transition-transform duration-500 absolute">mail</span>
               <span className="material-symbols-outlined text-base translate-y-10 group-hover:translate-y-0 transition-transform duration-500">mail</span>
            </div>
          </a>

          {/* Premium Menu Trigger */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="group relative w-12 h-12 flex flex-col items-center justify-center gap-1.5 pointer-events-auto"
            aria-label="Toggle Menu"
          >
            <div className={`w-6 h-[1.5px] bg-primary transition-all duration-500 ease-expo ${isOpen ? 'rotate-45 translate-y-[4px] w-7' : 'group-hover:w-4'}`}></div>
            <div className={`w-6 h-[1.5px] bg-primary transition-all duration-500 ease-expo ${isOpen ? '-rotate-45 -translate-y-[4px] w-7' : 'group-hover:w-8'}`}></div>
            
            {/* Background Circle on Hover */}
            <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
          </button>
        </div>
      </div>
      
      {/* Premium Full-Screen Menu Overlay */}
      <div className={`fixed inset-0 bg-primary z-[-1] transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 h-screen flex flex-col justify-center pt-24 pb-8 overflow-y-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 h-full min-h-max py-12 md:py-0">
            {/* Main Links */}
            <div className="md:col-span-8 flex flex-col justify-center gap-4 md:gap-6">
              {[
                { title: 'Index', url: '/' },
                { title: 'Work', url: '#' },
                { title: 'Studio', url: '#' },
                { title: 'Journal', url: '#' },
                { title: 'Contact', url: '#' }
              ].map((link, i) => (
                <div key={i} className="overflow-hidden">
                  <a 
                    href={link.url} 
                    className={`group flex items-center gap-8 w-max transform transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0'}`} 
                    style={{ transitionDelay: `${(i + 1) * 75}ms` }}
                  >
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
            <div className="md:col-span-4 flex flex-col justify-end pb-8">
              <div className={`transform transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-12 delay-0'}`}>
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
      </div>
    </nav>
  );
}
