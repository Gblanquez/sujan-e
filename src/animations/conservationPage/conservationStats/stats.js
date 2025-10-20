import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin);

const conservationStats = () => {
  const statCards = document.querySelectorAll('.stat_card');
  const statLabel = document.querySelectorAll('.stat_label');
  const statText = document.querySelectorAll('.stats_text');
  const statNumbers = document.querySelectorAll('.nm');
  const statWrapper = document.querySelector('.stats_p');
  const statList = document.querySelector('.stats_c');
  const statPagination = document.querySelector('.stat_pag_c');

  if (!statCards.length || !statNumbers.length) return;

  // Number animations
  statNumbers.forEach((number, index) => {
    const targetText = number.textContent;
    const targetNumber = parseFloat(targetText.replace(/,/g, ''));

    const formatNumber = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    gsap.set(number, { textContent: '0' });

    const cardTrigger = statCards[index] || number;

    gsap.to(number, {
      duration: 2.4,
      textContent: targetNumber,
      ease: 'power4.inOut',
      snap: { textContent: 1 },
      modifiers: {
        textContent: value => formatNumber(Math.round(value))
      },
      scrollTrigger: {
        trigger: cardTrigger,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      }
    });
  });

  // Text blocks animation
  statText.forEach((text) => {
    const splitText = new SplitText(text, {
      type: 'lines,words',
      linesClass: 'split-line'
    });

    splitText.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      wrapper.style.display = 'block';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.fromTo(
      splitText.lines,
      { y: '100%' },
      {
        y: '0%',
        duration: 1.8,
        ease: 'power4.out',
        stagger: { each: 0.02 },
        scrollTrigger: {
          trigger: text,
          start: 'top 60%',
          toggleActions: 'play none none none',
          once: true
        },
        onComplete: () => {
          splitText.revert();
        }
      }
    );
  });

  // Labels animation
  statLabel.forEach((label) => {
    const splitLabel = new SplitText(label, {
      type: 'lines,words',
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
      { y: '100%' },
      {
        y: '0%',
        duration: 1.8,
        ease: 'power4.out',
        stagger: { each: 0.02 },
        scrollTrigger: {
          trigger: label,
          start: 'top bottom',
          toggleActions: 'play none none none',
          once: true
        },
        onComplete: () => {
          // splitLabel.revert();
        }
      }
    );
  });

  // Horizontal draggable pagination
  if (window.innerWidth <= 1250 && statWrapper && statList) {
    function getMaxScroll() {
      const rawScroll = statList.scrollWidth - statWrapper.offsetWidth;
      return Math.max(1, rawScroll);
    }

    let maxScroll = getMaxScroll();

    const draggable = Draggable.create(statList, {
      type: 'x',
      inertia: true,
      edgeResistance: 0.95,
      bounds: {
        minX: -maxScroll,
        maxX: 0
      },
      onDrag: updatePagination,
      onThrowUpdate: updatePagination,
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

    function updatePagination() {
      const progress = Math.min(1, Math.abs(draggable.x) / maxScroll);
      gsap.to(statPagination, {
        scaleX: progress,
        transformOrigin: 'left center',
        ease: 'power3.out',
        duration: 0.3
      });
    }

    gsap.set(statPagination, {
      scaleX: 0,
      transformOrigin: 'left center'
    });
  }
};

export default conservationStats;
