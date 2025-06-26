import { gsap } from 'gsap';

const contactLink = () => {
  const links = document.querySelectorAll('.c_c_link');

  links.forEach(link => {
    const line = link.querySelector('.c_c_line');

    if (!line) return; // skip if no line

    // Initial state
    gsap.set(line, { x: '-100%', scaleX: 1, transformOrigin: 'left' });

    let isEntered = false;
    let isScaledOut = false;
    let hoverTimeline;

    link.addEventListener('mouseenter', () => {
      isEntered = true;
      isScaledOut = false;

      // Reset in case we hovered again after scale out
      gsap.set(line, { x: '-100%', scaleX: 1, transformOrigin: 'left' });

      // Kill existing tweens if any
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();
      hoverTimeline.to(line, {
        x: '0%',
        duration: 0.6,
        ease: 'power4.inOut',
        onComplete: () => {
          isScaledOut = false;
        }
      });
    });

    link.addEventListener('mouseleave', () => {
      if (!isEntered || !hoverTimeline) return;

      const progress = hoverTimeline.progress();

      if (progress < 1) {

        hoverTimeline.reverse();
      } else {

        gsap.to(line, {
          scaleX: 0,
          transformOrigin: 'right',
          duration: 0.6,
          ease: 'power4.inOut',
          onComplete: () => {
            isScaledOut = true;
            isEntered = false;
          }
        });
      }
    });
  });
};

export default contactLink;