import './styles/style.css'
import { initSmoothScroll } from './smoothScroll/smoothScroll'
import subNavButtons from './animations/buttons/subNavButtons'
import clickMainButton from './animations/buttons/clickMainButton'
import menuClick from './animations/menu/menuClick'
import initIntroAnimation from './animations/introSection/introAnimation'
import initCertificationAnimation from './animations/certificationSection/certificationSection'
import initStoryDesktop from './animations/storySection/storySection'
import initCollectionAnimation from './animations/collectionSection/collectionSection'
import initCampLinkAnimation from './animations/campLink/campLink'
import initItineraryAnimation from './animations/itinerarySection/itinerarySection'
import footerLinks from './animations/footerLinks/footerLinks'
import initNavLinkAnimation from './animations/navLinks/navLinks'
import navSmallLinks from './animations/navLinks/navSmallLinks'
import menuHover from './animations/menu/menuHover'


navSmallLinks()
initNavLinkAnimation()
initIntroAnimation()
initCampLinkAnimation()
initItineraryAnimation()
footerLinks()
initCollectionAnimation()
initCertificationAnimation()
initStoryDesktop()
initSmoothScroll()
menuHover()
menuClick()
clickMainButton()
subNavButtons()