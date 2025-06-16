import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const collectionH = () => {
    const title = document.querySelector('.oc_title')
    const text = document.querySelector('.oc_text')
    const imageWrappers = document.querySelectorAll('.ca_img_w')
    const mapDiv = document.querySelector('.oc_map_div')

    if (!title || !text || !imageWrappers.length || !mapDiv) return;

    function initAnimation() {
        return new Promise((resolve) => {
            // Split text for title with 3D animation
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

            // Set initial states
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

            // Set initial states for images and map
            imageWrappers.forEach(wrapper => {
                gsap.set(wrapper, {
                    clipPath: 'inset(100% 0 0 0)'
                })
            })

            gsap.set(mapDiv, {
                opacity: 0
            })

            // Create the main timeline
            const mainTl = gsap.timeline({
                onComplete: resolve
            })

            // Initial animations
            mainTl
                // Reveal all images with stagger
                .to(imageWrappers, {
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 2.8,
                    stagger: {
                        each: 0.14
                    },
                    ease: 'power4.inOut'
                }, '0.4')
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
                }, '0.3')
                // Animate text lines with mask reveal
                .to(splitText.lines, {
                    yPercent: 0,
                    duration: 1.8,
                    ease: 'power4.out',
                    stagger: {
                        each: 0.1
                    }
                }, '0.4')
                // Fade in map
                .to(mapDiv, {
                    opacity: 1,
                    duration: 1.8,
                    ease: 'power2.out'
                }, '0.6')
        })
    }

    // Wait for fonts and images to load before starting animation
    return Promise.all([
        document.fonts.ready,
        ...Array.from(imageWrappers).map(wrapper => {
            const img = wrapper.querySelector('img')
            return new Promise((resolve) => {
                if (!img || img.complete) {
                    resolve()
                } else {
                    img.addEventListener('load', resolve)
                }
            })
        })
    ]).then(initAnimation)
}

export default collectionH