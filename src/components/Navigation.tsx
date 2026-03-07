import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Globe } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { language, isAr, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Immersive scroll hide/show
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling DOWN past 100px → hide
      setNavHidden(true);
    } else {
      // Scrolling UP → show
      setNavHidden(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Mobile menu animation
  useEffect(() => {
    if (isOpen) {
      gsap.to('.mobile-menu', { x: 0, duration: 0.5, ease: 'power3.out' });
      gsap.fromTo('.menu-item',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: 'power3.out' }
      );
    } else {
      gsap.to('.mobile-menu', { x: '100%', duration: 0.5, ease: 'power3.in' });
    }
  }, [isOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-20 py-6 md:py-12 mix-blend-exclusion text-white w-full pointer-events-none"
        style={{
          transform: navHidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Left Side Links */}
        <div className={`hidden md:flex flex-1 justify-start items-center gap-6 lg:gap-10 text-[12px] font-semibold ${t('tracking-[0.4em]', 'tracking-normal')} uppercase pointer-events-auto`}>
          <Link to="/shop" className="group relative transition-colors duration-300 focus:outline-none p-2 -m-2">
            <span className="group-hover:text-[#999999] transition-colors">{t('Archive / Shop', 'المنتجات')}</span>
            <span className="absolute left-2 right-2 bottom-1 h-[1px] bg-white scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </Link>
          <span className="text-[#666]">/</span>
          <Link to="/about" className="group relative transition-colors duration-300 focus:outline-none p-2 -m-2">
            <span className="group-hover:text-[#999999] transition-colors">{t('Manifesto / About', 'حكايتنا')}</span>
            <span className="absolute left-2 right-2 bottom-1 h-[1px] bg-white scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </Link>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 md:flex-shrink-0 md:static md:translate-x-0 mx-auto text-center pointer-events-auto max-w-[50%] md:max-w-none">
          <Link to="/" aria-label="Home" className="text-[13px] sm:text-lg md:text-3xl lg:text-4xl tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.5em] font-light uppercase focus:outline-none block bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] via-[#999999] to-[#444444] animate-glow whitespace-nowrap" style={{ fontFamily: '"Playfair Display", serif' }}>
            KERUGGEDZ
          </Link>
        </div>

        {/* Right Side Links */}
        <div className={`hidden md:flex flex-1 justify-end items-center gap-6 lg:gap-10 text-[12px] font-semibold ${t('tracking-[0.4em]', 'tracking-normal')} uppercase pointer-events-auto`}>
          <Link to="/checkout" className="group relative flex items-center transition-colors duration-300 focus:outline-none p-2 -m-2">
            <ShoppingBag className={`w-4 h-4 ${isAr ? 'ml-3' : 'mr-3'} mb-[2px] opacity-70 group-hover:opacity-100 transition-opacity text-[#999999]`} />
            <span className="group-hover:text-[#999999] transition-colors">{t('Cart', 'السلة')} [0]</span>
            <span className="absolute left-2 right-2 bottom-1 h-[1px] bg-white scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100"></span>
          </Link>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 group relative transition-colors duration-300 focus:outline-none p-2 hover:text-[#999999]"
            aria-label="Toggle Language"
          >
            <Globe className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity text-[#999999]" />
            <span className="font-sans font-bold text-[13px] pt-[2px] tracking-widest">{language === 'en' ? 'ع' : 'EN'}</span>
          </button>
        </div>

        {/* Mobile Toggle & Mobile Cart */}
        <div className="flex md:hidden flex-1 justify-end items-center gap-4 pointer-events-auto z-50">
          <button aria-label="Toggle Language" onClick={toggleLanguage} className="p-2 hover:opacity-70 transition-opacity focus:outline-none flex items-center justify-center">
            <span className="font-sans font-bold text-[16px] text-white">{language === 'en' ? 'ع' : 'EN'}</span>
          </button>
          <Link to="/checkout" aria-label="Cart" className="p-2 hover:opacity-70 transition-opacity focus:outline-none border-l border-[#333] pl-4">
            <ShoppingBag className="w-5 h-5 text-white" />
          </Link>
          <button aria-label="Toggle Menu" aria-expanded={isOpen} className="p-2 hover:opacity-70 transition-opacity focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu fixed inset-0 z-40 bg-[#111111] flex flex-col items-center justify-center translate-x-full">
        <div className={`flex flex-col items-center space-y-12 text-xl font-light ${t('tracking-[0.3em]', 'tracking-normal')} uppercase text-[#fafafa]`}>
          <Link to="/shop" onClick={() => setIsOpen(false)} className="menu-item hover:text-[#999999] transition-colors duration-300 focus:outline-none p-2">{t('Shop Archive', 'المنتجات')}</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="menu-item hover:text-[#999999] transition-colors duration-300 focus:outline-none p-2">{t('Manifesto', 'حكايتنا')}</Link>
          <Link to="/checkout" onClick={() => setIsOpen(false)} className="menu-item flex items-center hover:text-[#999999] transition-colors duration-300 focus:outline-none p-2 mt-8 border-t border-white/10 pt-8">
            <ShoppingBag className={`w-5 h-5 ${isAr ? 'ml-4' : 'mr-4'}`} />
            {t('Cart', 'السلة')} [0]
          </Link>
        </div>
      </div>
    </>
  );
}
