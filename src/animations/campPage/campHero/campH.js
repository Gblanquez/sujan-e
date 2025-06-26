import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const campH = (container = document) => {
  const heroBg = container.querySelector('.h_t_v_wrap')
  const text = container.querySelector('.camp_text')
  const introSection = container.querySelector('.intro_s.c_template')

  // Use the first .c_svg_wrap that has an ID and contains an <svg>
  const svgContainer = container.querySelector('.c_svg_wrap[id]')
  const svg = svgContainer?.querySelector('svg')

  if (!heroBg || !text || !introSection || !svg) return

  // === TEXT ANIMATION ===
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

  gsap.fromTo(splitText.lines, {
    yPercent: 100
  }, {
    yPercent: 0,
    duration: 1.8,
    ease: 'power4.out',
    stagger: 0.1
  })

  // === SVG ANIMATION ===
  const paths = svg.querySelectorAll('path, line, polyline, polygon, circle, rect')

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

  gsap.to(paths, {
    y: '0%',
    skewY: 0,
    scaleY: 1,
    opacity: 1,
    strokeDashoffset: 0,
    duration: 1.5,
    ease: 'power2.out',
    stagger: 0.15
  })

  gsap.to(paths, {
    fillOpacity: 1,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.15,
    delay: 1.5
  })

  // === SCROLLTRIGGERS ===
  ScrollTrigger.create({
    trigger: introSection,
    start: 'top 92%',
    end: 'bottom 30%',
    toggleActions: 'play none none none',
    scrub: 2,
    animation: gsap.to(introSection, {
      y: '0%',
      scale: 1,
      ease: 'power2.out'
    })
  })

  ScrollTrigger.create({
    trigger: heroBg,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    animation: gsap.to(heroBg, {
      scale: 1.2,
      ease: 'none'
    })
  })
}

export default campH