import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// Components
import SplineScene from './components/3d/SplineScene';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { LanguageProvider } from './context/LanguageContext';

// Lazy load Pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Product = lazy(() => import('./pages/Product'));
const About = lazy(() => import('./pages/About'));
const Custom = lazy(() => import('./pages/Custom'));
const Checkout = lazy(() => import('./pages/Checkout'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // If lenis is available globally, use it for an immediate scroll reset.
    // Otherwise fall back to window.scrollTo.
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // slightly longer duration for smoother stop
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth custom easing
      wheelMultiplier: 1,
      lerp: 0.08, // a bit snappy but very smooth
      smoothWheel: true,
    });

    (window as any).lenis = lenis; // Expose globally for ScrollToTop

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="relative w-full min-h-screen bg-[#0a0a0a] text-[#f5f5f5] overflow-x-hidden font-sans selection:bg-[#c0c0c0] selection:text-[#1a1a1a]">
          {/* Immersive 3D Background - Simplified version without interactions for performance */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <Suspense fallback={null}>
              <SplineScene />
            </Suspense>
          </div>

          {/* UI Overlay */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navigation />

            <main className="flex-grow flex flex-col justify-center min-h-screen">
              {!isAppReady ? (
                <Preloader />
              ) : (
                <Suspense fallback={<Preloader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/custom" element={<Custom />} />
                    <Route path="/checkout" element={<Checkout />} />
                  </Routes>
                </Suspense>
              )}
            </main>

            <Footer />
          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
}
