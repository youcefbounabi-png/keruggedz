import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EncryptedText } from './ui/encrypted-text';

export default function Preloader() {
    const [loadingText, setLoadingText] = useState('INITIALIZING SECURE CONNECTION');

    useEffect(() => {
        const texts = [
            'LOADING ASSETS',
            'ESTABLISHING COMMS',
            'VERIFYING LOCATION',
            'KERUGGEDZ V2.0',
        ];
        let i = 0;
        const interval = setInterval(() => {
            setLoadingText(texts[i]);
            i = (i + 1) % texts.length;
        }, 900);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center font-mono overflow-hidden">
            {/* Background Noise Effect */}
            <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0.0001%, transparent 0.0002%, transparent 0.0015%, #fff 0.0016%)', backgroundSize: '200px 200px' }}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center"
            >
                {/* Core Loading Element */}
                <div className="w-24 h-24 relative mb-8 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-t-[#fafafa] border-r-transparent border-b-[#333] border-l-transparent rounded-full opacity-50"
                    ></motion.div>
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border border-t-transparent border-r-[#888] border-b-transparent border-l-[#fafafa] rounded-full opacity-30"
                    ></motion.div>
                    <div className="w-2 h-2 bg-[#fafafa] rounded-full animate-pulse shadow-[0_0_15px_#fff]"></div>
                </div>

                {/* Text */}
                <h1 className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase text-[#fafafa] mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                    <EncryptedText text="KERUGGEDZ" />
                </h1>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-[10px] tracking-[0.3em] font-bold text-[#888] uppercase h-4">
                        <EncryptedText text={loadingText} />
                    </p>
                    <div className="w-32 h-[1px] bg-[#222] overflow-hidden">
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1/2 h-full bg-[#fafafa]"
                        ></motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
