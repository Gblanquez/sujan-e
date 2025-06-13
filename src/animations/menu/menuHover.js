import { gsap } from 'gsap'

const menuHover = () => {
    const menuTrigger = document.querySelector('.g_nav_menu_p')
    const menuLineWrap = document.querySelector('.m_l_wrap')
    const menuLines = document.querySelectorAll('.m_line:not(.second)')
    const menuLines2 = document.querySelectorAll('.m_line.second')
    const menuText = document.querySelector('.m_text')
    const closeText = document.querySelector('.m_text_close')
    const menuParent = document.querySelector('.m_l_w')
    const closeParent = document.querySelector('.m_l_close')

    // Force reset all states
    gsap.set(menuLines2, { clearProps: 'all' })
    gsap.set(menuLines, { clearProps: 'all' })
    
    // Set initial states for menu lines
    gsap.set(menuLines2, { scaleX: 0, transformOrigin: 'left', x: '-100%' })
    gsap.set(menuLines, { scaleX: 1, transformOrigin: 'right' })
    gsap.set(menuLineWrap, { display: 'flex', scaleX: 1, transformOrigin: 'left' })
    
    // Set initial states for close elements
    gsap.set(closeParent, { display: 'none' })
    gsap.set(closeText, { y: '110%', opacity: 0 })
    
    // Set initial states for menu elements
    gsap.set(menuText, { opacity: 1 })
    gsap.set(menuParent, { display: 'flex' })

    const menuTimeline = gsap.timeline({ paused: true })

    // Menu hover animation
    menuTimeline
        .to(menuLines, {
            scaleX: 0,
            x: '100%',
            duration: 0.4,
            ease: 'power2.inOut',
            transformOrigin: 'right',
            stagger: {
                each: 0.05
            }
        })
        .to(menuLines2, {
            scaleX: 1,
            x: '0%',
            duration: 0.4,
            ease: 'power2.inOut',
            transformOrigin: 'left',
            stagger: {
                each: 0.05
            }
        }, 0.05)

    const handleEnter = () => {
        if (!isOpen) {
            menuTimeline.play()
        }
    }

    const handleLeave = () => {
        if (!isOpen) {
            menuTimeline.reverse()
        }
    }

    let isOpen = false

    menuTrigger.addEventListener('mouseenter', handleEnter)
    menuTrigger.addEventListener('mouseleave', handleLeave)

    return () => {
        menuTrigger.removeEventListener('mouseenter', handleEnter)
        menuTrigger.removeEventListener('mouseleave', handleLeave)
    }
}

export default menuHover
