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

  if (campList && campWrapper) {
    function getMaxScroll() {
      return campList.scrollWidth - campWrapper.offsetWidth;
    }
  
    let maxScroll = getMaxScroll();
  
    const dots = gsap.utils.toArray('.camp_pag_dot');
    const nextBtn = document.querySelector('.camp_pag_next');
    const prevBtn = document.querySelector('.camp_pag_previous');
  
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
      inertiaResistance: 20,
      onDrag: () => {
        updateActiveDot();
        updateButtonStates();
      },
      onThrowUpdate: () => {
        updateActiveDot();
        updateButtonStates();
      }
    })[0];
  
    updateDots(0);
    updateButtonStates();
  
    function updateDots(activeIndex) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === activeIndex);
      });
    }
  
    function updateActiveDot() {
      const itemWidth = campWrapper.offsetWidth;
      const pos = Math.abs(draggable.x);
      let index = Math.round(pos / itemWidth);
    
      // Force to first/last if fully scrolled
      if (draggable.x >= 0) {
        index = 0;
      } else if (draggable.x <= -maxScroll) {
        index = dots.length - 1;
      }
    
      updateDots(index);
    }

    function updateButtonStates() {
      const atStart = draggable.x >= 0;
      const atEnd = draggable.x <= -maxScroll;

      if (prevBtn) {
        prevBtn.classList.toggle('is-disable', atStart);
        prevBtn.classList.toggle('is-active', !atStart);
      }
      if (nextBtn) {
        nextBtn.classList.toggle('is-disable', atEnd);
        nextBtn.classList.toggle('is-active', !atEnd);
      }
    }
  
    function goToOffset(offset) {
      const minX = -maxScroll;
      const maxX = 0;
      let targetX = draggable.x + offset;
  
      if (targetX > maxX) targetX = maxX;
      if (targetX < minX) targetX = minX;
  
      gsap.to(campList, {
        x: targetX,
        duration: 0.8,
        ease: 'power3.inOut',
        onUpdate: () => draggable.update(),
        onComplete: () => {
          updateActiveDot();
          updateButtonStates();
        }
      });
    }
  
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (!nextBtn.classList.contains('is-disable')) {
          goToOffset(-campWrapper.offsetWidth);
        }
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (!prevBtn.classList.contains('is-disable')) {
          goToOffset(campWrapper.offsetWidth);
        }
      });
    }
  
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        gsap.to(campList, {
          x: -campWrapper.offsetWidth * i,
          duration: 0.8,
          ease: 'power3.inOut',
          onUpdate: () => draggable.update(),
          onComplete: () => {
            updateDots(i);
            updateButtonStates();
          }
        });
      });
    });
  
    window.addEventListener('resize', () => {
      maxScroll = getMaxScroll();
      draggable.applyBounds({
        minX: -maxScroll,
        maxX: 0
      });
      updateButtonStates();
    });
  }

  initTextAnimation();
};

export default initCollectionAnimation;