import { useRef, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

const SPLINE_SCENE_URL = '/scene-clean.splinecode';

export default function SplineScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    const [isInView, setIsInView] = useState(true);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true });
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Intersection Observer to pause rendering when scrolled out of view
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0 } // trigger as soon as 1px is visible
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // On mobile: cap canvas pixel ratio to 1 for massive GPU savings
    useEffect(() => {
        if (isMobile && containerRef.current) {
            const canvas = containerRef.current.querySelector('canvas');
            if (canvas) {
                canvas.style.imageRendering = 'auto';
            }
        }
    }, [isMobile]);

    // If on mobile, do not render the WebGL canvas at all to save massive GPU overhead
    // Instead, render a lightweight, pure CSS animated grid to keep the technical aesthetic.
    if (isMobile) {
        return (
            <div className="relative w-full h-full overflow-hidden bg-[#050505]">
                {/* CSS Grid Pattern */}
                <div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{
                        backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
                        transformOrigin: 'top center'
                    }}
                ></div>

                {/* Scrolling Grid Overlay Animation (Pure CSS, 0 WebGL cost) */}
                <style>{`
                    @keyframes gridMove {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(40px); }
                    }
                    .mobile-grid-anim {
                        animation: gridMove 2s linear infinite;
                    }
                `}</style>
                <div
                    className="absolute inset-0 z-0 opacity-30 mobile-grid-anim"
                    style={{
                        backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, transparent 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        transformOrigin: 'top center'
                    }}
                ></div>

                {/* Heavy Vignette to focus the center and hide the flat edges */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(5,5,5,0.9)_70%,rgba(5,5,5,1)_100%)]"></div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* 3D Scene - Restored to original clean grid vibe */}
            <div
                ref={containerRef}
                className="spline-wrapper"
                style={{
                    width: '125%',
                    height: '125%',
                    transform: 'scale(0.8)',
                    transformOrigin: 'center center',
                    position: 'absolute',
                    top: '-12.5%',
                    left: '-12.5%',
                    opacity: 0.8
                }}
            >
                {isInView && (
                    <Spline
                        scene={SPLINE_SCENE_URL}
                    />
                )}
            </div>

            {/* Vignette Overlay to hide grid edges and focus center */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.4)_70%,rgba(10,10,10,1)_100%)]"></div>
        </div>
    );
}
