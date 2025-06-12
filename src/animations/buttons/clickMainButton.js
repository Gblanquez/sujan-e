import { gsap } from 'gsap'

const clickMainButton = () => 
{
    const mainButton = document.querySelector('.main_b')
    const subNav = document.querySelector('.book_s_w')
    const subTitle = document.querySelectorAll('.s_textspan')
    const subLabel = document.querySelectorAll('.s_textlabel')
    const subImage = document.querySelectorAll('.sub_img')
    const subWrapper = document.querySelector('.book_sm_p')

    let isOpen = false
    const tlOpen = gsap.timeline({ paused: true })
    const tlClose = gsap.timeline({ paused: true })

    const resetToInitialState = () => {
        gsap.set(subNav, { display: 'none', opacity: 0 })
        gsap.set(subWrapper, { scaleY: 0, transformOrigin: 'top' })
        gsap.set(subImage, { x: '-100%' })
        gsap.set(subTitle, { y: '105%', opacity: 0 })
        gsap.set(subLabel, { y: '105%', opacity: 0 })
        tlOpen.progress(0).pause()
        tlClose.progress(0).pause()
    }

    // Initial setup
    resetToInitialState()

    tlOpen
        .to(subNav, {
            display: 'block',
            opacity: 1,
            duration: 0.1
        })
        .to(subWrapper, { 
            scaleY: 1,
            duration: 1.2,
            ease: 'power4.inOut'
        }, '>')
        .fromTo(subImage,
            { x: '-100%' },
            {
                x: '0%',
                duration: 1.1,
                ease: 'power4.inOut',
                stagger:
                {
                    each: 0.03
                }
            },
            '0.5'
        )
        .fromTo(subTitle,
            { y: '105%' },
            {
                y: '0%',
                opacity: 1,
                duration: 1.2,
                ease: 'power4.inOut',
                stagger: 
                {
                    each: 0.02
                }
            },
            '0.6'
        )
        .fromTo(subLabel,
            { y: '105%' },
            {
                y: '0%',
                opacity: 1,
                duration: 1.2,
                ease: 'power4.inOut',
                stagger: 
                {
                    each: 0.02
                }
            },
            '0.7'
        )

    tlClose
        .to(subLabel, {
            y: '-105%',
            opacity: 0,
            duration: 1.2,
            ease: 'power4.inOut',
            stagger: {
                each: 0.02,
                from: 'end'
            }
        })
        .to(subTitle, {
            y: '-105%',
            opacity: 0,
            duration: 1.2,
            ease: 'power4.inOut',
            stagger: {
                each: 0.02,
                from: 'end'
            }
        }, '0.1')
        .to(subImage, {
            y: '-100%',
            duration: 1.1,
            ease: 'power4.inOut',
            stagger: {
                each: 0.03,
                from: 'end'
            }
        }, '0.2')
        .to(subWrapper, {
            scaleY: 0,
            duration: 1.2,
            ease: 'power4.inOut'
        }, '0.2')
        .to(subNav, {
            opacity: 0,
            duration: 0.1,
            onComplete: resetToInitialState
        }, '>')

    mainButton.addEventListener('click', () => {
        if (!isOpen) {
            // Set initial states immediately before playing
            gsap.set(subWrapper, { scaleY: 0, transformOrigin: 'top' })
            gsap.set(subTitle, { y: '105%', opacity: 0 })
            gsap.set(subLabel, { y: '105%', opacity: 0 })
            gsap.set(subImage, { x: '-100%' })
            tlOpen.play()
            isOpen = true
        } else {
            tlClose.play()
            isOpen = false
        }
    })
}

export default clickMainButton