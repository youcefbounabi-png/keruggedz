export interface Product {
    id: number;
    name: string;
    nameAr?: string;
    category: string;
    categoryAr?: string;
    price: string;
    image: string;
    description: string;
    descriptionAr?: string;
    colors: { name: string; nameAr?: string; hex: string }[];
    sizes: string[];
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Structured Wool Coat',
        nameAr: 'معطف صوف مهيكل',
        category: 'Outerwear',
        categoryAr: 'ملابس خارجية',
        price: '42,000 DZD',
        image: '/custom/df691bea-0868-4ae6-87d2-19882de66969.jpg',
        description: 'Forged from heavyweight military-grade wool blend. Designed for brutalist climates. Features hidden tactical pockets and an uncompromising asymmetric cut.',
        descriptionAr: 'مصنوع من مزيج صوف مكثف من الدرجة العسكرية. مصمم للمناخات القاسية. يتميز بجيوب تكتيكية مخفية وقصة غير متماثلة لا تقبل المساومة.',
        colors: [
            { name: 'Onyx Black', nameAr: 'أسود أونيكس', hex: '#111111' },
            { name: 'Concrete Grey', nameAr: 'رمادي خرساني', hex: '#666666' }
        ],
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 2,
        name: 'Silk Utility Shirt',
        nameAr: 'قميص حريري عملي',
        category: 'Tops',
        categoryAr: 'بلايز',
        price: '28,000 DZD',
        image: '/custom/25d51d77-3336-4d01-987f-49b6e2fa8dbb.jpg',
        description: 'A paradoxical garment combining the raw durability of utility wear with the fluid grace of raw silk. Breathable, adaptable, essential.',
        descriptionAr: 'قطعة تتحدى المألوف تجمع بين المتانة الخام للملابس العملية والانسيابية الأنيقة للحرير الطبيعي. يسمح بمرور الهواء، قابل للتكيف، وأساسي.',
        colors: [
            { name: 'Bone White', nameAr: 'أبيض عظمي', hex: '#fdfdfd' },
            { name: 'Obsidian', nameAr: 'أوبسيديان', hex: '#151515' }
        ],
        sizes: ['M', 'L', 'XL']
    },
    {
        id: 3,
        name: 'Pleated Wide Trousers',
        nameAr: 'سروال واسع بطيات',
        category: 'Bottoms',
        categoryAr: 'بناطيل',
        price: '34,000 DZD',
        image: '/custom/67a560e0-e591-4b9f-8b80-32087a2050dd.jpg',
        description: 'Architectural legwear. Deep pleats create a dynamic silhouette in motion, constructed from a high-tension technical gabardine.',
        descriptionAr: 'تصميم معماري للأرجل. طيات عميقة تخلق شكلاً ديناميكياً أثناء الحركة، مصنوع من الغبردين التقني عالي التوتر.',
        colors: [
            { name: 'Asphalt', nameAr: 'أسفلت', hex: '#222222' }
        ],
        sizes: ['30', '32', '34', '36']
    },
    {
        id: 4,
        name: 'Leather Harness',
        nameAr: 'حزام جلدي تكتيكي',
        category: 'Accessories',
        categoryAr: 'إكسسوارات',
        price: '18,000 DZD',
        image: '/custom/b2cb6c4c-3550-4fdb-ba01-a8000cd4f62f.jpg',
        description: 'Modular attachment system crafted from full-grain bovine leather. Features anodized aluminum hardware for integrating auxiliary pouches.',
        descriptionAr: 'نظام ربط تركيبي مصنوع من جلد البقر المحبب بالكامل. يتميز بإكسسوارات من الألومنيوم المؤكسد لدمج الحقائب الإضافية.',
        colors: [
            { name: 'Matte Black', nameAr: 'أسود غير لامع', hex: '#0a0a0a' }
        ],
        sizes: ['ONE SIZE']
    },
    {
        id: 5,
        name: 'Oversized Cashmere Knit',
        nameAr: 'كنزة كشمير فضفاضة',
        category: 'Tops',
        categoryAr: 'بلايز',
        price: '59,000 DZD',
        image: '/custom/d2072969-fef7-4c6c-9675-52666c05a769.jpg',
        description: 'A monolithic piece of comfort. Hand-loomed Mongolian cashmere treated for weather resistance without sacrificing texture.',
        descriptionAr: 'قطعة متكاملة من الراحة. كشمير منغولي منسوج يدوياً ومعالج لمقاومة الطقس دون التضحية بالملمس.',
        colors: [
            { name: 'Ash', nameAr: 'رمادي', hex: '#8a8a8a' },
            { name: 'Void', nameAr: 'فراغ', hex: '#050505' }
        ],
        sizes: ['OS (Over-Sized)']
    },
    {
        id: 6,
        name: 'Deconstructed Blazer',
        nameAr: 'سترة بليزر مفككة التصميم',
        category: 'Outerwear',
        categoryAr: 'ملابس خارجية',
        price: '72,000 DZD',
        image: '/custom/7baea45d-cdc2-4484-905d-5148297d45e4.jpg',
        description: 'Traditional tailoring interrupted. Exposed seams, raw hems, and an unstructured shoulder redefine the formal silhouette for the modern vanguard.',
        descriptionAr: 'تفصيل تقليدي بلمسة تمرد. غرز مكشوفة، حواف خام، وكتف غير منظم يعيد تعريف الشكل الرسمي للرواد العصريين.',
        colors: [
            { name: 'Lead', nameAr: 'رصاصي', hex: '#444444' },
            { name: 'Pitch', nameAr: 'أسود داكن', hex: '#000000' }
        ],
        sizes: ['S', 'M', 'L']
    },
];
