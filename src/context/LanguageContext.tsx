import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    isAr: boolean;
    toggleLanguage: () => void;
    t: <T>(enText: T, arText: T) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function applyDir(lang: Language) {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';

    // Catchy brand title based on language
    document.title = lang === 'ar'
        ? 'KERUGGEDZ | معدات جبلية تقنية'
        : 'KERUGGEDZ | Technical Alpine Equipment';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem('app_language') as Language;
        return saved === 'ar' ? 'ar' : 'en';
    });

    // Apply dir on mount and whenever language changes
    useEffect(() => {
        applyDir(language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => {
            const newLang = prev === 'en' ? 'ar' : 'en';
            localStorage.setItem('app_language', newLang);
            return newLang;
        });
    };

    const t = <T,>(enText: T, arText: T): T => {
        return language === 'en' ? enText : arText;
    };

    return (
        <LanguageContext.Provider value={{ language, isAr: language === 'ar', toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
