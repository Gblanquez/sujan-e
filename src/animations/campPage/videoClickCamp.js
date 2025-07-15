import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stop, start } from '../../smoothScroll/smoothScroll';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const videoClickCamp = () => {
  const video = document.querySelector('.camp-video');
  const trigger = document.querySelector('.hero_s');
  const navWrapper = document.querySelector('.g_nav_w');

  const campText = document.querySelector('.camp_text');
  const svgContainer = document.querySelector('.c_svg_wrap[id]');
  const svg = svgContainer?.querySelector('svg');

  const playText = document.querySelector('.play_text');
  const closeText = document.querySelector('.close_text');

  if (!video || !trigger || window.innerWidth < 1024) return; // Only run on desktop

  let soundEnabled = false;
  let splitCampText = null;
  let paths = svg
    ? svg.querySelectorAll('path, line, polyline, polygon, circle, rect')
    : [];

  trigger.addEventListener('click', () => {
    soundEnabled = !soundEnabled;

    if (soundEnabled) {
      video.muted = false;
      video.volume = 1;
      gsap.to(video, {
        duration: 0.6,
        ease: 'power2.out',
        volume: 1,
      });

      stop();

      gsap.to(playText, {
        yPercent: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
      });

      gsap.to(closeText, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.inOut',
      });

      if (navWrapper) {
        gsap.to(navWrapper, {
          y: '-100%',
          duration: 1.2,
          ease: 'power4.inOut',
        });
      }

      // Animate camp text out
      if (campText) {
        splitCampText = new SplitText(campText, {
          type: 'lines',
          linesClass: 'split-line',
        });

        splitCampText.lines.forEach((line) => {
          const wrapper = document.createElement('div');
          wrapper.style.overflow = 'hidden';
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });

        gsap.to(splitCampText.lines, {
          yPercent: -100,
          duration: 2,
          ease: 'power4.inOut',
          stagger: 0.06,
        });
      }

      // Animate SVG paths out
      if (paths.length) {
        gsap.to(paths, {
          y: '-80%',
          skewY: 10,
          scaleY: 0.7,
          opacity: 0,
          strokeDashoffset: (i, t) => t.getTotalLength?.() || 0,
          duration: 1.5,
          ease: 'power2.inOut',
          stagger: 0.1,
        });
      }
    } else {
      gsap.to(video, {
        duration: 0.6,
        ease: 'power2.out',
        volume: 0,
        onComplete: () => {
          video.muted = true;
        },
      });

      gsap.to(closeText, {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
      });

      gsap.to(playText, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.inOut',
      });

      if (navWrapper) {
        gsap.to(navWrapper, {
          y: '0%',
          duration: 1.2,
          ease: 'power4.out',
        });
      }

      if (splitCampText) {
        gsap.to(splitCampText.lines, {
          yPercent: 0,
          duration: 2,
          ease: 'power4.out',
          stagger: 0.06,
        });
      }

      if (paths.length) {
        gsap.to(paths, {
          y: '0%',
          skewY: 0,
          scaleY: 1,
          opacity: 1,
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
          stagger: 0.1,
        });
      }

      start();
    }
  });
};

export default videoClickCamp;