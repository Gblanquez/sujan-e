import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const pressCampLink = () => {
    const pressCampLinks = document.querySelectorAll('.press_camp_link')
    
    if (!pressCampLinks.length) return;

    // First, add unique identifiers to each link group
    pressCampLinks.forEach((link, index) => {
        const groupId = `press-group-${index}`
        link.setAttribute('data-press-group', groupId)
        
        const img = link.querySelector('.c_press_img')
        const label = link.querySelector('.press_c_label')
        
        if (img) img.setAttribute('data-press-group', groupId)
        if (label) label.setAttribute('data-press-group', groupId)
    })

    // Now set up hover effects
    pressCampLinks.forEach(currentLink => {
        const currentGroupId = currentLink.getAttribute('data-press-group')
        
        // Get all images and labels that are NOT in the current group
        const otherImages = document.querySelectorAll(`.c_press_img:not([data-press-group="${currentGroupId}"])`)
        const otherLabels = document.querySelectorAll(`.press_c_label:not([data-press-group="${currentGroupId}"])`)

        // Create hover timeline
        const hoverTl = gsap.timeline({ 
            paused: true,
            defaults: {
                duration: 0.4,
                ease: 'power2.out'
            }
        })

        // Set up hover animation
        hoverTl
            .to(otherImages, {
                filter: 'grayscale(100%)',
                opacity: 0.5
            })
            .to(otherLabels, {
                opacity: 0.5
            }, '<') // '<' makes this animation start at the same time as the previous one

        // Add event listeners with some debouncing to prevent rapid firing
        let hoverTimeout
        
        currentLink.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout)
            hoverTl.play()
        })

        currentLink.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout)
            hoverTimeout = setTimeout(() => {
                hoverTl.reverse()
            }, 50) // Small delay to prevent flickering
        })
    })
}

export default pressCampLink