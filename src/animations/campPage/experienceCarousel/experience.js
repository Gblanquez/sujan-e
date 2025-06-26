import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger, SplitText);

const initExperience = () => {
  // DRAGGABLE SCROLLER
  const list = document.querySelector('.exp_c_list');
  const wrapper = document.querySelector('.exp_c_wrapper');

  function getMaxScroll() {
    return list.scrollWidth - wrapper.offsetWidth;
  }

  let maxScroll = getMaxScroll();

  const draggable = Draggable.create(list, {
    type: "x",
    inertia: true,
    edgeResistance: 0.95,
    bounds: {
      minX: -maxScroll,
      maxX: 0
    },
    allowContextMenu: true,
    overshootTolerance: 0.15,
    inertiaResistance: 20,
  })[0];

  window.addEventListener('resize', () => {
    maxScroll = getMaxScroll();
    draggable.applyBounds({
      minX: -maxScroll,
      maxX: 0
    });
  });

  // TEXT ANIMATIONS
  const textSelectors = [
    '.exp_title',
    '.exp_text',
    '.exp_c_title',
    '.exp_c_text'
  ];

  textSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      const split = new SplitText(el, {
        type: 'lines, words',
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
        duration: 1.,
        ease: 'power4.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none none',
        }
      });
    });
  });

  // IMAGE REVEAL
  const expImgs = document.querySelectorAll('.exp_img');

  expImgs.forEach((img, i) => {
    gsap.set(img, {
      clipPath: 'inset(100% 0% 0% 0%)'
    });

    gsap.to(img, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: img,
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.1
    });
  });

  // EXP_LINE ANIMATION
  const expLines = document.querySelectorAll('.exp_line');

  expLines.forEach((line, i) => {
    gsap.set(line, {
      scaleX: 0,
      transformOrigin: 'left center'
    });

    gsap.to(line, {
      scaleX: 1,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.1
    });
  });
};

export default initExperience;