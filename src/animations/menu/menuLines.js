import { gsap } from 'gsap'

const menuLines = () => {
    const menuLineWrap = document.querySelector('.m_l_wrap')
    const menuLines = document.querySelectorAll('.m_line:not(.second)')
    const menuLines2 = document.querySelectorAll('.m_line.second')
    const closeLineWraps = document.querySelectorAll('.m_line_close_w')
    const menuParent = document.querySelector('.m_l_w')
    const closeParent = document.querySelector('.m_l_close')

    gsap.set(menuLines2, { clearProps: 'all' })
    gsap.set(menuLines, { clearProps: 'all' })
    
    gsap.set(menuLines2, { scaleX: 0, transformOrigin: 'left', x: '-100%' })
    gsap.set(menuLines, { scaleX: 1, transformOrigin: 'right' })
    gsap.set(menuLineWrap, { display: 'flex', scaleX: 1, transformOrigin: 'left' })
    
    closeLineWraps.forEach(wrap => {
        gsap.set(wrap, { display: 'none', scaleX: 0, transformOrigin: 'center' })
    })
    gsap.set(closeParent, { display: 'none' })
    gsap.set(menuParent, { display: 'flex' })

    const menuTimeline = gsap.timeline({ paused: true })

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

    return {
        play: () => menuTimeline.play(),
        reverse: () => menuTimeline.reverse(),
        pause: () => menuTimeline.pause(0),
        setMenuState: (isOpen) => {
            if (isOpen) {
                closeLineWraps.forEach(wrap => {
                    gsap.set(wrap, { display: 'flex' })
                })
                gsap.set(closeParent, { display: 'flex' })

                gsap.to(menuLineWrap, {
                    scaleX: 0,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    transformOrigin: 'left',
                    onComplete: () => {
                        gsap.set(menuLineWrap, { display: 'none' })
                        gsap.set(menuParent, { display: 'none' })
                    }
                })

                gsap.to(closeLineWraps, {
                    scaleX: 1,
                    duration: 0.4,
                    ease: 'power2.inOut',
                    delay: 0.7,
                    stagger: {
                        each: 0.05
                    }
                })
            } else {
                gsap.set(menuLineWrap, { display: 'flex', scaleX: 0, transformOrigin: 'left' })
                gsap.set(menuParent, { display: 'flex' })

                const closeTimeline = gsap.timeline()
                
                closeTimeline
                    .to(closeLineWraps, {
                        scaleX: 0,
                        duration: 0.4,
                        ease: 'power2.inOut',
                        stagger: {
                            each: 0.05,
                            from: 'end'
                        }
                    })
                    .set(closeLineWraps, { display: 'none' }, '+=0.1')
                    .set(closeParent, { display: 'none' })

                gsap.to(menuLineWrap, {
                    scaleX: 1,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    transformOrigin: 'left'
                })
            }
        }
    }
}

export default menuLines 