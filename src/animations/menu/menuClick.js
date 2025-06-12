import { gsap } from 'gsap'

const menuClick = () => {
    const menuTrigger = document.querySelector('.g_nav_menu_p')
    const menuOpen = document.querySelector('.g_nav_open')
    const menuImgs = document.querySelectorAll('.nc_m_wrap')
    const menuTitles = document.querySelectorAll('.nc_title')
    const menuLabels = document.querySelectorAll('.nc_label')
    const menuLinks = document.querySelectorAll('.nc_link')
    const menuSocialLinks = document.querySelectorAll('.nav_social_l')
    
    // Menu/Close elements
    const menuText = document.querySelector('.m_text')
    const closeText = document.querySelector('.m_text_close')
    const menuParent = document.querySelector('.m_l_w')
    const closeParent = document.querySelector('.m_l_close')
    const menuLineWrap = document.querySelector('.m_l_wrap')
    const closeLineWrap = document.querySelector('.m_l_close_wrap')
    const closeLineWrapper = document.querySelector('.m_line_close_w')

    let isOpen = false
    const tlOpen = gsap.timeline({ paused: true })
    const tlClose = gsap.timeline({ paused: true })

    // Set initial states
    gsap.set(menuOpen, { display: 'none' })
    gsap.set(menuImgs, { clipPath: 'inset(0 0 100% 0)' })
    gsap.set(menuTitles, { y: '100%' })
    gsap.set(menuLabels, { y: '100%' })
    gsap.set(menuLinks, { y: '100%' })
    gsap.set(menuSocialLinks, { y: '100%', opacity: 0 })
    gsap.set(closeText, { y: '110%', opacity: 0 })
    gsap.set(closeParent, { display: 'none' })
    gsap.set(closeLineWrap, { display: 'none' })
    gsap.set(menuLineWrap, { display: 'flex' })

    const resetCloseState = () => {
        gsap.set(closeText, { y: '110%', opacity: 0 })
        gsap.set(closeParent, { display: 'flex', opacity: 0 })
        gsap.set(closeLineWrap, { display: 'flex', opacity: 0 })
        gsap.set('.line_close:first-child', { 
            scaleX: 0,
            rotate: 45,
            transformOrigin: 'center'
        })
        gsap.set('.line_close:nth-child(2)', { 
            scaleX: 0,
            rotate: -45,
            transformOrigin: 'center',
            position: 'absolute'
        })
    }

    // Menu to Close transition timeline
    const menuToCloseTimeline = gsap.timeline({ paused: true })
        .to(menuParent, {
            opacity: 0,
            duration: 1.2,
            ease: 'power4.inOut',
        })
        .to(menuText, {
            y: '-110%',
            opacity: 0,
            duration: 1.2,
            ease: 'power4.inOut',
        }, '<')
        .to(menuLineWrap, {
            opacity: 0,
            duration: 0.6,
            ease: 'power4.inOut',
        }, '<')
        .set(menuParent, { display: 'none' })
        .set(menuLineWrap, { display: 'none' })
        .add(resetCloseState)
        .to([closeParent, closeLineWrap], {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
        })
        .to('.line_close:first-child', {
            scaleX: 1,
            duration: 0.8,
            ease: 'power4.inOut',
        }, '-=0.4')
        .to('.line_close:nth-child(2)', {
            scaleX: 1,
            duration: 0.8,
            ease: 'power4.inOut',
        }, '-=0.64')
        .to(closeText, {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            ease: 'power4.inOut',
        }, '<')

    // Close to Menu transition timeline
    const closeToMenuTimeline = gsap.timeline({ paused: true })
        .to([closeParent, closeLineWrap], {
            opacity: 0,
            duration: 0.8,
            ease: 'power4.inOut',
        })
        .to('.line_close:first-child, .line_close:nth-child(2)', {
            scaleX: 0,
            duration: 0.8,
            ease: 'power4.inOut',
        }, '<')
        .to(closeText, {
            y: '110%',
            opacity: 0,
            duration: 0.8,
            ease: 'power4.inOut',
        }, '<')
        .set(closeParent, { display: 'none' })
        .set(closeLineWrap, { display: 'none' })
        .set(menuParent, { 
            display: 'flex',
            opacity: 0
        }, '<')
        .set(menuLineWrap, { 
            display: 'flex',
            opacity: 0
        }, '<')
        .set(menuText, {
            y: '-110%',
            opacity: 0
        }, '<')
        .to([menuParent, menuLineWrap], {
            opacity: 1,
            duration: 1.2,
            ease: 'power4.inOut',
        }, '-=0.4')
        .to(menuText, {
            y: '0%',
            opacity: 1,
            duration: 1.2,
            ease: 'power4.inOut',
        }, '<')

    // Main menu content animations remain the same
    tlOpen
        .to(menuOpen, {
            display: 'block',
            duration: 0.1
        })
        .to(menuOpen, {
            transform: 'translateY(0%)',
            duration: 1.8,
            ease: 'power4.inOut'
        })
        .fromTo(menuImgs,
            { clipPath: 'inset(0 0 100% 0)' },
            {
                clipPath: 'inset(0 0 0% 0)',
                duration: 2.0,
                ease: 'power2.inOut',
                stagger: {
                    each: 0.01
                }
            },
            '0.2'
        )
        .fromTo(menuTitles,
            { y: '100%' },
            {
                y: '0%',
                duration: 1.2,
                ease: 'power4.inOut',
                stagger: {
                    each: 0.02
                }
            },
            '0.6'
        )
        .fromTo(menuLabels,
            { y: '100%' },
            {
                y: '0%',
                duration: 1.2,
                ease: 'power4.inOut',
                stagger: {
                    each: 0.02
                }
            },
            '0.7'
        )
        .fromTo(menuLinks,
            { y: '100%' },
            {
                y: '0%',
                duration: 1.2,
                ease: 'power4.inOut',
                stagger: {
                    each: 0.02
                }
            },
            '0.8'
        )
        .fromTo(menuSocialLinks,
            {
                y: '100%',
                opacity: 0
            },
            {
                y: '0%',
                opacity: 1,
                duration: 1.2,
                ease: 'power4.inOut',
                stagger: {
                    each: 0.02
                }
            },
            '0.8'
        )

    tlClose
        .to(menuSocialLinks, {
            y: '100%',
            opacity: 0,
            duration: 0.8,
            ease: 'power4.inOut',
            stagger: {
                each: 0.02,
                from: 'end'
            }
        })
        .to(menuLinks, {
            y: '100%',
            duration: 0.8,
            ease: 'power4.inOut',
            stagger: {
                each: 0.02,
                from: 'end'
            }
        }, '0.1')
        .to(menuLabels, {
            y: '100%',
            duration: 0.8,
            ease: 'power4.inOut',
            stagger: {
                each: 0.02,
                from: 'end'
            }
        }, '0.2')
        .to(menuTitles, {
            y: '100%',
            duration: 0.8,
            ease: 'power4.inOut',
            stagger: {
                each: 0.02,
                from: 'end'
            }
        }, '0.3')
        .to(menuImgs, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.2,
            ease: 'power2.inOut',
            stagger: {
                each: 0.01,
                from: 'end'
            }
        }, '0.4')
        .to(menuOpen, {
            transform: 'translateY(-100%)',
            duration: 1.4,
            ease: 'power4.inOut'
        }, '0.4')
        .set(menuOpen, {
            display: 'none'
        })

    menuTrigger.addEventListener('click', () => {
        if (!isOpen) {
            // Reset both timelines and set initial states
            tlClose.pause(0)
            tlOpen.pause(0)
            menuToCloseTimeline.play()
            
            // Reset all states before opening
            gsap.set(menuOpen, { display: 'none', transform: 'translateY(-100%)' })
            gsap.set(menuImgs, { clipPath: 'inset(0 0 100% 0)' })
            gsap.set(menuTitles, { y: '100%' })
            gsap.set(menuLabels, { y: '100%' })
            gsap.set(menuLinks, { y: '100%' })
            gsap.set(menuSocialLinks, { y: '100%', opacity: 0 })
            
            tlOpen.play()
            isOpen = true
        } else {
            closeToMenuTimeline.play()
            tlClose.play()
            isOpen = false
        }
    })
}

export default menuClick