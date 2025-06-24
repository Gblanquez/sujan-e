import './styles/style.css'
import './transitions' 




import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

const list = document.querySelector('.exp_c_list');
const wrapper = document.querySelector('.exp_c_wrapper');

// Calculate max scroll amount
function getMaxScroll() {
  return list.scrollWidth - wrapper.offsetWidth;
}

let maxScroll = getMaxScroll();

// Create draggable instance
const draggable = Draggable.create(list, {
    type: "x",
    inertia: true,
    edgeResistance: 0.95, // closer to 1 = softer edges
    bounds: {
      minX: -maxScroll,
      maxX: 0
    },
    allowContextMenu: true,
    overshootTolerance: 0.15, // (optional) how far you can drag past bounds
    inertiaResistance: 20, // (optional) slows down inertia (higher = slower stop)
  })[0];

// Optional: Recalculate on resize
window.addEventListener('resize', () => {
  maxScroll = getMaxScroll();
  draggable.applyBounds({
    minX: -maxScroll,
    maxX: 0
  });
});

