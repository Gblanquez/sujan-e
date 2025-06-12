import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const initTextAnimation = () => {
  const title = document.querySelector('.i_title');
  const paragraph = document.querySelector('.i_text');
  if (!title || !paragraph) return;

  // Ensure layout is complete before splitting
  gsap.delayedCall(0.1, () => {
    // Split text into lines, words, and chars using GSAP's SplitText
    const splitTitle = new SplitText(title, { 
      type: 'lines,words,chars',
      linesClass: 'split-line'
    });
    

    splitTitle.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      wrapper.style.display = 'block';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });


    gsap.fromTo(
      splitTitle.lines,
      {
        y: '110%',
      },
      {
        y: '0%',
        stagger: {
          each: 0.1
        },
        duration: 1.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
      }
    );
  });


  const splitParagraph = new SplitText(paragraph, {
    type: 'lines,words',
    linesClass: 'split-line'
  });


  splitParagraph.lines.forEach(line => {
    const wrapper = document.createElement('div');
    wrapper.style.overflow = 'hidden';
    wrapper.style.display = 'block';
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });


  gsap.fromTo(
    splitParagraph.lines,
    {
      y: '110%',
    },
    {
      y: '0%',
      stagger: {
        each: 0.04
      },
      duration: 2.4,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: paragraph,
        start: 'top 95%',
        toggleActions: 'play none none none'
      },
    }
  );
};

const initIntroAnimation = () => {
  const introContent = document.querySelector('.intro_s');
  const heroWrapper = document.querySelector('.hero_s');

  if (!introContent || !heroWrapper) return;

  gsap.set(introContent, {
    scale: 0.9,
    y: '-16%',
    rotateX: -20,
    perspective: 1000,
    transformStyle: 'preserve-3d',
    transformOrigin: 'center center'
  });

  gsap.fromTo(
    introContent,
    {
      scale: 0.9,
      rotateX: -20,
      y: '-16%',
      perspective: 1000,
      transformStyle: 'preserve-3d',
      transformOrigin: 'center center'
    },
    {
      scale: 1,
      rotateX: 0,
      y: '0%',
      scrollTrigger: {
        trigger: heroWrapper,
        start: 'top 80%',
        end: 'bottom 5%',
        scrub: true,
      },
    }
  );


  initTextAnimation();
};

export default initIntroAnimation;
