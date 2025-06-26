import timeline from "./timelineSection/timeline"
import storyH from "./storyH/storyH"
import initIntroAnimation from '../introSection/introAnimation';
import initCollectionAnimation from '../collectionSection/collectionSection';
import initCampLinkAnimation from '../campLink/campLink';

const storyPage = () => {
   
   
    // storyH()
    timeline()
    initIntroAnimation()
    initCollectionAnimation()
    initCampLinkAnimation()
    

}

export default storyPage