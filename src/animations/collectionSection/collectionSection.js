import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin);

const initTextAnimation = () => {
  const title = document.querySelector('.ca_title');
  const paragraph = document.querySelector('.ca_text');
  if (!title || !paragraph) return;

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

    gsap.fromTo(splitTitle.lines, {
      y: '110%',
    }, {
      y: '0%',
      stagger: { each: 0.1 },
      duration: 1.8,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
    });
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

  gsap.fromTo(splitParagraph.lines, {
    y: '110%',
  }, {
    y: '0%',
    stagger: { each: 0.04 },
    duration: 2.4,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: paragraph,
      start: 'top 95%',
      toggleActions: 'play none none none'
    },
  });
};

const initCollectionAnimation = () => {
  const collectionItems = document.querySelectorAll('.ca_link_w');
  const collectionWrapper = document.querySelector('.camp_s');
  const campList = document.querySelector('.ca_camp_list');
  const campWrapper = document.querySelector('.ca_camp_wrapper');

  if (!collectionWrapper || !collectionItems.length) return;

  // Scroll animation for items (desktop & mobile)
  gsap.fromTo('.ca_camp_item', {
    y: '50%'
  }, {
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
  });

  // Only enable draggable on mobile/tablet
  if (window.innerWidth <= 991 && campList && campWrapper) {
    function getMaxScroll() {
      return campList.scrollWidth - campWrapper.offsetWidth;
    }

    let maxScroll = getMaxScroll();

    const draggable = Draggable.create(campList, {
      type: "x",
      inertia: true,
      edgeResistance: 0.95,
      bounds: {
        minX: -maxScroll,
        maxX: 0
      },
      allowContextMenu: true,
      overshootTolerance: 0.15,
      inertiaResistance: 20
    })[0];

    window.addEventListener('resize', () => {
      maxScroll = getMaxScroll();
      draggable.applyBounds({
        minX: -maxScroll,
        maxX: 0
      });
    });
  }

  initTextAnimation();
};

export default initCollectionAnimation;