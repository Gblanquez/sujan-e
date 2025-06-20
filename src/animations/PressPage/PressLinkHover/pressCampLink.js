import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const pressCampLink = () => {
    const pressCampLinks = document.querySelectorAll('.press_camp_link')
    const allPressImages = document.querySelectorAll('.c_press_img')
    const allPressLabels = document.querySelectorAll('.press_c_label')
    
    if (!pressCampLinks.length) return;

    pressCampLinks.forEach(link => {
        const currentImage = link.querySelector('.c_press_img')
        const currentLabel = link.querySelector('.press_c_label')

        link.addEventListener('mouseenter', () => {
            // Fade out other images and labels
            allPressImages.forEach(img => {
                if (img !== currentImage) {
                    gsap.to(img, {
                        filter: 'grayscale(100%)',
                        opacity: 0.5,
                        duration: 0.8,
                        ease: 'power3.inOut'
                    })
                }
            })

            allPressLabels.forEach(label => {
                if (label !== currentLabel) {
                    gsap.to(label, {
                        opacity: 0.5,
                        duration: 0.8,
                        ease: 'power3.inOut'
                    })
                }
            })

            // Highlight current image and label
            gsap.to(currentImage, {
                filter: 'grayscale(0%)',
                opacity: 1,
                scale: 1.05,
                duration: 0.8,
                ease: 'power2.inOut'
            })

            gsap.to(currentLabel, {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.inOut'
            })
        })

        link.addEventListener('mouseleave', () => {
            // Reset all images and labels
            allPressImages.forEach(img => {
                gsap.to(img, {
                    filter: 'grayscale(0%)',
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power2.inOut'
                })
            })

            allPressLabels.forEach(label => {
                gsap.to(label, {
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.inOut'
                })
            })
        })
    })
}

export default pressCampLink