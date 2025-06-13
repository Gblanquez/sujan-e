import { Renderer } from '@unseenco/taxi'
import { gsap } from 'gsap'
import SplitText from 'gsap/SplitText'
import initNavLinkAnimation from '../animations/navLinks/navLinks'
import initIntroAnimation from '../animations/introSection/introAnimation'
import initCampLinkAnimation from '../animations/campLink/campLink'
import initItineraryAnimation from '../animations/itinerarySection/itinerarySection'
import initCollectionAnimation from '../animations/collectionSection/collectionSection'
import initCertificationAnimation from '../animations/certificationSection/certificationSection'
import initStoryDesktop from '../animations/storySection/storySection'
import menuHover from '../animations/menu/menuHover'
import menuClick from '../animations/menu/menuClick'
import clickMainButton from '../animations/buttons/clickMainButton'
import subNavButtons from '../animations/buttons/subNavButtons'

gsap.registerPlugin(SplitText)

export default class HomeRenderer extends Renderer {
    onEnter() {
        const heroTitle = document.querySelector('.h_title')
        const navWrapper = document.querySelector('.g_nav_w')

        // Split hero title text
        const splitTitle = new SplitText(heroTitle, {
            type: 'lines,words,chars',
            linesClass: 'split-line'
        })

        // Create line wrappers for the hero title and add perspective
        splitTitle.lines.forEach(line => {
            const wrapper = document.createElement('div')
            wrapper.style.overflow = 'hidden'
            wrapper.style.display = 'block'
            wrapper.style.perspective = '1000px'
            line.parentNode.insertBefore(wrapper, line)
            wrapper.appendChild(line)
        })

        // Set 3D properties on the title element
        gsap.set(heroTitle, {
            perspective: 1000,
            transformStyle: 'preserve-3d'
        })
 
        gsap.set(splitTitle.chars, { 
            x: '-10%',
            y: '100%',
            rotateX: -72,
            rotateY: -45,
            rotateZ: -4,
            transformOrigin: 'top',
            transformStyle: 'preserve-3d'
        })

        // Set initial nav state
        gsap.set(navWrapper, { opacity: 0, y: '-100%' })

        // Create entrance timeline
        const entranceTl = gsap.timeline()

        entranceTl
            .to(splitTitle.chars, {
                x: '0%',
                y: '0%',
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                duration: 2.4,
                ease: 'power4.out',
                stagger: {
                    each: 0.03
                }
            })
            .to(navWrapper, {
                opacity: 1,
                y: '0%',
                duration: 2.2,
                ease: 'power4.out'
            }, '<+=0.2')

        // Initialize all other animations
        initNavLinkAnimation()
        initIntroAnimation()
        initCampLinkAnimation()
        initItineraryAnimation()
        initCollectionAnimation()
        initCertificationAnimation()
        initStoryDesktop()
        menuHover()
        menuClick()
        clickMainButton()
        subNavButtons()

        return entranceTl
    }

    onLeave() {
        // Add any leave animations here if needed
    }
} 