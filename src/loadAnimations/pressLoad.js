import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import loadImages from '../load/load'
import { stop, start } from '../smoothScroll/smoothScroll'

gsap.registerPlugin(SplitText, ScrollTrigger)

const pressLoad = async () => {
  const loadText = document.querySelector('.load_txt')
  const loadNumb = document.querySelector('.load_n')
  const loadBWrap = document.querySelector('.load_d')
  const loadB = document.querySelector('.load_bg')
  const view = document.querySelector('[data-barba="container"]')
  const heroSection = document.querySelector('.hero_s')
  const storyTitle = document.querySelector('.press_h_title')
  const storyLabel = document.querySelector('.press_label_h')
  const navWrapper = document.querySelector('.g_nav_w')
  const mgLogo = document.querySelector('.mg_logo')
  const pressWrapper = document.querySelector('.press_w')

  stop()

  gsap.set(view, { opacity: 0 })
  gsap.set(loadBWrap, { width: '12rem', height: '14rem' })
  gsap.set(loadB, { width: '100%', height: '0%' })
  gsap.set(loadNumb, { y: '100%' })
  gsap.set(navWrapper, { opacity: 0, y: '-100%' })
  gsap.set(storyLabel, { y: '100%', opacity: 0, display: 'block', overflow: 'hidden' })
  gsap.set(mgLogo, { y: '100%', opacity: 0 })
  gsap.set(pressWrapper, { opacity: 0 })

  // Clip-path initial state
  gsap.set(heroSection, {
    clipPath: 'polygon(45% 45%, 55% 45%, 55% 55%, 45% 55%)',
    opacity: 1
  })

  // Split load text
  const splitLoadText = new SplitText(loadText, { type: 'chars', charsClass: 'load-char' })
  gsap.set(loadText, { perspective: 1000, transformStyle: 'preserve-3d' })
  gsap.set(splitLoadText.chars, {
    x: '-10%', y: '100%',
    rotateX: -72, rotateY: -45, rotateZ: -4,
    transformOrigin: 'top', transformStyle: 'preserve-3d'
  })

  // Split title text
  const splitTitle = new SplitText(storyTitle, { type: 'lines,words,chars', linesClass: 'split-line' })
  splitTitle.lines.forEach(line => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'block'
    wrapper.style.perspective = '1000px'
    line.parentNode.insertBefore(wrapper, line)
    wrapper.appendChild(line)
  })

  gsap.set(storyTitle, { perspective: 1000, transformStyle: 'preserve-3d' })
  gsap.set(splitTitle.chars, {
    x: '-10%', y: '100%',
    rotateX: -72, rotateY: -45, rotateZ: -4,
    transformOrigin: 'top', transformStyle: 'preserve-3d'
  })

  // Set initial loading number
  loadNumb.textContent = '00'

  const loadTl = gsap.timeline()
  loadTl
    .to(splitLoadText.chars, {
      x: '0%', y: '0%',
      rotateX: 0, rotateY: 0, rotateZ: 0,
      duration: 2.4, ease: 'power4.out',
      stagger: { each: 0.03 }
    })
    .fromTo(loadNumb, { y: '100%' }, {
      y: '0%', duration: 1.2, ease: 'power2.out'
    }, '<+=0.3')
    .fromTo(loadBWrap, { scale: 0.7 }, {
      scale: 1, duration: 1, ease: 'power2.out'
    }, '<')

  await loadTl.then()
  await loadImages()

  const exitTl = gsap.timeline()
  gsap.set(loadBWrap, { transformOrigin: 'top' })

  exitTl
    .to(splitLoadText.chars, {
      x: '-10%', y: '-100%',
      rotateX: 72, rotateY: 45, rotateZ: 4,
      duration: 2.4, ease: 'power4.inOut',
      stagger: { each: 0.03 }
    })
    .to(loadNumb, {
      y: '100%',
      duration: 1,
      ease: 'power2.inOut'
    }, '<+=0.3')
    .to(loadBWrap, {
      scaleY: 0,
      duration: 1,
      ease: 'power2.inOut'
    }, '<+=0.2')

  const revealTl = gsap.timeline()
  revealTl
    .to(heroSection, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 2.2,
      ease: 'power4.inOut'
    }, '<+=0.5')
    .to(splitTitle.chars, {
      x: '0%', y: '0%',
      rotateX: 0, rotateY: 0, rotateZ: 0,
      duration: 2.4,
      ease: 'power4.out',
      stagger: { each: 0.03 }
    }, '<+=0.9')
    .fromTo(storyLabel, {
      y: '100%', opacity: 0
    }, {
      y: '0%', opacity: 1,
      duration: 1.2,
      ease: 'power4.out'
    }, '<+=0.2')
    .to(mgLogo, {
      y: '0%', opacity: 1,
      duration: 1.2,
      ease: 'power4.out'
    }, '<')
    .to([navWrapper, '.intro_s'], {
      opacity: 1, y: '0%',
      duration: 2.2,
      ease: 'power4.out'
    }, '<+=0.2')
    .fromTo(pressWrapper, {
      opacity: 0
    }, {
      opacity: 1,
      duration: 1.8,
      ease: 'power4.out'
    }, '<+=0.2')

  gsap.set(view, { opacity: 1 })
  await Promise.all([exitTl.then(), revealTl.then()])
  ScrollTrigger.refresh()

  start()

  return Promise.resolve()
}

export default pressLoad