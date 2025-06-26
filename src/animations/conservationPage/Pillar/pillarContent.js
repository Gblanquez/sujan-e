import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const pillarContent = () => {
  const cards = document.querySelectorAll('.pillars_card');
  const contents = document.querySelectorAll('.pillar_content');
  const texts = document.querySelectorAll('.pillar_txt_c');

  if (!cards.length || !contents.length || !texts.length) return;

  let active = null;
  const timelines = [];

  contents.forEach((content, index) => {
    const text = texts[index];
    const card = cards[index];

    // Set initial state
    gsap.set(content, { height: 0, opacity: 0, visibility: 'hidden', overflow: 'hidden' });

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.inOut' } });

    // Expand content
    tl.to(content, {
      height: 'auto',
      opacity: 1,
      duration: 1.0,
      onStart: () => {
        content.style.visibility = 'visible';
        content.style.overflow = 'visible';
      }
    }, 0);

    // Animate SplitText lines
    tl.add(() => {
      const split = new SplitText(text, {
        type: 'lines',
        linesClass: 'split-line'
      });

      split.lines.forEach(line => {
        const wrap = document.createElement('div');
        wrap.style.overflow = 'hidden';
        wrap.style.display = 'block';
        line.parentNode.insertBefore(wrap, line);
        wrap.appendChild(line);
      });

      gsap.fromTo(
        split.lines,
        { y: '100%' },
        {
          y: '0%',
          opacity: 1,
          duration: 1.8,
          stagger: 0.08,
          ease: 'expo.out',
          onComplete: () => split.revert()
        }
      );
    }, 0.1);

    tl.reverse(); // Start reversed
    timelines[index] = tl;

    card.addEventListener('click', () => {
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

  // 👉 Open the first card automatically
  if (timelines[0]) {
    timelines[0].play();
    active = 0;
  }
};

export default pillarContent;