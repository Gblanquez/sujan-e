import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const relaisHero = () => {
  const heroTitle = document.querySelector('.rc_title');
  const heroText = document.querySelector('.rc_text');
  const heroBgs = document.querySelectorAll('.i_s_full'); 
  const heroLogo = document.querySelector('.rc_certi_w');

  if (!heroTitle || !heroText || !heroBgs.length || !heroLogo) return;

  const bgImgs = [...heroBgs].map(bg => bg.querySelector('img') || bg);

  function initAnimation() {
    return new Promise((resolve) => {
      const splitTitle = new SplitText(heroTitle, {
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

      const splitText = new SplitText(heroText, {
        type: 'lines,words,chars',
        linesClass: 'split-line'
      });

      splitText.lines.forEach(line => {
        const wrapper = document.createElement('div');
        wrapper.style.overflow = 'hidden';
        wrapper.style.display = 'block';
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.set(heroTitle, {
        perspective: 1000,
        transformStyle: 'preserve-3d'
      });

      gsap.set(splitTitle.chars, {
        x: '-10%',
        y: '100%',
        rotateX: -72,
        rotateY: -45,
        rotateZ: -4,
        transformOrigin: 'top',
        transformStyle: 'preserve-3d',
        opacity: 0
      });

      gsap.set(splitText.lines, {
        y: '100%'
      });

      gsap.set(heroLogo, {
        opacity: 0
      });

      const heroTl = gsap.timeline({
        onComplete: resolve
      });

      heroTl
        .to(splitTitle.chars, {
          x: '0%',
          y: '0%',
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 2.4,
          ease: 'power4.out',
          stagger: {
            each: 0.03
          }
        }, '0.9')
        .to(splitText.lines, {
          y: '0%',
          duration: 2.4,
          ease: 'power4.inOut',
          stagger: {
            each: 0.02
          }
        }, '1.0')
        .to(heroLogo, {
          opacity: 1,
          duration: 2.1,
          ease: 'power2.inOut'
        }, '1.0');

      // Scroll-triggered scale animation per .rc_img inside each .i_s_full
      heroBgs.forEach(section => {
        const img = section.querySelector('.rc_img');
        if (!img) return;

        gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: 1.4,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });
    });
  }

  // Wait for fonts and images before running animation
  return Promise.all([
    document.fonts.ready,
    ...bgImgs.map(img => new Promise(resolve => {
      if (img.complete) {
        resolve();
      } else {
        img.addEventListener('load', resolve);
      }
    }))
  ]).then(initAnimation);
};

export default relaisHero;