import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

const initExperience = () => {
  gsap.registerPlugin(Draggable, InertiaPlugin);

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

  // Optional: Recalculate on resize
  window.addEventListener('resize', () => {
    maxScroll = getMaxScroll();
    draggable.applyBounds({
      minX: -maxScroll,
      maxX: 0
    });
  });
}

export default initExperience;