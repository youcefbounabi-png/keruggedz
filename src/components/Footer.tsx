import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const { t } = useLanguage();
    return (
        <footer className="relative z-10 bg-[#0a0a0a] border-t border-white/5 py-24 px-6 md:px-12 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 footer-content">
                <div className="md:col-span-5 space-y-8">
                    <div className="text-3xl font-light tracking-[0.2em] uppercase font-display" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Keruggedz
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div
                            className="w-32 h-40 overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                            style={{
                                maskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%)'
                            }}
                        >
                            <img
                                src="/assets/nature_footer.jpg"
                                alt="Nature Atmosphere"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className={`text-[#999999] text-sm leading-relaxed max-w-xs ${t('tracking-wide', 'tracking-normal')}`}>
                            {t(
                                'Redefining technical aesthetic with an edgy finish. Handcrafted garments designed for the modern nomad, tested in brutalist environments.',
                                'لبسة مخدومة بعناية باش ترضي الذوق الجزائري وبأسعار معقولة. همة وشان لكاع الظروف.'
                            )}
                        </p>
                    </div>
                    <div className="flex space-x-8 pt-4">
                        <a
                            href="https://www.instagram.com/keruggedz/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#fafafa] text-xs font-bold tracking-[0.2em] uppercase hover:text-[#999999] transition-colors duration-300"
                        >
                            Instagram
                        </a>
                        <a
                            href="#"
                            className="text-[#fafafa] text-xs font-bold tracking-[0.2em] uppercase hover:text-[#999999] transition-colors duration-300"
                        >
                            Twitter
                        </a>
                    </div>
                </div>

                <div className="md:col-span-3 space-y-6">
                    <h4 className={`text-[10px] font-semibold uppercase ${t('tracking-[0.4em]', 'tracking-[0.2em]')} text-[#555]`}>{t('Exploration', 'اكتشف')}</h4>
                    <ul className={`space-y-4 text-xs font-medium ${t('tracking-[0.15em]', 'tracking-normal')} uppercase`}>
                        <li><a href="/" className="hover:text-[#999999] transition-colors">{t('Home', 'الرئيسية')}</a></li>
                        <li><a href="/shop" className="hover:text-[#999999] transition-colors">{t('Shop All', 'شوف السلعة')}</a></li>
                        <li><a href="/about" className="hover:text-[#999999] transition-colors">{t('About Story', 'حكايتنا')}</a></li>
                    </ul>
                </div>

                <div className="md:col-span-4 space-y-8">
                    <h4 className={`text-[10px] font-semibold uppercase ${t('tracking-[0.4em]', 'tracking-[0.2em]')} text-[#555]`}>{t('Stay Rugged', 'ابق صامداً')}</h4>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder={t('JOIN THE LIST', 'انضم للقائمة')}
                            aria-label={t('Newsletter Subscription', 'الاشتراك في النشرة الإخبارية')}
                            className={`w-full bg-transparent border-b border-white/10 py-4 text-[10px] ${t('tracking-[0.3em]', 'tracking-[0.1em]')} uppercase outline-none focus:border-white transition-colors duration-500`}
                        />
                        <button
                            aria-label={t('Submit Newsletter', 'إرسال')}
                            className={`absolute ${t('right-0', 'left-0')} top-1/2 -translate-y-1/2 text-[10px] font-bold ${t('tracking-[0.3em]', 'tracking-[0.1em]')} uppercase text-[#fafafa] hover:text-[#999999] transition-colors`}>
                            {t('Submit', 'إرسال')}
                        </button>
                    </div>
                    <div className={`text-[9px] text-[#555] ${t('tracking-[0.2em]', 'tracking-normal')} uppercase`}>
                        {t('All orders are shipped from Algeria. Cash on Delivery only.', 'التوصيل لـ 58 ولاية. الدفع كي تستلم سلعتك (خلص كي يوصلك).')}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className={`text-[9px] text-[#444] ${t('tracking-[0.3em]', 'tracking-[0.1em]')} uppercase`}>
                    &copy; {new Date().getFullYear()} {t('Keruggedz. All rights reserved.', 'كيروغدز. جميع الحقوق محفوظة.')}
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-[9px] text-[#444] ${t('tracking-[0.3em]', 'tracking-[0.1em]')} uppercase`}>
                        {t('Designed & Built by', 'صمم وبرمج بواسطة')}
                    </span>
                    <span className="w-4 h-[1px] bg-gradient-to-r from-transparent via-[#666] to-transparent"></span>
                    <a
                        href="https://www.instagram.com/youcef.dev_/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#888] tracking-[0.15em] uppercase hover:text-[#fafafa] transition-all duration-500 group relative"
                    >
                        <span className="relative z-10">youcef.dev_</span>
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#fafafa] group-hover:w-full transition-all duration-500"></span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
