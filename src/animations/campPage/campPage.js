import initGallery from './galleryCarousel/gallery';
import initExperience from './experienceCarousel/experience';
import campH from './campHero/campH';
import emblem from './emblems/emblem';
import campInfo from './campInfo/campInfo';
import tentEffect from './tentsSection/tents';
import initIntroAnimation from '../introSection/introAnimation';
import initStoryDesktop from '../storySection/storySection';
import initCollectionAnimation from '../collectionSection/collectionSection';
import initCampLinkAnimation from '../campLink/campLink';
import featuredSection from './featuredSection/fetsection';
import featuredExperience from './featuredExperience/fetuExperience';
import initExperienceClick from './experienceCarousel/experienceClick';
import initTentlick from './tentsSection/tentClick';
import { videoClickCamp } from './videoClickCamp';

const campPage = () => {
//   campH()
  initExperienceClick();
  initTentlick();
  initGallery();  
  initExperience();
  emblem()
  campInfo()
  videoClickCamp()
  // tentEffect()
  initIntroAnimation()
  initCollectionAnimation()
  initCampLinkAnimation()
  initStoryDesktop()
  featuredSection()
  featuredExperience()

}

export default campPage;