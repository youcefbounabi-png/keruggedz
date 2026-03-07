import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { PRODUCTS } from '../data/products';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    const product = PRODUCTS.find(p => p.id === Number(id));

    const [selectedColor, setSelectedColor] = useState(product?.colors[0].name || '');
    const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');

    useEffect(() => {
        // Scroll to top on load
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Elegant "Curtain Reveal" for image
            gsap.fromTo('.prod-image-container',
                { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
                {
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    duration: 1.8,
                    ease: 'power4.inOut'
                }
            );

            // Subtle image scale
            gsap.from('.prod-image', {
                scale: 1.1,
                duration: 2,
                ease: 'power3.out'
            });

            // Text stagger reveal
            gsap.from('.prod-info > *', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.5
            });

        }, containerRef);
        return () => ctx.revert();
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <h1 className="text-2xl tracking-widest text-[#fafafa]">Artifact Not Found</h1>
            </div>
        );
    }

    const handleAddToCart = () => {
        // Here you would normally dispatch to a Redux/Zustand store or Context
        console.log(`Added: ${product.name} - ${selectedColor} - ${selectedSize}`);
        navigate('/checkout');
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-20 relative z-10" ref={containerRef}>
            <Link
                to="/shop"
                className={`inline-flex items-center text-[10px] font-bold ${t('tracking-[0.2em]', 'tracking-widest')} uppercase text-[#666] hover:text-white transition-colors duration-300 mb-12`}
            >
                <ArrowLeft className={`w-3 h-3 ${t('mr-4', 'ml-4')}`} />
                {t('Return to Equipment', 'ارجع للمنتجات')}
            </Link>

            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                {/* Left: Imagery */}
                <div className="gpu prod-image-container w-full aspect-[3/4] md:aspect-[4/5] bg-[#050505] relative overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="gpu prod-image w-full h-full object-cover filter grayscale-[10%]"
                    />
                </div>

                {/* Right: Product Info & Config */}
                <div className="gpu prod-info flex flex-col justify-center">
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#555] mb-6">
                        {t(product.category, product.categoryAr || product.category)}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter text-[#fafafa] mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {t(product.name, product.nameAr || product.name)}
                    </h1>
                    <p className="text-xl font-mono tracking-widest text-[#999] mb-12">
                        {product.price}
                    </p>

                    <p className={`text-xs font-semibold uppercase text-[#888] leading-[2] max-w-lg mb-16 ${t('tracking-widest', 'tracking-normal')}`}>
                        {t(product.description, product.descriptionAr || product.description)}
                    </p>

                    <div className="space-y-12">
                        {/* Color Selection */}
                        {product.colors.length > 0 && (
                            <div>
                                <h3 className={`text-[10px] font-bold ${t('tracking-[0.3em]', 'tracking-[0.1em]')} uppercase text-[#555] mb-6`}>
                                    {t('Color', 'لاكور (اللون)')}: <span className="text-[#fafafa] ml-2">
                                        {t(selectedColor, product.colors.find(c => c.name === selectedColor)?.nameAr || selectedColor)}
                                    </span>
                                </h3>
                                <div className="flex gap-4">
                                    {product.colors.map(color => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className={`w-12 h-12 rounded-full border border-[#333] transition-all duration-300 ${selectedColor === color.name ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a]' : 'hover:border-[#666]'}`}
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                            aria-label={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selection */}
                        {product.sizes.length > 0 && (
                            <div>
                                <h3 className={`text-[10px] font-bold ${t('tracking-[0.3em]', 'tracking-[0.1em]')} uppercase text-[#555] mb-6`}>
                                    {t('Size', 'لاطاي (المقاس)')}: <span className="text-[#fafafa] ml-2">{selectedSize}</span>
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`min-w-[4rem] min-h-[3.5rem] px-8 py-4 border border-[#333] text-sm font-mono tracking-widest transition-all duration-300 ${selectedSize === size ? 'bg-[#fafafa] text-[#0a0a0a]' : 'text-[#999] hover:border-[#666] hover:text-[#fafafa]'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-20">
                        <button
                            onClick={handleAddToCart}
                            className={`w-full min-h-[4rem] py-6 bg-[#fafafa] text-[#111111] text-xs font-black ${t('tracking-[0.3em]', 'tracking-widest')} uppercase hover:bg-[#d0d0d0] transition-colors duration-300 flex flex-col items-center justify-center gap-2`}
                        >
                            <span>{t('Add to Cart', 'زيد للسلة')}</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
