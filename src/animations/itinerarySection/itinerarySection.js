import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const initTextAnimation = () => {
  const title = document.querySelector('.ite_title');
  const paragraph = document.querySelector('.ite_text');
  const label = document.querySelector('.i_label');
  const smallImg = document.querySelector('.ite_label_img');
  const bigImg = document.querySelector('.ite_img');

  if (!title || !paragraph || !label) return;

  gsap.delayedCall(0.1, () => {
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
          once: true,
          onLeave: () => {
            splitTitle.revert();
            ScrollTrigger.refresh();
          }
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
        once: true,
        onLeave: () => {
          splitParagraph.revert();
          ScrollTrigger.refresh();
        }
      },
    }
  );

  const splitLabel = new SplitText(label, {
    type: 'lines',
    linesClass: 'split-line'
  });

  splitLabel.lines.forEach(line => {
    const wrapper = document.createElement('div');
    wrapper.style.overflow = 'hidden';
    wrapper.style.display = 'block';
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  gsap.fromTo(
    splitLabel.lines,
    { y: '110%' },
    {
      y: '0%',
      duration: 1.8,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: label,
        start: 'top 95%',
        toggleActions: 'play none none none',
        once: true,
        onLeave: () => {
          splitLabel.revert();
          ScrollTrigger.refresh();
        }
      },
    }
  );

  gsap.fromTo(
    smallImg,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 2.0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: smallImg,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    }
  );

  gsap.fromTo(
    bigImg,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 2.0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: bigImg,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    }
  );
};

const initItineraryAnimation = () => {
  const itineraryContent = document.querySelector('.itinerary_s');
  if (!itineraryContent) return;
  initTextAnimation();
};

export default initItineraryAnimation;
