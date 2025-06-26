import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tentEffect = () => {
  if (window.innerHeight <= 767) return 

  const items = document.querySelectorAll('.tents_c_item')

  items.forEach((item, i) => {
    const currentWrapper = item.querySelector('.tent_wrapper')
    const currentImg = currentWrapper.querySelector('.tent_img')

    const nextItem = items[i + 1]
    if (!nextItem) return

    const nextWrapper = nextItem.querySelector('.tent_wrapper')
    const nextImg = nextWrapper.querySelector('.tent_img')


    gsap.set(nextWrapper, {
      scale: 0.7,
      rotateZ: -8,
      rotateY: 10,
      rotateX: -10,
      skewX: 2,
    })
    gsap.set(nextImg, { filter: 'grayscale(100%)' })


    gsap.timeline({
      scrollTrigger: {
        trigger: nextItem,
        start: 'top 92%',
        end: 'top top',
        scrub: true
      }
    })
      .to(currentWrapper, {
        scale: 0.7,
        rotateZ: 8,
        rotateY: -10,
        rotateX: 10,
        skewX: -2,
        ease: 'linear',
        transformOrigin: 'center center'
      }, 0)
      .to(currentImg, {
        filter: 'grayscale(100%)',
        ease: 'linear'
      }, 0)
      .to(nextWrapper, {
        scale: 1,
        rotateZ: 0,
        rotateY: 0,
        rotateX: 0,
        skewX: 0,
        z: 0,
        ease: 'linear'
      }, 0)
      .to(nextImg, {
        filter: 'grayscale(0%)',
        ease: 'linear'
      }, 0)
  })
}

export default tentEffect