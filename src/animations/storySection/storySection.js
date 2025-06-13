import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const initStoryDesktop = () => {
  gsap.registerPlugin(ScrollTrigger);

//   const contentEl = document.querySelector('.story_c_content');
//   if (contentEl) {
//     // Initial setup
//     gsap.set(contentEl, {
//       position: 'sticky',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       zIndex: '2'
//     });

//     // Create ScrollTrigger for content sticky behavior
//     ScrollTrigger.create({
//       trigger: '.story_s',
//       start: 'top bottom',
//       end: 'bottom -90%',
//       markers: true,
//       onUpdate: (self) => {
//         // Keep sticky until we reach the end point
//         if (self.progress < 1) {
//           gsap.set(contentEl, { position: 'sticky' });
//         } else {
//           gsap.set(contentEl, { position: 'relative' });
//         }
//       }
//     });
//   }

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
      { y: '50%' },
      {
        y: '-100%',
        duration: duration,
        ease: 'none',
      }, 0)
    .to(imageEl, {
      scale: 1.4,
      duration: 1.4,
      ease: 'none',
    }, 0);
  });

  return () => {
    if (tl.scrollTrigger) tl.scrollTrigger.kill();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
};

export default initStoryDesktop;