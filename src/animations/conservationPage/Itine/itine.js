import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const itine = () => {
  const itLabel = document.querySelector('.rp_label');
  const itText = document.querySelector('.rp_txt');
  const itBg = document.querySelector('.rp_img');
  const itTrigger = document.querySelector('.report_s');

  if (!itLabel || !itText || !itBg || !itTrigger) return;

  // Label animation (simple Y move)
  gsap.fromTo(itLabel,
    { y: '110%' },
    {
      y: '0%',
      ease: 'power4.out',
      duration: 1.4,
      scrollTrigger: {
        trigger: itLabel,
        start: 'top 92%',
        toggleActions: 'play none none none'
      }
    }
  );

  // Text animation (SplitText with lines & words)
  const split = new SplitText(itText, {
    type: 'lines,words',
    linesClass: 'split-line'
  });

  // Mask the lines with wrapper divs
  split.lines.forEach(line => {
    const wrapper = document.createElement('div');
    wrapper.style.overflow = 'hidden';
    wrapper.style.display = 'block';
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  gsap.fromTo(
    split.lines,
    { y: '100%' },
    {
      y: '0%',
      duration: 1.8,
      ease: 'power4.out',
      stagger: 0.04,
      scrollTrigger: {
        trigger: itText,
        start: 'top 92%',
        toggleActions: 'play none none none'
      },
      onComplete: () => split.revert()
    }
  );

  // Background scale animation with scrub
  gsap.fromTo(
    itBg,
    { scale: 1 },
    {
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: itTrigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  );
};

export default itine;