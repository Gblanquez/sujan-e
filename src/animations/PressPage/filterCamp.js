import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

const initSimpleCarousel = () => {
  const wrapper = document.querySelector('.press_camp_filter');
  const list = document.querySelector('.press_camp_filter_list');

  if (!wrapper || !list) return;

  // Calculate max scroll based on last item's actual position
  const getMaxScroll = () => {
    const wrapperRect = wrapper.getBoundingClientRect();
    const lastItem = list.lastElementChild;
    if (!lastItem) return 0;

    const lastItemRect = lastItem.getBoundingClientRect();
    const extraSpace = lastItemRect.right - wrapperRect.right;

    return Math.max(0, extraSpace);
  };

  let maxScroll = getMaxScroll();

  let draggable = Draggable.create(list, {
    type: 'x',
    inertia: true,
    dragClickables: true, // important for form elements
    edgeResistance: 0.95,
    bounds: {
      minX: -maxScroll,
      maxX: 0
    },
    allowContextMenu: true,
    overshootTolerance: 0.15,
    inertiaResistance: 20
  })[0];

  // Recalculate on resize
  window.addEventListener('resize', () => {
    maxScroll = getMaxScroll();
    draggable.applyBounds({
      minX: -maxScroll,
      maxX: 0
    });
  });
};

export default initSimpleCarousel;