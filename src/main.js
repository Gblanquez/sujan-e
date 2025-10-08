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

const getCurrentPath = () => {
  return window.location.pathname.replace(/\/$/, '') || '/'
}

const init = async () => {
  // Highlight specific words in titles (now safely after fonts are loaded)
  highlightWordInTitle('.story_title.seraFont', 'sanctuary');
  highlightWordInTitle('.story_title.sFont', 'spectacular');
  highlightWordInTitle('.story_title.jFont', 'legends');

  // Global animation & UI initializations
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

  // Page-specific animations
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

  // Navbar behavior
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
      targets.forEach(el => el && el.classList.add('dark'));
    } else {
      navbar.classList.remove('has-bg');
      targets.forEach(el => el && el.classList.remove('dark'));
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
    targets.forEach(el => el && el.classList.add('dark'));
  } else {
    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', ({ scroll }) => {
        updateNavbar(scroll);
      });
      updateNavbar(lenis.scroll);
    }
  }

  // Mobile Timeline toggle
  const mobileTimeline = document.querySelector('.mobile_timeline_wrapper');
  const mobileHeader   = document.querySelector('.mobile_header_content');
  const buttonWrapper  = document.querySelector('.timeline_button_wrapper');
  const lineAB         = document.querySelector('.timeline_line.ab');

  if (mobileTimeline && mobileHeader && buttonWrapper && lineAB) {
    mobileTimeline.classList.add('is-collapsed');
    gsap.set(buttonWrapper, { rotation: 0 });
    gsap.set(lineAB, { scaleX: 1, transformOrigin: 'center center' });

    buttonWrapper.addEventListener('click', () => {
      const isExpanded = mobileTimeline.classList.toggle('is-expanded');
      mobileTimeline.classList.toggle('is-collapsed');
      mobileHeader.classList.toggle('is-hidden', isExpanded);

      if (isExpanded) {
        gsap.to(buttonWrapper, { rotation: 180, duration: 0.4, ease: 'power2.out' });
        gsap.to(lineAB, { scaleX: 0, transformOrigin: 'center center', duration: 0.4, ease: 'power2.out' });
      } else {
        gsap.to(buttonWrapper, { rotation: 0, duration: 0.4, ease: 'power2.out' });
        gsap.to(lineAB, { scaleX: 1, transformOrigin: 'center center', duration: 0.4, ease: 'power2.out' });
      }

      ScrollTrigger.refresh();
    });
  }

  // Mobile header sync
  (function setupMobileHeaderSync() {
    const headerYear  = document.querySelector('.mobile_current_year');
    const headerTitle = document.querySelector('.mobile_current_title');
    if (!headerYear || !headerTitle) return;

    const sections = document.querySelectorAll('.timeline_content_p');
    if (!sections.length) return;

    const customScroller = document.querySelector('.as-scroll') || document.querySelector('.smooth-scroll');
    const scrollTriggerOpts = customScroller ? { scroller: customScroller } : {};

    const updateHeader = (year, title) => {
      const tween = gsap.timeline();
      tween.to([headerYear, headerTitle], { y: -8, opacity: 0, duration: 0.18, ease: 'power1.out' });
      tween.call(() => {
        headerYear.textContent  = year || '';
        headerTitle.textContent = title || '';
      });
      tween.to([headerYear, headerTitle], { y: 0, opacity: 1, duration: 0.28, ease: 'power2.out' });
    };

    sections.forEach(section => {
      const yearEl  = section.querySelector('.y_title, .y_t');
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

  // Mobile timeline item scroll
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

        setTimeout(() => {
          mobileTimeline.classList.add('is-collapsed');
          mobileTimeline.classList.remove('is-expanded');
          mobileHeader.classList.remove('is-hidden');

          gsap.to(buttonWrapper, { rotation: 0, duration: 0.4, ease: 'power2.out' });
          gsap.to(lineAB, { scaleX: 1, transformOrigin: 'center center', duration: 0.4, ease: 'power2.out' });

          ScrollTrigger.refresh();
        }, 1200);
      });
    });
  }
};


Promise.all([
  new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve)),
  document.fonts.ready
]).then(() => {
  init()
});
