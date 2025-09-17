import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

const initStoryDesktop = () => {
  const storyWrapper = document.querySelector('.story_img_hold');
  const storyList = document.querySelector('.story_imgs_wrap');
  const storyImages = gsap.utils.toArray('.story_items');

  if (!storyWrapper || !storyList || !storyImages.length) return;

  let cleanupFn;

  if (window.innerWidth > 991) {
    // Desktop animation with scroll scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.story_s',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    storyImages.forEach((image, index) => {
      const duration = 1 + (index * 0.2);
      const imageEl = image.querySelector('.story_img_main');

      tl.to(imageEl,
        { scale: 1.4, duration: 1.4, ease: 'none' },
        0
      );
    });

    cleanupFn = () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  } else {
 
    function getMaxScroll() {
      return storyList.scrollWidth - storyWrapper.offsetWidth;
    }

    let maxScroll = getMaxScroll();

    const draggable = Draggable.create(storyList, {
      type: 'x',
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

    const handleResize = () => {
      maxScroll = getMaxScroll();
      draggable.applyBounds({
        minX: -maxScroll,
        maxX: 0
      });
    };

    window.addEventListener('resize', handleResize);

    cleanupFn = () => {
      draggable.kill();
      window.removeEventListener('resize', handleResize);
    };
  }

  return () => {
    if (typeof cleanupFn === 'function') cleanupFn();
  };
};

export default initStoryDesktop;