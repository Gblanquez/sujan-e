import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const initTextAnimation = () => {
  const title = document.querySelector('.i_title');
  const paragraph = document.querySelector('.i_text');
  if (!title || !paragraph) return;

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
    { y: '110%' },
    {
      y: '0%',
      stagger: { each: 0.1 },
      duration: 1.8,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 90%',
        toggleActions: 'play none none none',
        once: true
      },
      onComplete: () => {
        splitTitle.revert();
        ScrollTrigger.refresh();
      }
    }
  );

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
    { y: '110%' },
    {
      y: '0%',
      stagger: { each: 0.04 },
      duration: 2.4,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: paragraph,
        start: 'top 95%',
        toggleActions: 'play none none none',
        once: true
      },
      onComplete: () => {
        splitParagraph.revert();
        ScrollTrigger.refresh();
      }
    }
  );
};

const initIntroAnimation = () => {
  const introContent = document.querySelector('.intro_s');
  const heroWrapper = document.querySelector('.hero_s');
  const mainVideo = document.querySelector('.main_video');

  if (!introContent || !heroWrapper) return;

  gsap.fromTo(
    introContent,
    {
      scale: 0.8,
      y: '-17.5%'
    },
    {
      scale: 1,
      y: '0%',
      ease: 'power2.out',
      scrollTrigger: {
        trigger: heroWrapper,
        start: 'top 92%',
        end: 'bottom 30%',
        scrub: 2,
        invalidateOnRefresh: true,
        toggleActions: 'play none none none'
      }
    }
  );

  if (mainVideo && introContent) {
    gsap.fromTo(
      mainVideo,
      { scale: 1 },
      {
        scale: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: introContent,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  }

  initTextAnimation();
};

export default initIntroAnimation;
