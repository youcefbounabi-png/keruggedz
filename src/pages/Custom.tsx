import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function Custom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.custom-element', {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: 'power4.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-40 pb-32 px-6 md:px-12 relative z-10 bg-[#111111] text-[#fafafa]" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-20 text-center custom-element">
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
            {t(
              <>Bespoke <span className="italic">Atelier</span></>,
              <>تفصيل <span className="italic">خاص</span></>
            )}
          </h1>
          <p className={`text-[#999999] ${t('tracking-[0.3em]', 'tracking-[0.1em]')} uppercase text-xs font-semibold`}>
            {t('Shape your narrative', 'اختر الموديل اللي يناسبك')}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Immersive Atelier Image */}
          <div className="custom-element model-placeholder lg:col-span-7 aspect-[4/5] md:aspect-square bg-[#0a0a0a] rounded-sm relative overflow-hidden border border-white/5 tech-frame">
            <div className="corner-bl"></div>
            <div className="corner-br"></div>

            {/* HUD Data Overlays */}
            <div className="absolute top-6 left-6 z-20 tech-data-label opacity-60">
              [ ATELIER_FEED_V4.2 ]
              <br />
              STATUS: MANUFACTURING_ACTIVE
            </div>

            <div className="absolute bottom-6 left-6 z-20 tech-data-label opacity-40 text-[8px]">
              BLUEPRINT_ID: KRGDZ_BESPOKE_001
              <br />
              MATERIAL_SCAN: COMPLETE
            </div>

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

            <img
              src="/assets/keruggedz_atelier_workshop.png"
              alt="Keruggedz Atelier"
              className="w-full h-full object-cover opacity-80 gpu-ready hover:scale-110 transition-transform duration-[3s] ease-out"
            />
          </div>

          {/* Controls */}
          <div className="lg:col-span-5 space-y-12 flex flex-col justify-center">
            <div className="custom-element border-b border-white/10 pb-10">
              <h3 className={`text-xs font-semibold uppercase ${t('tracking-[0.3em]', 'tracking-[0.1em]')} text-[#999999] mb-8`}>{t('Selected Material', 'القماش المختارة')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <button className={`py-4 border border-white bg-white text-[#111111] font-bold text-[10px] uppercase ${t('tracking-[0.2em]', 'tracking-widest')} transition-all`}>{t('Heavy Wool', 'صوف خشن')}</button>
                <button className={`py-4 border border-white/20 hover:border-white text-[#fafafa] font-medium text-[10px] uppercase ${t('tracking-[0.2em]', 'tracking-widest')} transition-all`}>{t('Raw Silk', 'حرير طبيعي')}</button>
                <button className={`py-4 border border-white/20 hover:border-white text-[#fafafa] font-medium text-[10px] uppercase ${t('tracking-[0.2em]', 'tracking-widest')} transition-all`}>{t('Technical', 'قماش تقني')}</button>
              </div>
            </div>

            <div className="custom-element border-b border-white/10 pb-10">
              <h3 className={`text-xs font-semibold uppercase ${t('tracking-[0.3em]', 'tracking-[0.1em]')} text-[#999999] mb-8`}>{t('Hardware Finish', 'لمسة نهائية معدنية')}</h3>
              <div className="space-y-6">
                <label className="flex items-center space-x-4 cursor-pointer group">
                  <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center p-[2px]">
                    <div className="w-full h-full bg-white rounded-full"></div>
                  </div>
                  <span className={`text-[#fafafa] uppercase ${t('tracking-widest', 'tracking-normal')} text-[11px] font-medium group-hover:text-[#999999] transition-colors`}>{t('Matte Obsidian', 'حجر سبج غير لامع')}</span>
                </label>
                <label className="flex items-center space-x-4 cursor-pointer group">
                  <div className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center p-[2px]"></div>
                  <span className={`text-[#fafafa] uppercase ${t('tracking-widest', 'tracking-normal')} text-[11px] font-medium group-hover:text-[#999999] transition-colors`}>{t('Brushed Silver', 'فضة مصقولة')}</span>
                </label>
              </div>
            </div>

            <div className="custom-element pt-8">
              <div className="flex justify-between items-end mb-8">
                <span className={`text-xs font-medium ${t('tracking-[0.3em]', 'tracking-[0.1em]')} uppercase text-[#999999]`}>{t('Estimated', 'السعر')}</span>
                <span className="font-mono text-lg tracking-widest">54,000 DZD</span>
              </div>
              <button className={`w-full py-5 bg-white text-[#111111] font-bold ${t('tracking-[0.25em]', 'tracking-[0.1em]')} uppercase text-xs hover:bg-[#e5e5e5] transition-colors duration-300`}>
                {t('Commission Piece', 'أطلب تفصيل')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
