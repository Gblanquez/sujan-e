import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const pressLink = () => {
    const pressLinks = document.querySelectorAll('.press_link')
    const allPressImages = document.querySelectorAll('.pss_img')
    
    if (!pressLinks.length) return;

    pressLinks.forEach(link => {
        const currentImage = link.querySelector('.pss_img')
        if (!currentImage) return;

        link.addEventListener('mouseenter', () => {
            // Fade out other images
            allPressImages.forEach(img => {
                if (img !== currentImage) {
                    gsap.to(img, {
                        filter: 'grayscale(100%)',
                        opacity: 0.5,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.inOut'
                    })
                }
            })

            // Highlight current image
            gsap.to(currentImage, {
                filter: 'grayscale(0%)',
                opacity: 1,
                scale: 1.05,
                duration: 0.8,
                ease: 'power2.inOut'
            })
        })

        link.addEventListener('mouseleave', () => {
            // Reset all images
            allPressImages.forEach(img => {
                gsap.to(img, {
                    filter: 'grayscale(0%)',
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power2.inOut'
                })
            })
        })
    })
} 

export default pressLink