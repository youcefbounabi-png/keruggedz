import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic 60fps text reveals
      gsap.from('.arch-text', {
        yPercent: 120,
        opacity: 0,
        rotationZ: 2,
        duration: 2,
        stagger: 0.1,
        ease: 'power4.out',
      });

      gsap.from('.fade-up', {
        y: 60,
        opacity: 0,
        duration: 2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.5,
      });

      // Simple Parallax Elements
      const vitrines = gsap.utils.toArray('.vitrine');
      vitrines.forEach((vitrine: any, i) => {
        const speed = i % 2 === 0 ? 30 : -20;
        gsap.to(vitrine, {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: vitrine,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // Words as sculptures
      const sculpts = gsap.utils.toArray('.word-sculpture');
      sculpts.forEach((sculpt: any, i) => {
        const xMove = i % 2 === 0 ? -150 : 150;
        gsap.to(sculpt, {
          x: xMove,
          ease: 'none',
          scrollTrigger: {
            trigger: sculpt,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-[400vh] pt-40 w-full relative z-10 bg-transparent text-[#fafafa] overflow-hidden" ref={containerRef}>

      {/* Intro Portal */}
      <div className="relative w-full h-screen flex flex-col justify-center items-center px-10">
        <div className={t('overflow-hidden', 'overflow-visible mb-6')}>
          <h1 className={`gpu arch-text text-[20vw] ${t('leading-[0.7] tracking-tighter', 'leading-none tracking-normal')} uppercase font-medium text-center`} style={{ fontFamily: '"Playfair Display", serif' }}>
            {t('VOID', 'فراغ')}
          </h1>
        </div>
        <div className={`${t('overflow-hidden', 'overflow-visible')} mt-4`}>
          <h1 className={`arch-text text-[12vw] ${t('leading-[0.7] tracking-tighter', 'leading-none tracking-normal')} italic text-[#999999] opacity-80`} style={{ fontFamily: '"Playfair Display", serif' }}>
            {t('Aesthetics', 'الزين')}
          </h1>
        </div>

        <p className={`gpu fade-up mt-24 text-[10px] ${t('tracking-[0.5em]', 'tracking-[0.2em]')} font-mono uppercase text-[#e5e5e5] max-w-md text-center leading-loose mix-blend-difference`}>
          {t(
            'Entering digital art installations masquerading as commerce. Reality bends to silhouette.',
            'دخول المنشآت الفنية الرقمية المتنكرة في شكل تجارة. الواقع ينحني أمام الظل.'
          )}
        </p>

        {/* Floating intro vitrine */}
        <div className="gpu absolute top-[20%] left-[10%] w-[30vh] aspect-[3/4] vitrine z-[-1] opacity-60 mix-blend-luminosity">
          <img src="/custom/1e8b2a90-b026-43c9-ab27-1929873c6b49.jpg" alt="Relic 01" className="w-full h-full object-cover" />
        </div>
        <div className="gpu absolute bottom-[10%] right-[15%] w-[40vh] aspect-square vitrine z-[-1] opacity-70">
          <img src="/custom/db2b915c-c4b4-44bd-8937-245e591d4d56.jpg" alt="Relic 02" className="w-full h-full object-cover grayscale blur-[2px]" />
        </div>
      </div>

      {/* Infinite Canvas Journey */}
      <div className="relative w-full max-w-[2400px] mx-auto mt-[30vh]">

        {/* Massive Typography intertwining with images */}
        <div className="pointer-events-none absolute w-full h-[120%] z-0 flex flex-col justify-around overflow-hidden mix-blend-exclusion opacity-40">
          <h2 className={`gpu word-sculpture text-[25vw] font-black uppercase ${t('tracking-tighter', 'tracking-normal')} text-transparent whitespace-nowrap bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#aaaaaa] to-[#222222]`} style={{ WebkitTextStroke: '1px #fff', fontFamily: '"Inter", sans-serif' }}>{t('PHYSICS DEFIANCE', 'جودة عالية')}</h2>
          <h2 className="gpu word-sculpture text-[20vw] italic text-[#666] whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-[#999999] via-[#cccccc] to-[#444444]" style={{ fontFamily: '"Playfair Display", serif' }}>{t('Living Matter', 'سلعة نقية')}</h2>
          <h2 className="gpu word-sculpture text-[28vw] font-black uppercase whitespace-nowrap text-[#222]">{t('ETERNAL', 'صح و دائم')}</h2>
          <h2 className={`gpu word-sculpture text-[15vw] ${t('tracking-widest', 'tracking-normal')} text-[#555] whitespace-nowrap`}>{t('MUSEUM GRADE', 'درجة أولى')}</h2>
        </div>

        {/* The Relics (Images) and Storytelling */}
        <div className="relative z-10 w-full px-6 md:px-20 pb-[50vh]">

          <div className="flex flex-col md:flex-row items-center justify-between gap-20 mb-[20vh] md:mb-[30vh]">
            <div className="gpu w-full md:w-[45%] aspect-[4/5] vitrine">
              <div className="w-full h-full overflow-hidden shadow-2xl shadow-black/80">
                <img src="/custom/751ceb39-92c7-48ff-8bce-73d2901bed7b.png" alt="Relic 03" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out bg-[#111]" />
              </div>
              <p className={`mt-8 text-[9px] font-mono ${t('tracking-[0.3em]', 'tracking-[0.1em]')} uppercase text-[#666]`}>
                {t('Relic No. 003 — Structural Integrity', 'قطعة رقم 003 — الصح والمتانة')}
              </p>
            </div>
            <div className="w-[80%] md:w-[40%] flex flex-col justify-center">
              <div className="gpu w-full aspect-video vitrine mb-12 opacity-90">
                <img src="/custom/b851f539-3a5a-496a-b63f-eb3884cc6b97.jpg" alt="Relic 04" className="w-full h-full object-cover" />
              </div>
              <p className={`gpu fade-up text-xs md:text-sm ${t('tracking-[0.3em]', 'tracking-[0.1em]')} font-medium leading-[2.5] text-[#999999] uppercase max-w-md`}>
                {t(
                  'We believe in the quiet luxury of absolute survival. The materials we source are not chosen for aesthetics, but born from the necessity of extreme conditions.',
                  'نآمنو بلي الأناقة ما لازمش تكون غالية بزاف. السلعة تاعنا مخدومة باش تبان أصلية وتطول معاك، جودة تاع الصح اللي توالم كاع الناس.'
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center mb-[20vh] md:mb-[30vh] relative gap-16 md:gap-32">
            <div className="gpu w-full md:w-[50%] aspect-video vitrine z-20 mix-blend-luminosity">
              <img src="/custom/videoframe_11984.png" alt="Relic 05" className="w-full h-full object-cover grayscale-[50%]" />
            </div>
            <div className="w-[80%] md:w-[35%] flex flex-col items-start gpu vitrine z-10">
              <div className="w-full aspect-[3/4] mb-12">
                <img src="/custom/d2072969-fef7-4c6c-9675-52666c05a769.jpg" alt="Relic 06" className="w-full h-full object-cover filter brightness-75" />
              </div>
              <p className={`gpu fade-up text-[10px] md:text-xs ${t('tracking-[0.4em]', 'tracking-[0.1em]')} font-semibold leading-loose text-[#e5e5e5] uppercase bg-black/50 p-6 backdrop-blur-sm border-l border-white/20`}>
                {t(
                  'The silhouette is a byproduct of mathematical precision. Taped seams. Kevlar reinforcements. Every stitch is an architectural decision designed to outlast the wearer.',
                  'الظلال هي نتيجة ثانوية للدقة الرياضية. طبقات ملحومة. تعزيزات من الكيفلار. كل غرزة هي قرار معماري مصمم ليعيش أكثر من مرتديه.'
                )}
              </p>
            </div>
          </div>

          {/* Screenshot sequence acting as high-end dimensional rips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[15vh] md:gap-[10vw] mb-[30vh] px-[5vw]">
            <div className="gpu vitrine w-full aspect-square border border-white/10 p-4">
              <div className="w-full h-full overflow-hidden bg-black">
                <img src="/custom/Screenshot 2026-03-06 014752.png" alt="Relic 07" className="w-full h-full object-cover opacity-80" />
              </div>
              <h3 className={`mt-6 text-xs font-bold ${t('tracking-[0.4em]', 'tracking-[0.2em]')} uppercase text-white`}>{t('Dimension 01', 'البعد الأول')}</h3>
            </div>

            <div className="gpu vitrine w-[80%] aspect-[3/4] md:mt-[30vh] ml-auto">
              <div className="w-full h-full overflow-hidden">
                <img src="/custom/Screenshot 2026-03-06 014828.png" alt="Relic 08" className="w-full h-full object-cover grayscale" />
              </div>
            </div>

            <div className="gpu vitrine w-[90%] md:w-[120%] aspect-video -ml-[10vw] z-30">
              <img src="/custom/Screenshot 2026-03-06 014849.png" alt="Relic 09" className="w-full h-full object-cover shadow-2xl" />
            </div>

            <div className="gpu vitrine w-[60%] aspect-square mt-[20vh] mx-auto border-[0.5px] border-[#333] pointer-events-none">
              <img src="/custom/Screenshot 2026-03-06 014905.png" alt="Relic 10" className="w-full h-full object-cover mix-blend-screen opacity-50" />
              <h3 className="absolute -bottom-12 -left-20 text-6xl italic text-[#444]" style={{ fontFamily: '"Playfair Display", serif' }}>{t('The Genesis', 'التكوين')}</h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
