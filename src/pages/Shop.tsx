import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export default function Shop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.shop-header', {
        y: 60,
        opacity: 0,
        duration: 2,
        ease: 'power3.out',
      });

      // Sophisticated Clip-Path Curtain Reveal & Parallax
      const cards = gsap.utils.toArray('.product-card');
      cards.forEach((card: any, i: number) => {
        const imgContainer = card.querySelector('.img-container');
        const img = card.querySelector('img');

        // Reveal Animation — opacity + slide up
        gsap.fromTo(imgContainer,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
            }
          }
        );

        // Product Details Fade Up
        gsap.from(card.querySelector('.product-info'), {
          y: 15,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          }
        });

        // Scroll Parallax
        gsap.to(img, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          yPercent: 12,
          ease: 'none'
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-[25vh] pb-[20vh] px-6 md:px-20 relative z-10 bg-transparent text-[#fafafa]" ref={containerRef}>
      <div className="max-w-[2400px] mx-auto">

        <header className="gpu mb-[15vh] md:mb-[25vh] flex flex-col items-center text-center shop-header px-4">
          <h1 className="text-[12vw] font-light tracking-tighter leading-[0.85] bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] via-[#999999] to-[#333333]" style={{ fontFamily: '"Playfair Display", serif' }}>
            {t(
              <>THE <span className="italic text-[#999999]">EQUIPMENT</span></>,
              <>كل <span className="italic text-[#999999]">السّلعة</span></>
            )}
          </h1>
          <p className={`mt-16 text-[10px] md:text-xs font-semibold uppercase text-[#999999] max-w-2xl leading-[2.5] ${t('tracking-[0.4em]', 'tracking-[0.1em]')}`}>
            {t(
              <>
                Tactical artifacts forged for the modern vanguard. <br />
                Our equipment is not merely worn; it is an extension of intent. Built to adapt, protect, and command the terrain, each piece bridges the gap between high-end aesthetic rigor and uncompromising survival.
              </>,
              <>
                سلعة نقية ومضمونة. <br />
                السلعة تاعنا مصممة باش تدوم وترافقك، مخدومة باش توالم كاع الظروف، تجمع بين الأناقة الراقية والراحة اللي تستاهلها.
              </>
            )}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
          {/* Creative Filter Navigation */}
          <aside className="w-full lg:w-72 flex-shrink-0 filter-sidebar">
            <div className="sticky top-32">
              {/* Desktop: Vertical editorial layout */}
              <div className="hidden lg:block">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#666]"></div>
                  <h3 className={`text-[9px] font-bold ${t('tracking-[0.5em]', 'tracking-widest')} uppercase text-[#444]`}>
                    {t('Classification', 'التصنيف')}
                  </h3>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-[#333] to-transparent"></div>
                </div>

                <div className="pl-4 border-l border-[#1a1a1a]">
                  {[
                    { en: 'All Equipment', ar: 'جميع المعدات' },
                    { en: 'Hardware', ar: 'معدات صلبة' },
                    { en: 'Outerwear', ar: 'ملابس خارجية' },
                    { en: 'Footwear', ar: 'أحذية' },
                    { en: 'Accessories', ar: 'إكسسوارات' }
                  ].map((cat, i) => (
                    <div
                      key={cat.en}
                      className={`group cursor-pointer py-4 relative transition-all duration-500 ${i === 0 ? '' : ''}`}
                    >
                      {/* Active indicator dot */}
                      <div className={`absolute -left-[calc(1rem+2.5px)] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full transition-all duration-500 ${i === 0 ? 'bg-white scale-100 shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'bg-[#333] scale-75 group-hover:bg-[#888] group-hover:scale-100'}`}></div>

                      <div className="flex items-baseline gap-5">
                        <span className={`text-[9px] font-mono tracking-wider transition-colors duration-500 ${i === 0 ? 'text-[#888]' : 'text-[#333] group-hover:text-[#666]'}`}>
                          0{i + 1}
                        </span>
                        <span className={`text-[11px] tracking-[0.25em] uppercase font-semibold transition-all duration-500 ${i === 0 ? 'text-white' : 'text-[#555] group-hover:text-[#ccc] group-hover:tracking-[0.35em]'}`}>
                          {t(cat.en, cat.ar)}
                        </span>
                      </div>

                      {/* Expanding underline */}
                      <div className={`mt-3 h-[1px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${i === 0 ? 'w-full bg-gradient-to-r from-white/40 to-transparent' : 'w-0 group-hover:w-full bg-gradient-to-r from-white/20 to-transparent'}`}></div>
                    </div>
                  ))}
                </div>

                {/* Decorative counter */}
                <div className="mt-16 flex items-center gap-4">
                  <span className="text-[9px] font-mono text-[#333] tracking-widest">SHOWING</span>
                  <span className="text-lg font-light text-[#666]" style={{ fontFamily: '"Playfair Display", serif' }}>06</span>
                  <span className="text-[9px] font-mono text-[#333] tracking-widest">ARTIFACTS</span>
                </div>
              </div>

              {/* Mobile: Horizontal scrolling pill strip */}
              <div className="lg:hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-[1px] bg-[#444]"></div>
                  <h3 className={`text-[8px] font-bold ${t('tracking-[0.5em]', 'tracking-widest')} uppercase text-[#444]`}>
                    {t('Classification', 'التصنيف')}
                  </h3>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {[
                    { en: 'All', ar: 'الكل' },
                    { en: 'Hardware', ar: 'معدات صلبة' },
                    { en: 'Outerwear', ar: 'ملابس خارجية' },
                    { en: 'Footwear', ar: 'أحذية' },
                    { en: 'Accessories', ar: 'إكسسوارات' }
                  ].map((cat, i) => (
                    <button
                      key={cat.en}
                      className={`flex-shrink-0 px-5 py-3 rounded-full text-[9px] tracking-[0.2em] uppercase font-bold transition-all duration-500 border ${i === 0
                        ? 'bg-white/10 border-white/20 text-white backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                        : 'bg-transparent border-[#222] text-[#555] hover:border-[#444] hover:text-[#aaa] hover:bg-white/5'
                        }`}
                    >
                      <span className="font-mono text-[8px] mr-2 opacity-40">0{i + 1}</span>
                      {t(cat.en, cat.ar)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Tightened Up Grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-2 gap-x-4 gap-y-8 md:gap-x-16 md:gap-y-16 xl:gap-x-24 xl:gap-y-24">
            {PRODUCTS.map((product, idx) => (
              <div key={product.id} className={`product-card group cursor-pointer ${idx % 2 === 1 ? 'mt-[8vh] md:mt-[20vh]' : ''}`}>
                <div
                  className="gpu-ready img-container tech-frame relative bg-[#050505] mb-8 aspect-[4/5] rounded-sm transition-transform duration-700 ease-out hover:scale-[0.98] transform-gpu w-full"
                >
                  <div className="corner-tl"></div>
                  <div className="corner-tr"></div>
                  <div className="corner-bl"></div>
                  <div className="corner-br"></div>
                  {/* Clip wrapper — clips the oversized image, sits behind corner brackets */}
                  <div className="absolute inset-0 overflow-hidden z-[1]">
                    <div className="w-[110%] h-[120%] absolute -top-[10%] -left-[5%] -bottom-[10%] -right-[5%] bg-[#050505]">
                      {/* HUD Status Label */}
                      <div className="tech-data-label top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-1000 tracking-[0.5em] text-[7px]">
                        [ STATUS: READY_FOR_PROCUREMENT ]
                      </div>

                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="gpu-ready object-cover w-full h-full transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                      />
                    </div>

                    {/* Buttery smooth reveal button */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-8 bg-gradient-to-t from-black via-black/10 to-transparent opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <Link
                        to={`/product/${product.id}`}
                        className={`flex flex-col items-center justify-center w-full min-h-[4rem] py-5 bg-[#fafafa] text-[#111111] text-[11px] font-black ${t('tracking-[0.25em]', 'tracking-widest')} uppercase hover:bg-white transition-colors duration-300 pointer-events-auto gap-1`}
                      >
                        <span>{t('Shop Now', 'اشري درك')}</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="gpu product-info flex items-start justify-between px-2">
                  <div>
                    <span className="block text-[9px] font-bold tracking-[0.3em] uppercase text-[#666] mb-3">
                      {t(product.category, product.categoryAr || product.category)}
                    </span>
                    <h3 className="text-xs font-semibold tracking-widest uppercase text-[#fafafa]">
                      {t(product.name, product.nameAr || product.name)}
                    </h3>
                  </div>
                  <span className="text-xs font-mono tracking-widest text-[#fafafa]">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
