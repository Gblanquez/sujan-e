import { gsap } from 'gsap'

const NavlightButton = () => {
    const buttons = document.querySelectorAll('.n_light_b')

    buttons.forEach(button => {
        const fText = button.querySelector('.n_b_text')
        const sText = button.querySelector('.n_b_text.ab')

        // Create hover in timeline
        const hoverIn = gsap.timeline({ paused: true })
        hoverIn
            .to(fText, {
                y: '-100%',
                duration: 1.2,
                ease: 'expo.out'
            })
            .to(sText, {
                y: '0%',
                duration: 1.2,
                ease: 'expo.out'
            }, '<') 

        const hoverOut = gsap.timeline({ paused: true })
        hoverOut
            .to(fText, {
                y: '0%',
                duration: 0.8,
                ease: 'expo.out'
            })
            .to(sText, {
                y: '100%',
                duration: 0.8,
                ease: 'expo.out'
            }, '<') 

        // Add event listeners
        button.addEventListener('mouseenter', () => {
            hoverOut.pause()
            hoverIn.restart()
        })

        button.addEventListener('mouseleave', () => {
            hoverIn.pause()
            hoverOut.restart()
        })
    })
}

export default NavlightButton