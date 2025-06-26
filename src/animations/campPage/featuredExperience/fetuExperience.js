import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const featuredExperience = () => {
  const fTitle = document.querySelector('.f_exp_title');
  const fText = document.querySelector('.f_exp_text');
  const fLabel = document.querySelector('.f_exp_label');
  const fImg = document.querySelector('.f_exp_img');
  const fTrigger = document.querySelector('.f_exp_s');
  const svgContainer = document.querySelector('#ilu-container');

  if (!fTitle || !fText || !fLabel || !fImg || !fTrigger || !svgContainer) return;

  // Utility to split, animate, and revert
  const splitAndAnimate = (element) => {
    const split = new SplitText(element, {
      type: 'lines,words,chars',
      linesClass: 'split-line'
    });

    // Mask each line
    split.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    const animation = gsap.fromTo(split.lines, {
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
          split.revert(); // Clean up splitText to avoid layout bugs on resize
        }
      }
    });
  };

  // Animate text blocks
  splitAndAnimate(fTitle);
  splitAndAnimate(fText);
  splitAndAnimate(fLabel);

  // Image scale on scroll
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

  // Animate SVG paths
  const svg = svgContainer.querySelector('svg');
  if (svg) {
    const paths = svg.querySelectorAll('path, polygon, rect, circle, line, polyline');

    gsap.set(paths, {
      opacity: 0,
      x: -2,
      y: 2,
      scale: 0.98,
      transformOrigin: 'center center'
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: svgContainer,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }).to(paths, {
      opacity: 0.5,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.4,
      ease: 'power3.out',
      stagger: { each: 0.05 }
    });
  }
};

export default featuredExperience;