import { gsap } from 'gsap'
import menuLines from './menuLines'

const menuClick = () => {
    const menuTrigger = document.querySelector('.g_nav_menu_p')
    const menuOpen = document.querySelector('.g_nav_open')
    const menuImgs = document.querySelectorAll('.nc_m_wrap')
    const menuTitles = document.querySelectorAll('.nc_title')
    const menuLabels = document.querySelectorAll('.nc_label')
    const menuLinks = document.querySelectorAll('.nc_link')
    const menuSocialLinks = document.querySelectorAll('.nav_social_l')
    const menuText = document.querySelector('.m_text')
    const closeText = document.querySelector('.m_text_close')
    const menuLineWraps = document.querySelectorAll('.m_l_wrap')
    const closeLineWraps = document.querySelectorAll('.m_line_close_w')
    const menuParent = document.querySelector('.m_l_w')
    const closeParent = document.querySelector('.m_l_close')

    // Set initial states
    gsap.set(menuOpen, { display: 'none' })
    gsap.set(menuImgs, { clipPath: 'inset(0 0 100% 0)' })
    gsap.set(menuTitles, { y: '100%' })
    gsap.set(menuLabels, { y: '100%' })
    gsap.set(menuLinks, { y: '100%' })
    gsap.set(menuSocialLinks, { y: '100%', opacity: 0 })
    gsap.set(closeText, { y: '110%', opacity: 0 })
    menuLineWraps.forEach(wrap => {
        gsap.set(wrap, { scaleX: 1, transformOrigin: 'left' })
    })
    closeLineWraps.forEach(wrap => {
        gsap.set(wrap, { scaleX: 0, transformOrigin: 'center' })
    })

    let isOpen = false
    const tlOpen = gsap.timeline({ paused: true })
    const tlClose = gsap.timeline({ paused: true })
    const lines = menuLines()

    // Main menu content animations
    tlOpen
        .to(menuOpen, {
            display: 'block',
            duration: 0.1
        })
        .to(menuLineWraps, {
            scaleX: 0,
            duration: 0.8,
            ease: 'power4.inOut',
            transformOrigin: 'left',
            stagger: {
                each: 0.05,
                from: 'start'
            }
        })
        .to(menuText, {
            y: '-110%',
            opacity: 0,
            duration: 0.8,
            ease: 'power4.inOut',
        }, '<')
        .add(() => {
            gsap.set(menuLineWraps, { display: 'none' })
            gsap.set(menuParent, { display: 'none' })
            gsap.set(closeParent, { display: 'flex' })
        }, '<0.8')
        .to(menuOpen, {
            transform: 'translateY(0%)',
            duration: 1.8,
            ease: 'power4.inOut'
        })
        .to(closeLineWraps, {
            scaleX: 1,
            duration: 0.6,
            ease: 'power4.inOut',
            stagger: {
                each: 0.05,
                from: 'start'
            }
        }, '-=1.4')
        .to(closeText, {
            y: '0%',
            opacity: 1,
            duration: 0.6,
            ease: 'power4.inOut',
        }, '<')
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
            '-=1.6'
        )
        .fromTo([menuTitles, menuLabels],
            { y: '100%' },
            {
                y: '0%',
                duration: 1.2,
                ease: 'power4.inOut',
                stagger: {
                    each: 0.02
                }
            },
            '-=1.4'
        )
        .fromTo([menuLinks, menuSocialLinks],
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
            '-=1'
        )

    tlClose
        .to([menuSocialLinks, menuLinks], {
            y: '100%',
            opacity: 0,
            duration: 0.8,
            ease: 'power4.inOut',
            stagger: {
                each: 0.02,
                from: 'end'
            }
        })
        .to([menuTitles, menuLabels], {
            y: '100%',
            duration: 0.8,
            ease: 'power4.inOut',
            stagger: {
                each: 0.02,
                from: 'end'
            }
        }, '0.1')
        .to(menuImgs, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.2,
            ease: 'power2.inOut',
            stagger: {
                each: 0.01,
                from: 'end'
            }
        }, '0.2')
        .to(menuOpen, {
            transform: 'translateY(-100%)',
            duration: 1.4,
            ease: 'power4.inOut'
        }, '0.4')
        .to(closeLineWraps, {
            scaleX: 0,
            duration: 0.6,
            ease: 'power4.inOut',
            stagger: {
                each: 0.05,
                from: 'end'
            }
        }, '<')
        .to(closeText, {
            y: '110%',
            opacity: 0,
            duration: 0.6,
            ease: 'power4.inOut',
        }, '<')
        .add(() => {
            gsap.set([closeParent, menuParent], { display: 'flex' })
            gsap.set(menuLineWraps, { 
                display: 'flex',
                scaleX: 0,
                transformOrigin: 'left'
            })
        }, '-=0.4')
        .to(menuLineWraps, {
            scaleX: 1,
            duration: 0.8,
            ease: 'power4.inOut',
            transformOrigin: 'left',
            stagger: {
                each: 0.05,
                from: 'start'
            }
        }, '-=0.2')
        .to(menuText, {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            ease: 'power4.inOut',
        }, '<')
        .set(menuOpen, {
            display: 'none'
        })

    menuTrigger.addEventListener('click', () => {
        if (!isOpen) {
            tlClose.pause(0)
            tlOpen.pause(0)
            
            // Reset all states before opening
            gsap.set(menuOpen, { display: 'none', transform: 'translateY(-100%)' })
            gsap.set(menuImgs, { clipPath: 'inset(0 0 100% 0)' })
            gsap.set(menuTitles, { y: '100%' })
            gsap.set(menuLabels, { y: '100%' })
            gsap.set(menuLinks, { y: '100%' })
            gsap.set(menuSocialLinks, { y: '100%', opacity: 0 })
            
            lines.setMenuState(true)
            lines.pause()
            
            tlOpen.play()
            isOpen = true
        } else {
            lines.setMenuState(false)
            lines.pause()
            
            tlClose.play()
            isOpen = false
        }
    })

    menuTrigger.addEventListener('mouseenter', () => {
        if (!isOpen) {
            lines.play()
        }
    })

    menuTrigger.addEventListener('mouseleave', () => {
        if (!isOpen) {
            lines.reverse()
        }
    })
}

export default menuClick