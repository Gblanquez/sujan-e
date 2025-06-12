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

initIntroAnimation()
initCampLinkAnimation()

initCollectionAnimation()

initCertificationAnimation()

initStoryDesktop()

initSmoothScroll()
menuClick()
clickMainButton()
subNavButtons()