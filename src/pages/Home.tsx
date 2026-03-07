import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hudData, setHudData] = useState({ altitude: 4810, lat: 45.8327, lng: 6.8651 });
  const { t } = useLanguage();

  useEffect(() => {
    // GSAP Ticker for smooth HUD updates (Performance)
    const updateStats = () => {
      const scrollY = window.scrollY;
      const newAltitude = Math.max(0, 4810 - Math.floor(scrollY * 0.5));
      const newLat = (45.8327 + (scrollY * 0.0001)).toFixed(4);
      const newLng = (6.8651 + (scrollY * 0.0001)).toFixed(4);

      setHudData({ altitude: newAltitude, lat: parseFloat(newLat), lng: parseFloat(newLng) });
    };

    gsap.ticker.add(updateStats);
    return () => gsap.ticker.remove(updateStats);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fluid Hero Reveal
      gsap.from('.hero-text-line', {
        yPercent: 120,
        rotationZ: 3,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0,
      });

      gsap.from('.hero-meta', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.6,
      });

      // Simple scroll reveal for sections
      const sections = gsap.utils.toArray('.fluid-section');
      sections.forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
          y: 80,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out',
        });
      });

      // Standard Parallax images
      const images = gsap.utils.toArray('.parallax-image');
      images.forEach((img: any) => {
        // Scroll Parallax
        gsap.to(img, {
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          yPercent: 15,
          ease: 'none',
        });
      });

      // Simple video scale on scroll
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scrollTrigger: {
            trigger: '.hero-container',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          scale: 1.1,
          opacity: 0.4,
          ease: 'none',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-transparent text-[#fafafa]" ref={containerRef}>

      {/* Immersive Video Hero Section */}
      <section className="hero-container relative h-screen flex flex-col justify-end pb-[10vh] px-6 md:px-20 overflow-hidden z-10">

        {/* Fullscreen Video Background with Smooth Transition */}
        <div
          className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
          }}
        >
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <video
            ref={videoRef}
            src="/custom/d4717a53-4af4-47aa-ad5b-e65f19fef091.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
          ></video>
        </div>

        {/* Massive Typography */}
        <div className={`flex flex-col mb-16 pointer-events-none w-full ${t('', 'items-end pr-0 md:pr-12')}`}>
          <div className={t('overflow-hidden', 'overflow-visible mb-2 md:mb-4')}>
            <h1 className={`gpu-ready hero-text-line text-[clamp(3.5rem,14vw,12rem)] ${t('leading-[0.8] tracking-tighter', 'leading-none tracking-normal text-right')} uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] via-[#999999] to-[#444444]`} style={{ fontFamily: '"Playfair Display", serif' }}>
              {t('Technical', 'تقنية')}
            </h1>
          </div>
          <div className={`${t('overflow-hidden', 'overflow-visible')} lg:pl-[10vw]`}>
            <h1 className={`gpu-ready hero-text-line text-[clamp(3.5rem,14vw,12rem)] ${t('leading-[0.8] tracking-tighter', 'leading-none tracking-normal text-right')} uppercase italic font-light text-[#777777]`} style={{ fontFamily: '"Playfair Display", serif' }}>
              {t('Streetwear', 'عالمية')}
            </h1>
          </div>
        </div>

        {/* Hero Meta Data */}
        <div className={`gpu-ready mt-8 md:absolute md:top-1/2 ${t('md:right-6 lg:right-20 text-left md:text-right', 'md:left-6 lg:left-20 text-right md:text-left')} md:-translate-y-1/2 max-w-sm hero-meta pointer-events-auto z-20`}>
          <p className={`text-[10px] ${t('tracking-[0.3em]', 'tracking-[0.1em]')} font-medium leading-loose uppercase mb-8 md:mb-12 text-[#e5e5e5]`}>
            {t(
              <>
                KERUGGEDZ | HIGH-PERFORMANCE STREETWEAR.
                <br className="hidden md:block" />
                Where technical precision meets
                <br className="hidden md:block" />
                uncompromising silver aesthetics.
                <br className="hidden md:block" />
                The quiet luxury of survival.
              </>,
              <>
                كيروغدز | أداء عالي في الشارع.
                <br className="hidden md:block" />
                جودة عالية وسومة معقولة.
                <br className="hidden md:block" />
                لبسة نقية تبان أصلية،
                <br className="hidden md:block" />
                أناقة مضمونة لكاع الأوقات.
              </>
            )}
          </p>
          <Link
            to="/shop"
            className={`inline-flex items-center text-[10px] ${t('tracking-[0.4em]', 'tracking-[0.2em]')} font-bold uppercase pb-3 border-b border-white hover:text-[#999999] hover:border-[#999999] transition-all duration-300 group`}
          >
            {t('Explore Equipment', 'اكتشف السلعة')}
            <ArrowRight className={`${t('ml-3', 'mr-3 rotate-180')} w-4 h-4 group-hover:translate-x-2 transition-transform duration-300`} />
          </Link>
        </div>

        <div className={`absolute bottom-8 right-6 md:bottom-12 md:right-20 text-[10px] tracking-[0.4em] ${t('font-mono', 'font-sans')} uppercase opacity-40 hero-meta hidden md:block`}>
          [ {t('Scroll to Ascend', 'قم بالتمرير للصعود')} ]
        </div>
      </section>

      {/* Brand Manifesto Section */}
      <section className="gpu py-32 md:py-48 px-6 md:px-20 relative z-10 bg-transparent">
        <div className="max-w-[2400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className={`text-5xl md:text-7xl font-light tracking-tighter ${t('leading-[1.1]', 'leading-tight')}`} style={{ fontFamily: '"Playfair Display", serif' }}>
              {t(
                <>
                  The Archetype <br />
                  <span className="text-[#666]">of Exploration.</span>
                </>,
                <>
                  كيروغدز. <br />
                  <span className="text-[#666]">الزين والهمة.</span>
                </>
              )}
            </h2>
            <p className={`text-lg md:text-xl text-[#999] leading-relaxed max-w-xl font-light ${t('tracking-wide', 'tracking-normal')}`}>
              {t(
                "Keruggedz exists at the intersection of brutalist architecture and technical necessity. Every garment is a tool for the modern nomad—deconstructed, reinforced, and refined for the uncompromising terrain of the future.",
                "سلعة مضمونة، لبسة شابة وسومة معقولة. نخدمو باش نوفرولك أحسن جودة بأفضل سعر. كل قطعة مخدومة للماركات العالمية باش توالمك في كاع الظروف."
              )}
            </p>
          </div>
          <div className="relative group p-6 border border-white/5 bg-white/[0.02]">
            {/* Technical Frame Wrapper */}
            <div className="tech-frame-container relative overflow-visible inline-block w-full">
              {/* Corner Brackets - Positioned precisely relative to image container */}
              <div className="tech-bracket tech-bracket-tl"></div>
              <div className="tech-bracket tech-bracket-tr"></div>
              <div className="tech-bracket tech-bracket-bl"></div>
              <div className="tech-bracket tech-bracket-br"></div>

              {/* HUD Data Labels */}
              <div className="tech-data-label top-2 left-4 animate-flicker-slow">[ ALTITUDE: {hudData.altitude}M ]</div>
              <div className="tech-data-label bottom-2 right-4">[ COORD: {hudData.lat}° N, {hudData.lng}° E ]</div>
              <div className="tech-data-label -rotate-90 origin-left -left-6 top-1/2 opacity-20">MANIFESTO_FEED_V3.0</div>

              {/* Offset Border */}
              <div className="offset-border"></div>

              {/* Main Image Container */}
              <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-sm transition-all duration-700 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] z-10">
                <img
                  src="/assets/alpine_fog.png"
                  alt="Alpine Manifesto"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Editorial Grid */}
      <section className="gpu py-20 md:py-32 px-6 md:px-20 relative z-10 bg-transparent text-[#fafafa] fluid-section">
        <div className="max-w-[2400px] mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-end mb-24 md:mb-32 border-b border-white/10 pb-16">
            <h2 className="text-6xl md:text-8xl font-light tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] via-[#aaaaaa] to-[#222222]" style={{ fontFamily: '"Playfair Display", serif' }}>
              {t(
                <>Tactical <span className="italic relative pr-16 text-[#777777]">Editions<span className="absolute top-0 right-0 text-xl font-sans not-italic font-bold text-white">03</span></span></>,
                <>إصدارات <span className="italic relative pr-16 text-[#777777]">جديدة<span className={`absolute top-0 ${t('right-0', 'left-4')} text-xl font-sans not-italic font-bold text-white`}>03</span></span></>
              )}
            </h2>
            <p className={`text-[10px] ${t('tracking-[0.3em]', 'tracking-[0.1em]')} uppercase leading-[2.5] text-[#888] max-w-sm md:text-right mt-12 md:mt-0`}>
              {t(
                "A curated selection of artifacts designed to blur the line between digital art installations and high-end technical street couture.",
                "تشكيلة مختارة من السلعة المخدومة بعناية باش تجمع بين الرقي وتكون في متناول الجميع."
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-12 gap-4 gap-y-16 md:gap-x-16 md:gap-y-32 lg:gap-x-24">
            {[
              { id: 1, span: "md:col-span-5", img: "/custom/df691bea-0868-4ae6-87d2-19882de66969.jpg", title: "Summit Utility Bag", price: "42,000 DZD" },
              { id: 2, span: "md:col-span-3 md:mt-32 lg:mt-64", img: "/custom/1ba6aac4-639a-4473-ab2a-4fffa3216169.jpg", title: "Alpine Trekking Gloves", price: "18,000 DZD" },
              { id: 3, span: "md:col-span-4", img: "/custom/25d51d77-3336-4d01-987f-49b6e2fa8dbb.jpg", title: "Terrain Shell Jacket", price: "59,000 DZD" }
            ].map((item) => (
              <div key={item.id} className={`group ${item.span} cursor-pointer`}>
                <div className="tech-frame relative mb-8 bg-[#111111] aspect-[3/4] md:aspect-[4/5] rounded-sm transform-gpu w-full">
                  <div className="corner-tl"></div>
                  <div className="corner-tr"></div>
                  <div className="corner-bl"></div>
                  <div className="corner-br"></div>
                  <div className="w-full h-full absolute inset-0 overflow-hidden bg-[#111111]">
                    {/* HUD Label for Items */}
                    <div className="tech-data-label top-4 right-6 opacity-0 group-hover:opacity-60 transition-opacity">
                      [ SCANNING_{item.id} ]
                    </div>

                    <img
                      src={item.img}
                      alt={item.title}
                      className="gpu-ready parallax-image object-cover w-full h-full transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 opacity-80 group-hover:opacity-100 filter grayscale-[20%] group-hover:grayscale-0"
                    />
                  </div>

                  {/* Fluid Hover Reveal Button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <button className={`px-10 py-5 bg-[#fafafa] text-[#111111] text-[10px] font-bold ${t('tracking-[0.25em]', 'tracking-widest')} uppercase hover:bg-[#e5e5e5] transition-colors duration-300 w-full`}>
                      {t('View Equipment', 'شوف السلعة')}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start px-2">
                  <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#e5e5e5]">{item.title}</h3>
                  <span className="text-xs font-mono tracking-widest text-[#fafafa]">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extreme Manifesto Section with Secondary Video Storytelling */}
      <section className="gpu min-h-screen relative z-10 bg-[#111111] flex flex-col items-center justify-center overflow-hidden fluid-section text-center px-6 py-32">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen">
          <video
            src="/custom/abb9b182-a9cb-4155-9a88-aa62143faf15.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter blur-sm parallax-image scale-125"
          ></video>
        </div>

        <div className="relative z-10">
          <h2 className={`text-[8vw] ${t('leading-[1]', 'leading-tight')} font-light text-[#fafafa] max-w-[90vw] tracking-tighter`} style={{ fontFamily: '"Playfair Display", serif' }}>
            {t(
              <>Function meets <span className="italic text-[#999999]">form</span>.</>,
              <>زين وتهمة <span className="italic text-[#999999]">في لبسة وحدة</span>.</>
            )}
          </h2>
          <p className={`max-w-2xl mt-16 text-xs md:text-sm ${t('tracking-[0.3em]', 'tracking-[0.1em]')} font-medium leading-loose uppercase text-[#999999] mx-auto`}>
            {t(
              "We forge equipment that withstands the peak and commands the streets. Engineered for the unseen vanguard of the outdoors.",
              "سلعة مضمونة تقاوم وتضوي بين الناس. لباس أنيق مصمم باش تماركي بيه الوجود نتاعك."
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
