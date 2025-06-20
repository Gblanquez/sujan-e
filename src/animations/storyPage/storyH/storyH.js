import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const storyH = () => {
    const heroLabel = document.querySelector('.con_label')
    const heroTitle = document.querySelector('.con_title')
    const heroBg = document.querySelector('.bg_im')
    const introSection = document.querySelector('.intro_s_o')
    const heroTrigger = document.querySelector('.hero_s')

    if (!heroTitle || !heroBg || !heroLabel || !introSection || !heroTrigger) return;

    const bgImg = heroBg.querySelector('img') || heroBg;

    function initAnimation() {
        return new Promise((resolve) => {
            const splitTitle = new SplitText(heroTitle, {
                type: 'lines,words,chars',
                linesClass: 'split-line'
            })

            splitTitle.lines.forEach(line => {
                const wrapper = document.createElement('div')
                wrapper.style.overflow = 'hidden'
                wrapper.style.display = 'block'
                wrapper.style.perspective = '1000px'
                line.parentNode.insertBefore(wrapper, line)
                wrapper.appendChild(line)
            })

            // Set initial states
            gsap.set(heroTitle, {
                perspective: 1000,
                transformStyle: 'preserve-3d'
            })

            gsap.set(introSection, {
                scale: 0.8,
                y: '-16%',
                opacity: 0
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

            gsap.set(bgImg, {
                clipPath: 'inset(100% 0 0 0)'
            })

            gsap.set(heroLabel, {
                y: '100%'
            })

            // Create the main timeline for the hero section
            const heroTl = gsap.timeline({
                onComplete: resolve
            })

            // Initial animations
            heroTl
                .to(bgImg, {
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 2.1,
                    ease: 'power4.inOut'
                })
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
                .to(heroLabel, {
                    y: '0%',
                    duration: 1.8,
                    ease: 'power4.out'
                }, '1.0')
                .to(introSection, {
                    opacity: 1,
                    duration: 1.1,
                    ease: 'power2.out'
                }, '0.9')

            // Set up the scroll animation immediately
            gsap.to(introSection, {
                y: '0%',
                scale: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: heroTrigger,
                    start: 'top 92%',
                    end: 'bottom 30%',
                    toggleActions: 'play none none none',
                    scrub: 2,
                    invalidateOnRefresh: true
                }
            })
        })
    }

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

export default storyH;