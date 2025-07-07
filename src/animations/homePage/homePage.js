import initCampLinkAnimation from '../campLink/campLink'
import initIntroAnimation from '../introSection/introAnimation'
import initItineraryAnimation from '../itinerarySection/itinerarySection'
import initCollectionAnimation from '../collectionSection/collectionSection'
import initCertificationAnimation from '../certificationSection/certificationSection'
import initStoryDesktop from '../storySection/storySection'
import videoClick from './videoClick'
import logoMarquee from './logoMarquee'

const homePage = () => {
    videoClick()
    initCampLinkAnimation()
    // logoMarquee()
    initIntroAnimation()
    initItineraryAnimation()
    initCollectionAnimation()
    initCertificationAnimation()
    initStoryDesktop()

}

export default homePage