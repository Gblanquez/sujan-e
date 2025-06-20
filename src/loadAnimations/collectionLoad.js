import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import loadImages from '../load/load'

const collectionLoad = async () => {
    const loadText = document.querySelector('.load_txt')
    const loadNumb = document.querySelector('.load_n')
    const loadBWrap = document.querySelector('.load_d')
    const loadB = document.querySelector('.load_bg')
    const view = document.querySelector('[data-barba="container"]')
    const heroSection = document.querySelector('.oc_h_p')
    const title = document.querySelector('.oc_title')
    const text = document.querySelector('.oc_text')
    const imageWrappers = document.querySelectorAll('.ca_img')
    const mapDiv = document.querySelector('.oc_map_div')
    const navWrapper = document.querySelector('.g_nav_w')

    // Set initial states
    gsap.set(view, { opacity: 0 })
    gsap.set(loadBWrap, { width: '12rem', height: '14rem' })
    gsap.set(loadB, { width: '100%', height: '0%' })
    gsap.set(loadNumb, { y: '100%' })
    gsap.set(navWrapper, { opacity: 0, y: '-100%' })
    
    // Set initial states for collection elements
    if (imageWrappers.length > 0) {
        imageWrappers.forEach(wrapper => {
            gsap.set(wrapper, {
                clipPath: 'inset(100% 0 0 0)'
            })
        })
    }
    
    if (mapDiv) {
        gsap.set(mapDiv, { 
            opacity: 0
        })
    }

    // Split load text
    const splitLoadText = new SplitText(loadText, {
        type: 'chars',
        charsClass: 'load-char'
    })

    // Set 3D properties on load text
    gsap.set(loadText, {
        perspective: 1000,
        transformStyle: 'preserve-3d'
    })

    // Set initial state for load text chars
    gsap.set(splitLoadText.chars, {
        x: '-10%',
        y: '100%',
        rotateX: -72,
        rotateY: -45,
        rotateZ: -4,
        transformOrigin: 'top',
        transformStyle: 'preserve-3d'
    })

    // Split title text with 3D animation
    const splitTitle = new SplitText(title, {
        type: 'lines,words,chars',
        linesClass: 'split-line'
    })

    // Split text for regular text with line reveal
    const splitText = new SplitText(text, {
        type: 'lines',
        linesClass: 'split-line'
    })

    // Create line wrappers for title perspective effect
    splitTitle.lines.forEach(line => {
        const wrapper = document.createElement('div')
        wrapper.style.overflow = 'hidden'
        wrapper.style.display = 'block'
        wrapper.style.perspective = '1000px'
        line.parentNode.insertBefore(wrapper, line)
        wrapper.appendChild(line)
    })

    // Create line wrappers for text mask effect
    splitText.lines.forEach(line => {
        const wrapper = document.createElement('div')
        wrapper.style.overflow = 'hidden'
        line.parentNode.insertBefore(wrapper, line)
        wrapper.appendChild(line)
    })

    // Set 3D properties on the title element
    gsap.set(title, {
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
        transformStyle: 'preserve-3d',
        opacity: 0
    })

    gsap.set(splitText.lines, {
        yPercent: 100
    })

    // Get the dimensions and position for the clip-path
    const heroRect = heroSection.getBoundingClientRect()
    const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const boxWidth = 12 * remSize
    const boxHeight = 14 * remSize
    
    // Calculate center point for initial clip rectangle
    const centerX = heroRect.width / 2
    const centerY = heroRect.height / 2

    // Get the loadBWrap position
    const loadBWrapRect = loadBWrap.getBoundingClientRect()
    const loadBWrapCenterX = loadBWrapRect.left + (loadBWrapRect.width / 2)
    const loadBWrapCenterY = loadBWrapRect.top + (loadBWrapRect.height / 2)
    
    // Calculate initial clip rectangle coordinates to match loadBWrap
    const initialLeft = loadBWrapCenterX - (loadBWrapRect.width / 2)
    const initialTop = loadBWrapCenterY - (loadBWrapRect.height / 2)
    const initialRight = loadBWrapCenterX + (loadBWrapRect.width / 2)
    const initialBottom = loadBWrapCenterY + (loadBWrapRect.height / 2)

    // Set initial clip-path using pixel values
    gsap.set(heroSection, { 
        clipPath: `polygon(${initialLeft}px ${initialTop}px, ${initialRight}px ${initialTop}px, ${initialRight}px ${initialBottom}px, ${initialLeft}px ${initialBottom}px)`,
        opacity: 1 
    })
    
    // Initialize loading number
    loadNumb.textContent = '00'

    // Create loading timeline
    const loadTl = gsap.timeline()

    loadTl
        .to(splitLoadText.chars, {
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
        .fromTo(loadNumb, {
            y: '100%'
        }, {
            y: '0%',
            duration: 1.2,
            ease: 'power2.out'
        }, '<+=0.3')
        .fromTo(loadBWrap, {
            scale: 0.7,
        }, {
            scale: 1,
            duration: 1,
            ease: 'power2.out'
        }, '<')

    // Wait for the initial animation to complete
    await loadTl.then()
    
    // Wait for images to load with error handling
    const imageLoadPromises = Array.from(imageWrappers).map(wrapper => {
        const img = wrapper.querySelector('img')
        return new Promise((resolve) => {
            if (!img) {
                resolve()
                return
            }
            
            if (img.complete) {
                resolve()
            } else {
                img.addEventListener('load', () => resolve())
                img.addEventListener('error', () => {
                    console.warn('Failed to load image:', img.src)
                    resolve() // Resolve anyway to continue with animations
                })
            }
        })
    })

    // Wait for all images to either load or fail
    await Promise.all([loadImages(), Promise.all(imageLoadPromises)])

    // Create exit timeline
    const exitTl = gsap.timeline()

    // Set transform origin before animation
    gsap.set(loadBWrap, { transformOrigin: 'top' })

    // Exit animations
    exitTl
        .to(splitLoadText.chars, {
            x: '-10%',
            y: '-100%',
            rotateX: 72,
            rotateY: 45,
            rotateZ: 4,
            duration: 2.4,
            ease: 'power4.inOut',
            stagger: {
                each: 0.03
            }
        })
        .to(loadNumb, {
            y: '100%',
            duration: 1,
            ease: 'power2.inOut'
        }, '<+=0.3')
        .to(loadBWrap, {
            scaleY: 0,
            duration: 1,
            ease: 'power2.inOut',
        }, '<+=0.2')

    // Create reveal timeline
    const revealTl = gsap.timeline()

    // Reveal animation with expanding polygon from center and collection elements
    revealTl
        .to(heroSection, {
            clipPath: `polygon(0px 0px, ${heroRect.width}px 0px, ${heroRect.width}px ${heroRect.height}px, 0px ${heroRect.height}px)`,
            duration: 1.8,
            ease: 'power4.inOut'
        }, '<+=0.5')
        // Reveal all images with stagger, checking if they exist first
        .add(() => {
            if (imageWrappers.length > 0) {
                gsap.to(imageWrappers, {
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 2.8,
                    stagger: {
                        each: 0.14
                    },
                    ease: 'power4.inOut'
                })
            }
        }, '<+=0.4')
        // Animate title chars
        .to(splitTitle.chars, {
            x: '0%',
            y: '0%',
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            opacity: 1,
            duration: 2.4,
            ease: 'power4.out',
            stagger: {
                each: 0.03
            }
        }, '<+=0.3')
        // Animate text lines with mask reveal
        .to(splitText.lines, {
            yPercent: 0,
            duration: 1.8,
            ease: 'power4.out',
            stagger: {
                each: 0.1
            }
        }, '<+=0.4')
        // Fade in map if it exists
        .add(() => {
            if (mapDiv) {
                gsap.to(mapDiv, {
                    opacity: 1,
                    duration: 1.8,
                    ease: 'power2.out'
                })
            }
        }, '<+=0.6')
        .to([navWrapper, '.intro_s'], {
            opacity: 1,
            y: '0%',
            duration: 2.2,
            ease: 'power4.out'
        }, '<+=0.2')

    // Set view to be visible from the start
    gsap.set(view, { opacity: 1 })

    // Wait for all animations to complete
    await Promise.all([exitTl.then(), revealTl.then()])

    // Refresh ScrollTrigger to pick up new elements
    ScrollTrigger.refresh()

    return Promise.resolve()
}

export default collectionLoad
