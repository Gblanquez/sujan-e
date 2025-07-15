import Lenis from 'lenis'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

let lenis = null;

export const initSmoothScroll = () => {
  // Don't initialize Lenis in Webflow Designer or Editor
  const isEditor = document.body.classList.contains('w-editor') || document.documentElement.classList.contains('wf-design-mode');
  if (isEditor) return null;

  if (lenis) return lenis;
  
  lenis = new Lenis({
    duration: 2.2,
    smoothWheel: true,
    gestureOrientation: 'vertical',
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  return lenis;
};

export const getLenis = () => lenis;

export const scrollTo = (target, options) => {
  if (lenis) {
    lenis.scrollTo(target, options);
  }
};

export const stop = () => {
  if (lenis) {
    lenis.stop();
  }
};

export const start = () => {
  if (lenis) {
    lenis.start();
  }
};

export const destroy = () => {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
};