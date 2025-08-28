import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import Flip from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { scrollTo } from '../../../smoothScroll/smoothScroll';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, ScrollToPlugin);

const timeline = () => {
  const tContent = document.querySelectorAll('.timeline_content_p');
  const tTitle = document.querySelectorAll('.timeline_title');
  const tText = document.querySelectorAll('.timeline_text');
  const tImage = document.querySelectorAll('.timeline_i_wrap');
  const yTitle = document.querySelectorAll('.y_title');
  const yText = document.querySelectorAll('.y_text');
  const yearLabels = document.querySelectorAll('.timeline_y_l_w');
  const yearLineWrappers = document.querySelectorAll('.y_line_w');
  const timelineIndicators = document.querySelectorAll('.t_line');

  if (
    !tContent.length || !tTitle.length || !tText.length || !tImage.length ||
    !yTitle.length || !yearLabels.length || !timelineIndicators.length || !yearLineWrappers.length
  ) return;

  // --- Make only one t_line active ---
  timelineIndicators.forEach((line, i) => {
    if (i === 0) {
      line.classList.add('active');
    } else {
      line.style.display = 'none';
    }
  });

  let timelineIndicator = document.querySelector('.t_line.active');

  const setActiveLine = (index) => {
    // hide all indicators
    timelineIndicators.forEach(line => line.style.display = 'none');
    // show the one active
    timelineIndicator = timelineIndicators[index];
    timelineIndicator.style.display = 'block';
  };

  // --- Split text ---
  const splitTitles = [...tTitle].map(title =>
    new SplitText(title, { type: 'lines', linesClass: 'split-line' })
  );

  const splitYTitles = [...yTitle].map(title =>
    new SplitText(title, { type: 'chars', charsClass: 'split-char' })
  );

  const splitTexts = [...tText].map(text => {
    const split = new SplitText(text, { type: 'lines', linesClass: 'split-line' });
    split.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      wrapper.style.display = 'block';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
    return split;
  });

  splitTitles.forEach(split => {
    split.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      wrapper.style.display = 'block';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
  });

  // --- Flip animation on scroll between images ---
  const items = document.querySelectorAll('.timeline_content_p');

  items.forEach((item, i) => {
    const currentImage = tImage[i];
    const next = items[i + 1];
    if (!next) return;

    const nextImage = tImage[i + 1];

    gsap.set(nextImage, {
      scale: 0.7,
      rotateZ: -8,
      rotateY: 10,
      rotateX: -10,
      skewX: 2,
    });

    gsap.set(tImage[i + 1].querySelector('img'), {
      filter: 'grayscale(100%)'
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: next,
        start: 'top 92%',
        end: 'top top',
        scrub: true
      }
    })
      .to(currentImage, {
        scale: 0.7,
        rotateZ: 8,
        rotateY: -10,
        rotateX: 10,
        skewX: -2,
        ease: 'linear'
      }, 0)
      .to(tImage[i].querySelector('img'), {
        filter: 'grayscale(100%)',
        ease: 'linear'
      }, 0)
      .to(nextImage, {
        scale: 1,
        rotateZ: 0,
        rotateY: 0,
        rotateX: 0,
        skewX: 0,
        ease: 'linear'
      }, 0)
      .to(tImage[i + 1].querySelector('img'), {
        filter: 'grayscale(0%)',
        ease: 'linear'
      }, 0);
  });

  // --- Text + image reveal animation ---
  tContent.forEach((section, i) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 25%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(tImage[i], {
      clipPath: 'inset(100% 0% 0% 0%)'
    }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.2,
      ease: 'power4.out'
    })
    .fromTo(splitTitles[i].lines, {
      y: '110%'
    }, {
      y: '0%',
      duration: 1,
      ease: 'power4.out',
      stagger: 0.05
    }, '-=1.0')
    .fromTo(splitTexts[i].lines, {
      y: '100%'
    }, {
      y: '0%',
      duration: 1,
      ease: 'power4.out',
      stagger: 0.05
    }, '<0.1')
    .fromTo(splitYTitles[i].chars, {
      x: '-10%',
      y: '100%',
      rotateX: -72,
      rotateY: -45,
      rotateZ: -4,
      transformOrigin: 'top',
      transformStyle: 'preserve-3d',
      opacity: 0
    }, {
      x: '0%',
      y: '0%',
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      opacity: 1,
      duration: 1.4,
      ease: 'power4.out',
      stagger: 0.03
    }, '0.2');
  });

  // --- Flip timeline indicator on scroll ---
  yearLabels.forEach((label, index) => {
    ScrollTrigger.create({
      trigger: tContent[index],
      start: 'top center',
      onEnter: () => {
        setActiveLine(index);
        const state = Flip.getState(timelineIndicator);
        yearLineWrappers[index].appendChild(timelineIndicator);
        Flip.from(state, {
          duration: 0.4,
          ease: 'power2.inOut',
          absolute: true
        });
      }
    });
  });

  // --- Year label click -> scroll to correct content ---
  yText.forEach((el, index) => {
    el.addEventListener('click', e => {
      e.preventDefault();

      const target = tContent[index];
      const lineTarget = yearLineWrappers[index];

      if (!target || !lineTarget) return;

      setActiveLine(index);

      const state = Flip.getState(timelineIndicator);
      lineTarget.appendChild(timelineIndicator);
      Flip.from(state, {
        duration: 0.4,
        ease: 'power2.inOut',
        absolute: true
      });

      scrollTo(target, {
        offset: 0,
        duration: 1.2,
        easing: t => 1 - Math.pow(1 - t, 3)
      });
    });
  });

  // --- Keyboard navigation ---
  document.addEventListener('keydown', (e) => {
    const currentSection = [...tContent].findIndex(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
    });

    if (currentSection === -1) return;

    const nextIndex = e.key === 'ArrowDown' || e.key === 'ArrowRight'
      ? (currentSection + 1) % tContent.length
      : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
      ? (currentSection - 1 + tContent.length) % tContent.length
      : null;

    if (nextIndex !== null) {
      const target = tContent[nextIndex];
      const lineTarget = yearLineWrappers[nextIndex];

      if (lineTarget && timelineIndicator) {
        setActiveLine(nextIndex);
        const state = Flip.getState(timelineIndicator);
        lineTarget.appendChild(timelineIndicator);
        Flip.from(state, {
          duration: 0.4,
          ease: 'power2.inOut',
          absolute: true
        });
      }

      scrollTo(target, {
        offset: 0,
        duration: 1.2,
        easing: t => 1 - Math.pow(1 - t, 3)
      });
    }
  });
};

export default timeline;