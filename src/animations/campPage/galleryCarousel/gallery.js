import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger);

const initGallery = () => {
  const list = document.querySelector('.g_collection_list');
  const wrapper = document.querySelector('.g_c_wrapper');

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

  const gImages = document.querySelectorAll('.g_img');
  const gLabels = document.querySelectorAll('.g_label');

  gImages.forEach((img, i) => {
    gsap.set(img, {
      clipPath: 'inset(100% 0% 0% 0%)'
    });

    gsap.to(img, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: img,
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.1
    });
  });

  gLabels.forEach((label, i) => {
    gsap.fromTo(label, {
      yPercent: 110
    }, {
      yPercent: 0,
      duration: 1.4,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: label,
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.1
    });
  });
};

export default initGallery;