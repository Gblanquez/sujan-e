import { gsap } from 'gsap'

const navSmallLinks = () => {
    const links = document.querySelectorAll('.p_link_nav')

    links.forEach(link => {
        const line = link.querySelector('.nc_line')

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

export default navSmallLinks
