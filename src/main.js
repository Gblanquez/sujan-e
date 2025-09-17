import './styles/style.css'
// import './transitions' 
// Import load animations
import homeLoad from './loadAnimations/homeLoad'
import storyLoad from './loadAnimations/storyLoad'
import collectionLoad from './loadAnimations/collectionLoad'
import conservationLoad from './loadAnimations/conservationLoad'
import relaisLoad from './loadAnimations/relaisLoad'
import pressLoad from './loadAnimations/pressLoad'
import contactLoad from './loadAnimations/contactLoad'
import campLoad from './loadAnimations/campLoad'
import { stop, start, scrollTo, initSmoothScroll, getLenis } from './smoothScroll/smoothScroll'

import menuHover from './animations/menu/menuHover'
import menuClick from './animations/menu/menuClick'
import clickMainButton from './animations/buttons/clickMainButton'
import subNavButtons from './animations/buttons/subNavButtons'
import footerLinks from './animations/footerLinks/footerLinks'
import navSmallLinks from './animations/navLinks/navSmallLinks'
import initNavLinkAnimation from './animations/navLinks/navLinks'
import yellowButton from './animations/buttons/yellowButton'
import darkButton from './animations/buttons/darkButton'
import lightButton from './animations/buttons/lightButton'
import mainButton from './animations/buttons/mainButtonH'
import NavlightButton from './animations/buttons/lightNavButton'

// // Import page initializations
import homePage from './animations/homePage/homePage'
import storyPage from './animations/storyPage/storyPage'
import conservationPage from './animations/conservationPage/conservationPage'
import pressPage from './animations/PressPage/pressPage'
import relaisPage from './animations/relaisPage/relaisPage'
import collectionPage from './animations/collectionPage/collectionPage'
import contactPage from './animations/contactPage/contactPage'
import campPage from './animations/campPage/campPage'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import Flip from 'gsap/Flip';
import ScrollToPlugin from 'gsap/ScrollToPlugin';


gsap.registerPlugin(ScrollTrigger, SplitText, Flip, ScrollToPlugin);

function highlightWordInTitle(selector, word, className = 't_label') {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(el => {
    const text = el.textContent;
    const regex = new RegExp(`(${word})`, 'gi');
    
    if (text.toLowerCase().includes(word.toLowerCase())) {
      el.innerHTML = text.replace(regex, `<span class="${className}">$1</span>`);
    }
  });
}

// Ensure DOM is loaded before running
document.addEventListener('DOMContentLoaded', () => {
  highlightWordInTitle('.story_title.seraFont', 'sanctuary');
  highlightWordInTitle('.story_title.sFont', 'spectacular');
  highlightWordInTitle('.story_title.jFont', 'legends');
});


//Animations for menu global//

initSmoothScroll()
menuClick()
clickMainButton()
subNavButtons()
navSmallLinks()
initNavLinkAnimation()
footerLinks()
yellowButton()
darkButton()
lightButton()
mainButton()
NavlightButton()



//test for page loads//


const getCurrentPath = () => {
  return window.location.pathname.replace(/\/$/, '') || '/'
}


const init = async () => {
  const path = getCurrentPath()

  switch (path) {
    case '/':
      // await homeLoad()

      homePage()

      break

    case '/our-story':
      // await storyLoad()
      storyPage()
      break

    case '/our-collection':
      // await collectionLoad()
      collectionPage()
      break

    case '/our-impact':
      // await conservationLoad()
      conservationPage()
      break

    case '/relais-chateaux':
      // await relaisLoad()
      relaisPage()
      break

    case '/press-and-awards':
      // await pressLoad()
      pressPage()
      break

    case '/contact':
      // await contactLoad()
      contactPage()
      break

    case '/product':
      // Optional: Add if needed
      break

    case '/terms-and-conditions':
      // Optional: Add if needed
      break

    default:
   
      if (path.startsWith('/sujan-camps/')) {
        // await campLoad()
        
        campPage()
        
      } else {
        console.warn('No match for this path:', path)
      }
      break
  }
}

init()




const navbar = document.querySelector('.g_nav_w');
const targets = [
  document.querySelector('.n_light_b'),
  document.querySelector('.m_text'),
  document.querySelector('.n_light_b'),
  document.querySelector('.logo_link_w'),
  ...document.querySelectorAll('.m_line')
];

const updateNavbar = (scrollY) => {
  const triggerPoint = window.innerHeight * 0.3;

  if (scrollY > triggerPoint) {
    navbar.classList.add('has-bg');
    targets.forEach(el => {
      if (!el) return;
      el.classList.add('dark');
    });
  } else {
    navbar.classList.remove('has-bg');
    targets.forEach(el => {
      if (!el) return;
      el.classList.remove('dark');
    });
  }
};


const forcedPages = [
  '/terms-and-conditions',
  '/contact',
  '/product',
  '/relais-chateaux',
  '/our-collection'
];

