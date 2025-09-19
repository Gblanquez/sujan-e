import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const emblem = () => {
  const containers = document.querySelectorAll('#emblem-container, #emblem-container2, #emblem-container3')

  containers.forEach(container => {
    const svg = container.querySelector('svg')
    if (!svg) return

    const paths = svg.querySelectorAll('path, polygon, rect, circle, line, polyline')
    // No GSAP animations on paths, they stay static
  })

  const leftEls = document.querySelectorAll('.emb_l_left')
  const rightEls = document.querySelectorAll('.emb_l_right')

  leftEls.forEach(el => {
    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' })

    gsap.to(el, {
      scaleX: 1,
      duration: 2.4,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        once: false
      }
    })
  })

  rightEls.forEach(el => {
    gsap.set(el, { scaleX: 0, transformOrigin: 'right center' })

    gsap.to(el, {
      scaleX: 1,
      duration: 2.4,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        once: false
      }
    })
  })
}

export default emblem