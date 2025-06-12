import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const initCampLinkAnimation = () => {
    const campLinks = document.querySelectorAll('.ca_link_w')
    const allCampImages = document.querySelectorAll('.ca_img')

    campLinks.forEach(link => {
        const campLine = link.querySelector('.ca_line')
        const currentImage = link.querySelector('.ca_img')

        link.addEventListener('mouseenter', () => {
            // Fade out other images
            allCampImages.forEach(img => {
                if (img !== currentImage) {
                    gsap.to(img, {
                        filter: 'grayscale(100%)',
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.inOut'
                    })
                }
            })

            // Scale up and remove grayscale from current image
            gsap.to(currentImage, {
                filter: 'grayscale(0%)',
                scale: 1.05,
                duration: 0.8,
                ease: 'power2.inOut'
            })

            // Animate line from left to right
            gsap.fromTo(campLine,
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
            // Reset all images
            allCampImages.forEach(img => {
                gsap.to(img, {
                    filter: 'grayscale(0%)',
                    scale: 1,
                    duration: 0.8,
                    ease: 'power2.inOut'
                })
            })

            // Animate line out from right to left
            gsap.to(campLine, {
                scaleX: 0,
                duration: 0.8,
                transformOrigin: 'right',
                ease: 'power3.inOut'
            })
        })
    })
}

export default initCampLinkAnimation;