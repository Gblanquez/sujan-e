import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const relaisHero = () => {
    const heroTitle = document.querySelector('.rc_title')
    const heroText = document.querySelector('.rc_text')
    const heroBg = document.querySelector('.i_s_full')
    const heroLogo = document.querySelector('.rc_certi_w')
    const heroImg = document.querySelector('.rc_img')
    const heroTrigger = document.querySelector('.i_s_w')

    if (!heroTitle || !heroText || !heroBg || !heroLogo || !heroImg || !heroTrigger) return;

    const bgImg = heroBg.querySelector('img') || heroBg;

    function initAnimation() {
        return new Promise((resolve) => {
            // Split the hero title for 3D animation
            const splitTitle = new SplitText(heroTitle, {
                type: 'lines,words,chars',
                linesClass: 'split-line'
            })

            // Create perspective wrapper for title
            splitTitle.lines.forEach(line => {
                const wrapper = document.createElement('div')
                wrapper.style.overflow = 'hidden'
                wrapper.style.display = 'block'
                wrapper.style.perspective = '1000px'
                line.parentNode.insertBefore(wrapper, line)
                wrapper.appendChild(line)
            })

            // Split the hero text for line animation
            const splitText = new SplitText(heroText, {
                type: 'lines,words,chars',
                linesClass: 'split-line'
            })

            // Create overflow wrappers for text lines
            splitText.lines.forEach(line => {
                const wrapper = document.createElement('div')
                wrapper.style.overflow = 'hidden'
                wrapper.style.display = 'block'
                line.parentNode.insertBefore(wrapper, line)
                wrapper.appendChild(line)
            })

            // Set initial states
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
                transformStyle: 'preserve-3d',
                opacity: 0
            })

            gsap.set(splitText.lines, {
                y: '100%'
            })

            gsap.set(bgImg, {
                clipPath: 'inset(100% 0 0 0)'
            })

            gsap.set(heroLogo, {
                opacity: 0
            })

            // Create the main timeline
            const heroTl = gsap.timeline({
                onComplete: resolve
            })
   
            heroTl
                // Reveal background image
                .to(bgImg, {
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 2.8,
                    ease: 'power4.inOut'
                }, '0.4')
                // Animate title chars with 3D effect
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
                }, '0.9')
                // Animate text lines
                .to(splitText.lines, {
                    y: '0%',
                    duration: 2.4,
                    ease: 'power4.inOut',
                    stagger: {
                        each: 0.02
                    }
                }, '1.0')
                // Fade in logo
                .to(heroLogo, {
                    opacity: 1,
                    duration: 2.1,
                    ease: 'power2.inOut'
                }, '1.0')

            // Add scroll trigger for heroImg scale animation
            gsap.fromTo(
                heroImg,
                {
                    scale: 1
                },
                {
                    scale: 1.2,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroTrigger,
                        start: 'top 80%',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            )
        })
    }

    // Wait for fonts and images to load before starting animation
    return Promise.all([
        document.fonts.ready,
        new Promise((resolve) => {
            if (bgImg.complete) {
                resolve();
            } else {
                bgImg.addEventListener('load', resolve);
            }
        })
    ]).then(initAnimation);
}

export default relaisHero