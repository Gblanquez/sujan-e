import Lenis from 'lenis'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

let lenis = null;

export const initSmoothScroll = () => {
  const isEditor = document.body.classList.contains('w-editor') || document.documentElement.classList.contains('wf-design-mode');
  if (isEditor) return null;

  if (lenis) return lenis;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  lenis = new Lenis({
    duration: 2.2,
    smoothWheel: !isMobile,
    smooth: !isMobile,
    smoothTouch: false,
    gestureOrientation: 'vertical',
    wheelMultiplier: 1,
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