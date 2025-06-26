import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const emblem = () => {
  const containers = document.querySelectorAll('#emblem-container, #emblem-container2, #emblem-container3')

  containers.forEach(container => {
    const svg = container.querySelector('svg')
    if (!svg) return

    const paths = svg.querySelectorAll('path, polygon, rect, circle, line, polyline')

    // Set initial animation states for paths
    gsap.set(paths, {
      opacity: 0,
      x: '-2',
      y: '2',
      scale: 0.98,
      transformOrigin: 'center center'
    })


    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        once: false
      }
    }).to(paths, {
      opacity: 0.5,
      x: '0',
      y: '0',
      scale: 1,
      duration: 1.4,
      ease: 'power3.out',
      stagger: { each: 0.05 }
    })
  })


  const leftEls = document.querySelectorAll('.emb_l_left')
  const rightEls = document.querySelectorAll('.emb_l_right')

  // Setup for left-aligned scaleX animation
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

  // Setup for right-aligned scaleX animation
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