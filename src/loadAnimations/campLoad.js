import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import loadImages from '../load/load'
import { stop, start } from '../smoothScroll/smoothScroll'

gsap.registerPlugin(SplitText, ScrollTrigger)

const campLoad = async () => {
  const loadText = document.querySelector('.load_txt')
  const loadNumb = document.querySelector('.load_n')
  const loadBWrap = document.querySelector('.load_d')
  const loadB = document.querySelector('.load_bg')
  const view = document.querySelector('[data-barba="container"]')
  const heroSection = document.querySelector('.hero_s')
  const text = document.querySelector('.camp_text')
  const navWrapper = document.querySelector('.g_nav_w')

  // SVG: use first valid .c_svg_wrap[id] and its <svg>
  const svgContainer = document.querySelector('.c_svg_wrap[id]')
  const svg = svgContainer?.querySelector('svg')

  stop()

  // === INITIAL STATES ===
  gsap.set(view, { opacity: 0 })
  gsap.set(loadBWrap, { width: '12rem', height: '14rem' })
  gsap.set(loadB, { width: '100%', height: '0%' })
  gsap.set(loadNumb, { y: '100%' })
  gsap.set(navWrapper, { opacity: 0, y: '-100%' })

  const splitLoadText = new SplitText(loadText, {
    type: 'chars',
    charsClass: 'load-char'
  })

  gsap.set(loadText, { perspective: 1000, transformStyle: 'preserve-3d' })
  gsap.set(splitLoadText.chars, {
    x: '-10%',
    y: '100%',
    rotateX: -72,
    rotateY: -45,
    rotateZ: -4,
    transformOrigin: 'top',
    transformStyle: 'preserve-3d'
  })

  const splitText = new SplitText(text, {
    type: 'lines',
    linesClass: 'split-line'
  })

  splitText.lines.forEach(line => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    line.parentNode.insertBefore(wrapper, line)
    wrapper.appendChild(line)
  })

  gsap.set(splitText.lines, { yPercent: 100 })

  // === SVG SETUP ===
  let paths = []
  if (svg) {
    paths = svg.querySelectorAll('path, line, polyline, polygon, circle, rect')
    paths.forEach(path => {
      const length = path.getTotalLength?.()
      if (!length || length === 0) return

      path.style.strokeDasharray = length
      path.style.strokeDashoffset = length
      path.style.stroke = path.style.stroke || 'white'
      path.style.fill = 'white'
      path.style.fillOpacity = 0

      gsap.set(path, {
        y: '80%',
        skewY: 10,
        scaleY: 0.7,
        opacity: 0,
        transformOrigin: 'top center',
        transformBox: 'fill-box'
      })
    })
  }

  // === HERO SECTION CLIP-PATH START ===
  gsap.set(heroSection, {
    clipPath: 'polygon(45% 45%, 55% 45%, 55% 55%, 45% 55%)',
    opacity: 1
  })

  loadNumb.textContent = '00'

  const loadTl = gsap.timeline()

  loadTl
    .to(splitLoadText.chars, {
      x: '0%',
      y: '0%',
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      duration: 2.4,
      ease: 'power4.out',
      stagger: { each: 0.03 }
    })
    .fromTo(loadNumb, { y: '100%' }, {
      y: '0%',
      duration: 1.2,
      ease: 'power2.out'
    }, '<+=0.3')
    .fromTo(loadBWrap, { scale: 0.7 }, {
      scale: 1,
      duration: 1,
      ease: 'power2.out'
    }, '<')

  await loadTl.then()
  await loadImages()

  const exitTl = gsap.timeline()
  gsap.set(loadBWrap, { transformOrigin: 'top' })

  exitTl
    .to(splitLoadText.chars, {
      x: '-10%',
      y: '-100%',
      rotateX: 72,
      rotateY: 45,
      rotateZ: 4,
      duration: 2.4,
      ease: 'power4.inOut',
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
    .to(paths, {
      y: '0%',
      skewY: 0,
      scaleY: 1,
      opacity: 1,
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.out',
      stagger: 0.15
    }, '<+=0.4')
    .to(paths, {
      fillOpacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.15
    }, '<+=0.3')
    .to(splitText.lines, {
      yPercent: 0,
      duration: 1.8,
      ease: 'power4.out',
      stagger: 0.1
    }, '<+=0.4')
    .to([navWrapper, '.intro_s'], {
      opacity: 1,
      y: '0%',
      duration: 2.2,
      ease: 'power4.out'
    }, '<+=0.2')

  gsap.set(view, { opacity: 1 })

  await Promise.all([exitTl.then(), revealTl.then()])
  ScrollTrigger.refresh()

  start()

  return Promise.resolve()
}

export default campLoad