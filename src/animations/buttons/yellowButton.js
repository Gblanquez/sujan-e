import { gsap } from 'gsap'

const yellowButton = () => {
    const buttons = document.querySelectorAll('.y_b_w')

    buttons.forEach(button => {
        const fText = button.querySelector('.y_b_text')
        const sText = button.querySelector('.y_b_text.ab')

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

export default yellowButton