import { gsap } from 'gsap'

const subNavButtons = () => {
    const subLink = document.querySelectorAll('.sub_link')
    const allSubImages = document.querySelectorAll('.sub_img')

    subLink.forEach(link => {
        const subLine = link.querySelector('.sub_line')
        const currentImage = link.querySelector('.sub_img')

        link.addEventListener('mouseenter', () => {

            allSubImages.forEach(img => {
                if (img !== currentImage) {
                    gsap.to(img, {
                        filter: 'grayscale(100%)',
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.inOut'
                    })
                }
            })
            

            gsap.to(currentImage, {
                filter: 'grayscale(0%)',
                scale: 1.05,
                duration: 0.8,
                ease: 'power2.inOut'
            })


            gsap.fromTo(subLine, 
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

            allSubImages.forEach(img => {
                gsap.to(img, {
                    filter: 'grayscale(0%)',
                    scale: 1,
                    duration: 0.8,
                    ease: 'power2.inOut'
                })
            })


            gsap.to(subLine, {
                scaleX: 0,
                duration: 0.8,
                transformOrigin: 'right',
                ease: 'power3.inOut'
            })
        })
    })
}

export default subNavButtons