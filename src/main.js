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
import { stop, start, scrollTo, initSmoothScroll } from './smoothScroll/smoothScroll'

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
      await homeLoad()

      homePage()

      break

    case '/our-story':
      await storyLoad()
      storyPage()
      break

    case '/our-collection':
      await collectionLoad()
      collectionPage()
      break

    case '/conservation':
      await conservationLoad()
      conservationPage()
      break

    case '/relais-chateaux':
      await relaisLoad()
      relaisPage()
      break

    case '/press-and-awards':
      await pressLoad()
      pressPage()
      break

    case '/contact':
      await contactLoad()
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
        await campLoad()
        
        campPage()
        
      } else {
        console.warn('No match for this path:', path)
      }
      break
  }
}

init()

