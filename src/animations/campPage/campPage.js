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

const campPage = () => {
  initExperienceClick();
  initTentlick();
  // initGallery();  
  // initExperience();
  emblem()
  campInfo()
  initIntroAnimation()
  initCollectionAnimation()
  initCampLinkAnimation()
  initStoryDesktop()
  featuredSection()
  featuredExperience()

}

export default campPage;