import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const initCertificationAnimation = () => {
  const paragraph = document.querySelector('.c_text');
  const label = document.querySelector('.c_label_txt');
  const line = document.querySelector('.c_line');
  const imageWrapper = document.querySelector('.c_img');
  const content = document.querySelector('.certification_s');
  if (!paragraph) return;

  const splitParagraph = new SplitText(paragraph, {
    type: 'lines',
    linesClass: 'certification-line'
  });

  splitParagraph.lines.forEach(line => {
    const wrapper = document.createElement('div');
    wrapper.style.overflow = 'hidden';
    wrapper.style.display = 'block';
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: content,
      start: 'top 40%',
      toggleActions: 'play none none none',
      once: true,
      onLeave: () => {
        splitParagraph.revert();
        ScrollTrigger.refresh();
      }
    }
  });

  tl.fromTo(line,
    {
      scaleX: 0,
      transformOrigin: 'left center'
    },
    {
      scaleX: 1,
      duration: 2.6,
      ease: 'power4.out'
    }
  )
  .fromTo(label,
    {
      y: '110%'
    },
    {
      y: '0%',
      duration: 2.6,
      ease: 'power4.out'
    },
    '<'
  )
  .fromTo(splitParagraph.lines,
    {
      y: '110%'
    },
    {
      y: '0%',
      stagger: {
        each: 0.1
      },
      duration: 2.0,
      ease: 'power4.out'
    },
    '<'
  );

  gsap.fromTo(imageWrapper,
    {
      scale: 1,
      y: '0%'
    },
    {
      scale: 1.2,
      y: '10%',
      ease: 'none',
      scrollTrigger: {
        trigger: content,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  );
};

export default initCertificationAnimation;
