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
    const menuParent = document.querySelector('.m_l_w')
    const closeParent = document.querySelector('.m_l_close')

    // Set initial states
    gsap.set(menuOpen, { display: 'none' })
    gsap.set(menuImgs, { clipPath: 'inset(0 0 100% 0)' })
    gsap.set(menuTitles, { y: '100%' })
    gsap.set(menuLabels, { y: '100%' })
    gsap.set(menuLinks, { y: '100%' })
    gsap.set(menuSocialLinks, { y: '100%', opacity: 0 })
    gsap.set(menuText, { display: 'flex' })
    gsap.set(closeText, { display: 'none' })
    gsap.set(closeParent, { display: 'none' })

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
        .add(() => {
            gsap.set(menuParent, { display: 'none' })
            gsap.set(closeParent, { display: 'flex' })
            gsap.set(menuText, { display: 'none' })
            gsap.set(closeText, { display: 'block' })
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
        .add(() => {
            gsap.set(closeParent, { display: 'none' })
            gsap.set(menuParent, { display: 'flex' })
            gsap.set(closeText, { display: 'none' })
            gsap.set(menuText, { display: 'block' })
        }, '-=0.2')
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