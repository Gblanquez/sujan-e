import { gsap } from 'gsap'

const footerLinks = () => {
    const links = document.querySelectorAll('.link_f')

    links.forEach(link => {
        const line = link.querySelector('.f_line')

        link.addEventListener('mouseenter', () => {
            gsap.fromTo(line, 
                {
                    x: '-100%',
                    scaleX: 1
                },
                {
                    x: '0%',
                    scaleX: 1,
                    transformOrigin: 'left',
                    duration: 0.8,
                    ease: 'power3.inOut'
                }
            )
        })

        link.addEventListener('mouseleave', () => {
            gsap.to(line, {
                scaleX: 0,
                duration: 0.8,
                transformOrigin: 'right',
                ease: 'power3.inOut'
            })
        })
    })
}

export default footerLinks
