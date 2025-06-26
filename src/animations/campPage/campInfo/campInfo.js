import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const campInfo = () => {
  const containers = document.querySelectorAll('.info_c_c');
  const contents = document.querySelectorAll('.info_gc_content');
  const texts = document.querySelectorAll('.info_r_text');

  if (!containers.length) return;

  const animateStatic = () => {
    const title = document.querySelector('.info_m_title');
    if (title) {
      gsap.fromTo(title, {
        yPercent: 110
      }, {
        yPercent: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 92%',
          toggleActions: 'play none none none'
        }
      });
    }

    const labels = document.querySelectorAll('.info_label');
    if (labels.length) {
      gsap.fromTo(labels, {
        yPercent: 110
      }, {
        yPercent: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: labels[0],
          start: 'top 92%',
          toggleActions: 'play none none none'
        }
      });
    }

    const text = document.querySelector('.info_m_text');
    if (text) {
      const split = new SplitText(text, {
        type: 'lines,words,chars',
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
        duration: 1.3,
        ease: 'power4.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: text,
          start: 'top 92%',
          toggleActions: 'play none none none',
          once: true,
          onLeave: () => {
            split.revert();
          }
        }
      });
    }

    const infoLines = document.querySelectorAll('.info_line');
    if (infoLines.length) {
      infoLines.forEach(el => {
        gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });

        gsap.to(el, {
          scaleX: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });
      });
    }

    const tLines = document.querySelectorAll('.info_t_line, .info_t_line.ab');
    if (tLines.length) {
      tLines.forEach(el => {
        gsap.set(el, { scaleX: 0, transformOrigin: 'center center' });

        gsap.to(el, {
          scaleX: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });
      });
    }
  };

  animateStatic();

  let active = null;
  const timelines = [];

  containers.forEach((container, index) => {
    const line = container.querySelector('.info_line_t');
    const trigger = container.querySelector('.info_b_trigger');
    const tLine = container.querySelector('.info_t_line');
    const content = contents[index];
    const text = texts[index];

    gsap.set(line, { scaleX: 0, transformOrigin: 'left' });
    gsap.set(content, { height: 0, visibility: 'hidden', overflow: 'hidden' });
    gsap.set(text, { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 });
    gsap.set(trigger, { rotate: 0 });
    gsap.set(tLine, { scaleX: 1 });

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.inOut' } });

    tl.to(line, {
      scaleX: 1,
      duration: 1.2,
      onStart: () => {
        if (tl.reversed()) gsap.set(line, { transformOrigin: 'right' });
      },
      onReverseComplete: () => {
        gsap.set(line, { transformOrigin: 'left' });
      }
    }, 0);

    tl.to(content, {
      height: 'auto',
      duration: 1.2,
      onStart: () => content.style.visibility = 'visible'
    }, 0.1);

    tl.to(text, {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      duration: 1.4
    }, 0);

    tl.to(trigger, { rotate: 90, duration: 1.2 }, 0);
    tl.to(tLine, { scaleX: 0, duration: 1.2 }, 0);

    timelines[index] = tl;

    container.addEventListener('click', () => {
      const currentTL = timelines[index];

      if (active === index) {
        if (!currentTL.reversed() && currentTL.progress() < 1) {
          currentTL.reverse();
          active = null;
        } else if (currentTL.progress() === 1) {
          currentTL.reverse();
          active = null;
        }
        return;
      }

      if (active !== null && timelines[active]) {
        timelines[active].reverse();
      }

      currentTL.play();
      active = index;
    });
  });
};

export default campInfo;