if (forcedPages.includes(window.location.pathname)) {
  navbar.classList.add('has-bg');
  targets.forEach(el => {
    if (!el) return;
    el.classList.add('dark');
  });
} else {
  const lenis = getLenis();
  if (lenis) {
    lenis.on('scroll', ({ scroll }) => {
      updateNavbar(scroll);
    });

    updateNavbar(lenis.scroll);
  }
}


const mobileTimeline = document.querySelector('.mobile_timeline_wrapper');
const mobileHeader   = document.querySelector('.mobile_header_content');
const buttonWrapper  = document.querySelector('.timeline_button_wrapper');
const lineAB         = document.querySelector('.timeline_line.ab');

if (mobileTimeline && mobileHeader && buttonWrapper && lineAB) {
  // start collapsed visually
  mobileTimeline.classList.add('is-collapsed');

  // set default states for button + line
  gsap.set(buttonWrapper, { rotation: 0 });
  gsap.set(lineAB, { scaleX: 1, transformOrigin: 'center center' });

  // click now happens on the button
  buttonWrapper.addEventListener('click', () => {
    const isExpanded = mobileTimeline.classList.toggle('is-expanded');
    mobileTimeline.classList.toggle('is-collapsed');

    // toggle header fade
    mobileHeader.classList.toggle('is-hidden', isExpanded);

    // animate plus button + line
    if (isExpanded) {
      // expanded → rotate 90deg + collapse line
      gsap.to(buttonWrapper, {
        rotation: 180,
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.to(lineAB, {
        scaleX: 0,
        transformOrigin: 'center center',
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      // collapsed → reset
      gsap.to(buttonWrapper, {
        rotation: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.to(lineAB, {
        scaleX: 1,
        transformOrigin: 'center center',
        duration: 0.4,
        ease: 'power2.out'
      });
    }

    // re-calculate ScrollTriggers after layout change
    ScrollTrigger.refresh();
  });
}



//Mobile Timeline

// mobile header updater — safe, robust version
(function setupMobileHeaderSync() {
  const headerYear  = document.querySelector('.mobile_current_year');
  const headerTitle = document.querySelector('.mobile_current_title');
  if (!headerYear || !headerTitle) return; // header not present

  // choose the right section nodes (desktop sections are .timeline_content_p)
  const sections = document.querySelectorAll('.timeline_content_p');
  if (!sections.length) return;

  // detect if you have a custom scroller (ASScroll or similar)
  // replace '.as-scroll' with your scroller selector if different
  const customScroller = document.querySelector('.as-scroll') || document.querySelector('.smooth-scroll');
  const scrollTriggerOpts = customScroller ? { scroller: customScroller } : {};

  // small helper to animate header change (nice and snappy)
  const updateHeader = (year, title) => {
    // quick hide -> set -> show
    const tween = gsap.timeline();
    tween.to([headerYear, headerTitle], { y: -8, opacity: 0, duration: 0.18, ease: 'power1.out' });
    tween.call(() => {
      headerYear.textContent  = year || '';
      headerTitle.textContent = title || '';
    });
    tween.to([headerYear, headerTitle], { y: 0, opacity: 1, duration: 0.28, ease: 'power2.out' });
  };

  // attach ScrollTrigger per "real" section
  sections.forEach(section => {
    // find the year/title inside this specific section (handles both desktop and CMS class variants)
    const yearEl  = section.querySelector('.y_title, .y_t');      // support both names
    const titleEl = section.querySelector('.timeline_title, .t_title');

    const yearText  = yearEl ? yearEl.textContent.trim() : '';
    const titleText = titleEl ? titleEl.textContent.trim() : '';

    ScrollTrigger.create(Object.assign({}, scrollTriggerOpts, {
      trigger: section,
      start: 'top 70%',   
      onEnter: () => updateHeader(yearText, titleText),
      onEnterBack: () => updateHeader(yearText, titleText),

    }));
  });

})();



const mobileItems = document.querySelectorAll('.timeline_m_item'); 
const sections    = document.querySelectorAll('.timeline_content_p'); 

if (mobileItems.length && sections.length) {
  mobileItems.forEach((item, index) => {
    item.addEventListener('click', e => {
      e.preventDefault();

      const target = sections[index];
      if (!target) return;

      const offset = -window.innerHeight * 0.1;

      scrollTo(target, {
        offset: offset,
        duration: 1.2,
        easing: t => 1 - Math.pow(1 - t, 3)
      });

      // collapse after scrolling
      setTimeout(() => {
        mobileTimeline.classList.add('is-collapsed');
        mobileTimeline.classList.remove('is-expanded');
        mobileHeader.classList.remove('is-hidden');


        gsap.to(buttonWrapper, {
          rotation: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(lineAB, {
          scaleX: 1,
          transformOrigin: 'center center',
          duration: 0.4,
          ease: 'power2.out'
        });

        ScrollTrigger.refresh();
      }, 1200);
    });
  });
}