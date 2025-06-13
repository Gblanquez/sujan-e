import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const initTextAnimation = () => {
  const title = document.querySelector('.ca_title');
  const paragraph = document.querySelector('.ca_text');
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

const initCollectionAnimation = () => {
  const collectionItems = document.querySelectorAll('.ca_link_w');
  const collectionWrapper = document.querySelector('.camp_s');

  if (!collectionWrapper || !collectionItems.length) return;

  gsap.fromTo('.ca_camp_item',
    {
      y: '50%'
    },
    {
      y: '0%',
      ease: 'none',
      stagger: {
        each: 0.1,
        from: 'start'
      },
      scrollTrigger: {
        trigger: collectionWrapper,
        start: 'top center',
        end: 'bottom bottom',
        scrub: 1,
      }
    }
  );

  initTextAnimation();
};

export default initCollectionAnimation;
