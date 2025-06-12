import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const initStoryDesktop = () => {
  gsap.registerPlugin(ScrollTrigger);


  const storyImages = gsap.utils.toArray('.story_items');
  

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.story_s',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    }
  });


  storyImages.forEach((image, index) => {
    const duration = 1 + (index * 0.2); 
    const imageEl = image.querySelector('.story_img_main');
    

    tl.fromTo(image, 
      { y: '120%' },
      {
        y: '-60%',
        duration: duration,
        ease: 'none',
      }, 0)
    .to(imageEl, {
      scale: 1.2,
      duration: 1,
      ease: 'none',
    }, 0);
  });


  return () => {
    if (tl.scrollTrigger) tl.scrollTrigger.kill();
  };
};

export default initStoryDesktop;