import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const pressLink = () => {
    const pressLinks = document.querySelectorAll('.press_link')
    
    if (!pressLinks.length) return;

    // Set up hover effects
    pressLinks.forEach(link => {
        const img = link.querySelector('.pss_img')
        if (!img) return;

        // Create separate timelines for hover in and out
        const hoverInTl = gsap.timeline({ 
            paused: true,
            defaults: {
                duration: 1.0,
                ease: 'expo.out'
            }
        })

        const hoverOutTl = gsap.timeline({ 
            paused: true,
            defaults: {
                duration: 0.8,
                ease: 'expo.out'
            }
        })

        // Set up hover in animation
        hoverInTl.to(img, {
            scale: 1.1,
            filter: 'grayscale(100%)'
        })

        // Set up hover out animation
        hoverOutTl.to(img, {
            scale: 1,
            filter: 'grayscale(0%)',
        })

        // Add event listeners
        link.addEventListener('mouseenter', () => {
            hoverOutTl.pause()
            hoverInTl.restart()
        })

        link.addEventListener('mouseleave', () => {
            hoverInTl.pause()
            hoverOutTl.restart()
        })
    })
} 

export default pressLink