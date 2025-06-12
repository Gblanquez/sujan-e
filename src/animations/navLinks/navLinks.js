import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const initNavLinkAnimation = () => {
    const navLinks = document.querySelectorAll('.n_collection_link')
    const allNavImages = document.querySelectorAll('.nc_im')

    navLinks.forEach(link => {
        const navLine = link.querySelector('.line_nv')
        const currentImage = link.querySelector('.nc_im')

        link.addEventListener('mouseenter', () => {
            // Fade out other images
            allNavImages.forEach(img => {
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
            gsap.fromTo(navLine,
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
            allNavImages.forEach(img => {
                gsap.to(img, {
                    filter: 'grayscale(0%)',
                    scale: 1,
                    duration: 0.8,
                    ease: 'power2.inOut'
                })
            })

            // Animate line out from right to left
            gsap.to(navLine, {
                scaleX: 0,
                duration: 0.8,
                transformOrigin: 'right',
                ease: 'power3.inOut'
            })
        })
    })
}

export default initNavLinkAnimation;
