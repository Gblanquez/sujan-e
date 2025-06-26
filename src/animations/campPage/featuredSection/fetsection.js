import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const featuredSection = () => {
  const fText = document.querySelector('.featured_text');
  const fImg = document.querySelector('.f_img');
  const fTitle = document.querySelector('.featured_title');
  const fLabel = document.querySelector('.f_label');
  const fTrigger = document.querySelector('.featured_s');

  if (!fText || !fImg || !fTitle || !fLabel || !fTrigger) return;

  // Utility to split, animate, and revert
  const splitAndAnimate = (element) => {
    const split = new SplitText(element, {
      type: 'lines,words,chars',
      linesClass: 'split-line'
    });

    split.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.fromTo(split.lines, {
      yPercent: 100
    }, {
      yPercent: 0,
      duration: 1.4,
      ease: 'power4.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: element,
        start: 'top 92%',
        toggleActions: 'play none none none',
        once: true,
        onLeave: () => {
          split.revert(); // Clean up to avoid text breaking on resize
        }
      }
    });
  };

  // Animate each text block
  splitAndAnimate(fTitle);
  splitAndAnimate(fText);
  splitAndAnimate(fLabel);

  // Scroll-based image scale animation
  ScrollTrigger.create({
    trigger: fTrigger,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    animation: gsap.to(fImg, {
      scale: 1.2,
      ease: 'none'
    })
  });
};

export default featuredSection;