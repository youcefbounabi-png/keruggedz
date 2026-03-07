import { useRef } from 'react';
import Spline from '@splinetool/react-spline';

const SPLINE_SCENE_URL = '/scene-clean.splinecode';

export default function SplineScene() {
    const containerRef = useRef<HTMLDivElement>(null);

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
                <Spline scene={SPLINE_SCENE_URL} />
            </div>

            {/* Vignette Overlay to hide grid edges and focus center */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.4)_70%,rgba(10,10,10,1)_100%)]"></div>
        </div>
    );
}
