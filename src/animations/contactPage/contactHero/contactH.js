import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const contactH = () => {
    const title = document.querySelector('.contact_title')
    const line = document.querySelector('.con_line')
    const labels = document.querySelectorAll('.c_c_label')
    const texts = document.querySelectorAll('.c_c_text')
    const imageWrapper = document.querySelector('.contact_img_w')
    const contactLabel = document.querySelector('.contact_label')
    const socialLinks = document.querySelectorAll('.nav_social_l')

    if (!title || !line || !labels.length || !texts.length || !imageWrapper || !contactLabel || !socialLinks.length) return;

    function initAnimation() {
        return new Promise((resolve) => {
            // Split title for 3D animation
            const splitTitle = new SplitText(title, {
                type: 'lines,words,chars',
                linesClass: 'split-line'
            })

            // Split labels and texts for line reveal
            const splitLabels = new SplitText(labels, {
                type: 'lines',
                linesClass: 'split-line'
            })

            const splitTexts = new SplitText(texts, {
                type: 'lines',
                linesClass: 'split-line'
            })

            // Create wrappers for title perspective effect
            splitTitle.lines.forEach(line => {
                const wrapper = document.createElement('div')
                wrapper.style.overflow = 'hidden'
                wrapper.style.display = 'block'
                wrapper.style.perspective = '1000px'
                line.parentNode.insertBefore(wrapper, line)
                wrapper.appendChild(line)
            })

            // Create wrappers for text mask effects
            const createLineWrappers = (splitInstance) => {
                splitInstance.lines.forEach(line => {
                    const wrapper = document.createElement('div')
                    wrapper.style.overflow = 'hidden'
                    line.parentNode.insertBefore(wrapper, line)
                    wrapper.appendChild(line)
                })
            }

            createLineWrappers(splitLabels)
            createLineWrappers(splitTexts)

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

            gsap.set(line, {
                scaleX: 0,
                transformOrigin: 'left'
            })

            gsap.set([splitLabels.lines, splitTexts.lines], {
                yPercent: 100
            })

            gsap.set(imageWrapper, {
                clipPath: 'inset(100% 0 0 0)'
            })

            gsap.set(contactLabel, {
                y: '100%'
            })

            gsap.set(socialLinks, {
                y: '100%',
                opacity: 0
            })

            // Create the main timeline
            const mainTl = gsap.timeline({
                onComplete: resolve
            })

            // Initial animations
            mainTl
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
                })
                // Scale line
                .to(line, {
                    scaleX: 1,
                    duration: 2.4,
                    ease: 'power4.inOut'
                }, '0.2')
                // Reveal labels
                .to(splitLabels.lines, {
                    yPercent: 0,
                    duration: 1.8,
                    ease: 'power4.out',
                    stagger: {
                        each: 0.1
                    }
                }, '0.4')
                // Reveal texts
                .to(splitTexts.lines, {
                    yPercent: 0,
                    duration: 1.8,
                    ease: 'power4.out',
                    stagger: {
                        each: 0.1
                    }
                }, '0.5')
                // Reveal image
                .to(imageWrapper, {
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 2.1,
                    ease: 'power4.inOut'
                }, '0.2')
                // Reveal contact label
                .to(contactLabel, {
                    y: '0%',
                    duration: 1.8,
                    ease: 'power4.out'
                }, '0.6')
                // Reveal social links
                .to(socialLinks, {
                    y: '0%',
                    opacity: 1,
                    duration: 1.4,
                    ease: 'power4.out',
                    stagger: {
                        each: 0.1
                    }
                }, '0.8')
        })
    }

    // Wait for fonts to load before starting animation
    return Promise.all([
        document.fonts.ready
    ]).then(initAnimation)
}

export default contactH