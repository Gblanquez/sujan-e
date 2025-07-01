import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import Flip from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

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
  const timelineIndicator = document.querySelector('.t_line');

  if (
    !tContent.length || !tTitle.length || !tText.length || !tImage.length ||
    !yTitle.length || !yearLabels.length || !timelineIndicator || !yearLineWrappers.length
  ) return;

  const splitTitles = [...tTitle].map(title =>
    new SplitText(title, {
      type: 'lines',
      linesClass: 'split-line'
    })
  );

  const splitYTitles = [...yTitle].map(title =>
    new SplitText(title, {
      type: 'chars',
      charsClass: 'split-char'
    })
  );

  const splitTexts = [...tText].map(text => {
    const split = new SplitText(text, {
      type: 'lines',
      linesClass: 'split-line'
    });

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
    }, '+=0.02');

    gsap.to(section, {
      opacity: 0,
      ease: 'power1.out',
      duration: 0.6,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  yearLabels.forEach((label, index) => {
    ScrollTrigger.create({
      trigger: tContent[index],
      start: 'top center',
      onEnter: () => {
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

  yText.forEach((el, i) => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const target = tContent[i];
      const y = target.offsetTop;

      gsap.to(window, {
        scrollTo: {
          y,
          autoKill: false
        },
        duration: 1.2,
        ease: 'power4.inOut'
      });
    });
  });
};

export default timeline;