import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

const initFilterYearCarousel = () => {
  const wrapper = document.querySelector('.year_camp_filter');
  const list = document.querySelector('.year_filter_list');

  if (!wrapper || !list) return; // safety check

  let draggableInstance;

  function enableDraggable() {
    const getMaxScroll = () => list.scrollWidth - wrapper.offsetWidth;
    let maxScroll = getMaxScroll();

    draggableInstance = Draggable.create(list, {
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

    window.addEventListener('resize', () => {
      maxScroll = getMaxScroll();
      draggableInstance?.applyBounds({
        minX: -maxScroll,
        maxX: 0
      });
    });
  }

  function disableDraggable() {
    if (draggableInstance) {
      draggableInstance.kill();
      draggableInstance = null;
    }
  }

  function checkViewport() {
    if (window.innerWidth <= 1100) {
      if (!draggableInstance) enableDraggable();
    } else {
      disableDraggable();
    }
  }

  // Initial check + listen for resize
  checkViewport();
  window.addEventListener('resize', checkViewport);
};

export default initFilterYearCarousel;