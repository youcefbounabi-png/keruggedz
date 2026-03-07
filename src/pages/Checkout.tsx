import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const ALGERIA_WILAYAS = [
  "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna",
  "06 - Béjaïa", "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira",
  "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou",
  "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda",
  "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine",
  "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla",
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arréridj", "35 - Boumerdès",
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela",
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma",
  "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - Timimoun", "50 - Bordj Badji Mokhtar",
  "51 - Ouled Djellal", "52 - Béni Abbès", "53 - In Salah", "54 - In Guezzam", "55 - Touggourt",
  "56 - Djanet", "57 - El M'Ghair", "58 - El Meniaa"
];

export default function Checkout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Cinematic image reveal
      gsap.fromTo('.checkout-image-container',
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.8,
          ease: 'power4.inOut'
        }
      );

      gsap.from('.checkout-image', {
        scale: 1.2,
        duration: 2.5,
        ease: 'power3.out'
      });

      // Form elements stagger
      gsap.from('.checkout-element', {
        x: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.6
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isSubmitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen relative z-10 bg-transparent text-[#fafafa]" ref={containerRef}>
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* Immersive Imagery - Banner on Mobile, Split Screen on Desktop */}
        <div className="gpu checkout-image-container w-full h-[35vh] lg:h-auto lg:w-1/2 relative overflow-hidden bg-[#050505]">
          <img
            src="/custom/1ba6aac4-639a-4473-ab2a-4fffa3216169.jpg"
            alt="Checkout Editorial"
            className="gpu checkout-image w-full h-full object-cover filter grayscale-[30%] opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]"></div>

          <div className="absolute bottom-6 left-6 md:bottom-20 md:left-20">
            <h2 className="text-[10vw] md:text-[5vw] font-light tracking-tighter leading-none" style={{ fontFamily: '"Playfair Display", serif' }}>
              {t('Finalize', 'تأكيد')} <br />
              <span className="italic text-[#888]">{t('Order', 'الطلب')}</span>
            </h2>
          </div>
        </div>

        {/* Right Side: Form / Success */}
        <div className="w-full lg:w-1/2 pt-16 lg:pt-32 pb-20 px-6 md:px-16 lg:px-24 flex flex-col justify-center">

          {!isSubmitted ? (
            <div className="max-w-xl">
              <Link
                to="/shop"
                className="gpu checkout-element inline-flex items-center text-sm font-bold tracking-[0.25em] uppercase text-[#ffffff] hover:text-[#cccccc] transition-colors duration-300 mb-16 opacity-90 hover:opacity-100"
              >
                <ArrowLeft className="w-5 h-5 mr-4" />
                {t('Return to Cart', 'العودة إلى السلة')}
              </Link>

              <form onSubmit={handleSubmit}>
                <div className="gpu checkout-element mb-12">
                  <h3 className={`text-xs font-bold tracking-[0.3em] uppercase text-[#555] mb-8`}>{t('Shipping Details', 'معلومات التوصيل')}</h3>
                  <div className="space-y-8 text-sm">
                    <div className="grid grid-cols-2 gap-8">
                      <input type="text" placeholder={t('First Name', 'الاسم')} required className="w-full bg-transparent border-b border-[#555] focus:border-white pb-3 outline-none transition-colors rounded-none placeholder-[#888] text-[#fafafa]" />
                      <input type="text" placeholder={t('Last Name', 'اللقب')} required className="w-full bg-transparent border-b border-[#555] focus:border-white pb-3 outline-none transition-colors rounded-none placeholder-[#888] text-[#fafafa]" />
                    </div>
                    <input type="tel" placeholder={t('Phone Number', 'رقم الهاتف')} required className="w-full bg-transparent border-b border-[#555] focus:border-white pb-3 outline-none transition-colors rounded-none placeholder-[#888] text-[#fafafa]" />

                    <div className="relative">
                      <select required className="w-full bg-transparent border-b border-[#555] focus:border-white pb-3 outline-none transition-colors rounded-none text-[#fafafa] appearance-none cursor-pointer">
                        <option value="" disabled selected className="text-[#888] bg-[#0a0a0a]">{t('Select Wilaya (State)', 'الولاية')}</option>
                        {ALGERIA_WILAYAS.map(wilaya => (
                          <option key={wilaya} value={wilaya} className="bg-[#0a0a0a] text-[#fafafa]">{wilaya}</option>
                        ))}
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#666]">▼</div>
                    </div>

                    <input type="text" placeholder={t('District (Commune)', 'البلدية')} required className="w-full bg-transparent border-b border-[#555] focus:border-white pb-3 outline-none transition-colors rounded-none placeholder-[#888] text-[#fafafa]" />
                    <input type="text" placeholder={t('Full Delivery Address', 'العنوان الكامل')} required className="w-full bg-transparent border-b border-[#555] focus:border-white pb-3 outline-none transition-colors rounded-none placeholder-[#888] text-[#fafafa]" />
                  </div>
                </div>

                <div className="gpu checkout-element mb-16 p-8 border border-[#222] bg-[#050505] rounded-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#111] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out z-0"></div>
                  <div className="relative z-10">
                    <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-[#4ade80]">{t('Payment Protocol', 'طريقة الدفع')}</h3>
                    <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-[#fafafa]">
                      <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse"></div>
                      {t('CASH ON DELIVERY', 'الدفع عند الاستلام (خلص كي تلحقك)')}
                    </div>
                    <p className={`text-[10px] text-[#666] mt-4 uppercase ${t('tracking-widest', 'tracking-normal')}`}>{t('Transaction completes upon visual confirmation of physical asset.', 'تخلص كي تستلم السلعة تاعك يد بيد. مكاش دفع مسبق.')}</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="gpu checkout-element w-full py-6 bg-[#fafafa] text-[#111] text-[11px] font-black tracking-[0.2em] uppercase hover:bg-[#d0d0d0] transition-colors duration-300 rounded-sm flex flex-col items-center justify-center gap-1"
                >
                  <span>{t('Confirm Order', 'تأكيد الطلب')}</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="gpu checkout-element w-16 h-16 border border-[#333] flex items-center justify-center rounded-full mb-10">
                <div className="w-2 h-2 bg-[#fafafa] rounded-full"></div>
              </div>
              <h2 className="gpu checkout-element text-4xl font-light tracking-tighter mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                {t('Signal Received.', 'تم استلام الطلب بنجاح.')}
              </h2>
              <p className={`gpu checkout-element text-xs font-mono tracking-[0.2em] text-[#888] mb-12 max-w-sm leading-relaxed uppercase`}>
                {t('A Keruggedz operative will establish comms shortly via phone to verify your location.', 'رح نتصلو بيك في أقرب وقت باش نأكدو الطلبية ونفهمو عنوان التوصيل.')}
              </p>
              <Link
                to="/shop"
                className={`gpu checkout-element px-12 py-5 border border-[#333] text-[10px] font-bold tracking-[0.3em] uppercase text-[#fafafa] hover:bg-white hover:text-black transition-all duration-300 rounded-sm`}
              >
                {t('Return to Base', 'الرجوع للمتجر')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
