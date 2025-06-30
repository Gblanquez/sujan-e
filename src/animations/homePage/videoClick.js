import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stop, start } from '../../smoothScroll/smoothScroll'
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const videoClick = () => {
  const video = document.querySelector('.main-camp-video');
  const trigger = document.querySelector('.hero_s');
  const navWrapper = document.querySelector('.g_nav_w');
  const heroTitle = document.querySelector('.h_title');

  if (!video || !trigger || window.innerWidth < 1024) return; // Only run on desktop

  let soundEnabled = false;
  let splitTitle = null;

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

      // Hide nav
      if (navWrapper) {
        gsap.to(navWrapper, {
          y: '-100%',
          duration: 1.2,
          ease: 'power4.inOut'
        });
      }

      // Animate hero title lines out
      if (heroTitle) {
        splitTitle = new SplitText(heroTitle, {
          type: 'lines,words,chars',
          linesClass: 'split-line'
        });

        splitTitle.lines.forEach(line => {
          const wrapper = document.createElement('div');
          wrapper.style.overflow = 'hidden';
          wrapper.style.display = 'block';
          wrapper.style.perspective = '1000px';
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });

        gsap.set(heroTitle, {
          perspective: 1000,
          transformStyle: 'preserve-3d'
        });

        gsap.to(splitTitle.chars, {
          x: '-10%',
          y: '-100%',
          rotateX: 72,
          rotateY: 45,
          rotateZ: 4,
          duration: 2.4,
          ease: 'power4.inOut',
          stagger: { each: 0.03 }
        });
      }

    } else {
      gsap.to(video, {
        duration: 0.6,
        ease: 'power2.out',
        volume: 0,
        onComplete: () => {
          video.muted = true;
        }
      });

      // Restore scroll and nav/title
      if (navWrapper) {
        gsap.to(navWrapper, {
          y: '0%',
          duration: 1.2,
          ease: 'power4.out'
        });
      }

      if (heroTitle && splitTitle) {
        gsap.to(splitTitle.chars, {
          x: '0%',
          y: '0%',
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          duration: 2.4,
          ease: 'power4.out',
          stagger: { each: 0.03 }
        });
      }

      start();
    }
  });
};

export default videoClick;