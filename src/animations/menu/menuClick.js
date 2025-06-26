import { gsap } from 'gsap'
import { stop, start } from '../../smoothScroll/smoothScroll'

const menuClick = () => {
  const menuTrigger = document.querySelector('.g_nav_menu_p')
  const menuOpen = document.querySelector('.g_nav_open')
  const menuImgs = document.querySelectorAll('.nc_m_wrap')
  const menuTitles = document.querySelectorAll('.nc_title')
  const menuLabels = document.querySelectorAll('.nc_label')
  const menuLinks = document.querySelectorAll('.nc_link')
  const menuSocialLinks = document.querySelectorAll('.nav_social_l')

  const menuText = document.querySelector('.m_text')
  const closeText = document.querySelector('.m_text_close')
  const menuParent = document.querySelector('.m_l_w')
  const closeParent = document.querySelector('.m_l_close')

  const triggerWrap = document.querySelectorAll('.m_l_wrap')
  const closeLines = document.querySelectorAll('.m_line_close_w')

  const menuLines = document.querySelectorAll('.m_line:not(.second)')
  const menuLines2 = document.querySelectorAll('.m_line.second')
  const closeLinesBase = document.querySelectorAll('.line_close:not(.second)')
  const closeLinesSecond = document.querySelectorAll('.line_close.second')

  gsap.set(menuOpen, { display: 'none' })
  gsap.set(menuImgs, { clipPath: 'inset(0 0 100% 0)' })
  gsap.set(menuTitles, { y: '100%' })
  gsap.set(menuLabels, { y: '100%' })
  gsap.set(menuLinks, { y: '100%' })
  gsap.set(menuSocialLinks, { y: '100%', opacity: 0 })

  gsap.set(menuText, { y: 0, opacity: 1, visibility: 'visible' })
  gsap.set(closeText, { y: '110%', opacity: 0, visibility: 'hidden' })
  gsap.set(menuParent, { opacity: 1, visibility: 'visible' })
  gsap.set(closeParent, { opacity: 0, visibility: 'hidden' })
  gsap.set(closeLines, { scaleX: 0, transformOrigin: 'center' })
  gsap.set(triggerWrap, { scaleX: 1, transformOrigin: 'left' })

  let isOpen = false
  let isTransitioning = false

  const hoverTimelineClosed = gsap.timeline({ paused: true })
  hoverTimelineClosed
    .to(menuLines, {
      scaleX: 0,
      x: '100%',
      duration: 0.4,
      ease: 'power2.inOut',
      transformOrigin: 'right',
      stagger: 0.05
    })
    .to(menuLines2, {
      scaleX: 1,
      x: '0%',
      duration: 0.4,
      ease: 'power2.inOut',
      transformOrigin: 'left',
      stagger: 0.05
    }, 0.05)

  const hoverTimelineOpen = gsap.timeline({ paused: true })
  hoverTimelineOpen
    .to(closeLinesBase, {
      scaleX: 0,
      x: '100%',
      duration: 0.4,
      ease: 'power2.inOut',
      transformOrigin: 'right',
      stagger: 0.05
    })
    .to(closeLinesSecond, {
      scaleX: 1,
      x: '0%',
      duration: 0.4,
      ease: 'power2.inOut',
      transformOrigin: 'left',
      stagger: 0.05
    }, 0.05)

  const handleHoverEnter = () => {
    if (isOpen) {
      hoverTimelineOpen.play()
    } else {
      hoverTimelineClosed.play()
    }
  }

  const handleHoverLeave = () => {
    if (isOpen) {
      hoverTimelineOpen.reverse()
    } else {
      hoverTimelineClosed.reverse()
    }
  }

  menuTrigger.addEventListener('mouseenter', handleHoverEnter)
  menuTrigger.addEventListener('mouseleave', handleHoverLeave)

  const tlOpen = gsap.timeline({ paused: true })

  tlOpen
    .to(triggerWrap, {
      scaleX: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.inOut'
    }, 0)
    .to(menuText, {
      y: '-110%',
      opacity: 0,
      visibility: 'hidden',
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0)
    .to(menuParent, {
      opacity: 0,
      visibility: 'hidden',
      duration: 0.3,
      ease: 'power2.out'
    }, 0.25)
    .set(menuOpen, { display: 'block' }, 0.3)
    .to(menuOpen, {
      transform: 'translateY(0%)',
      duration: 1.6,
      ease: 'power4.inOut'
    }, 0.3)
    .to(closeParent, {
      opacity: 1,
      visibility: 'visible',
      duration: 0.01
    }, 0.5)
    .to(closeLines, {
      scaleX: 1,
      duration: 0.5,
      ease: 'power2.inOut',
      stagger: 0.05
    }, 0.5)
    .to(closeText, {
      y: '0%',
      opacity: 1,
      visibility: 'visible',
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0.55)
    .fromTo(menuImgs,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 2.0,
        ease: 'power2.inOut',
        stagger: 0.01
      },
      0.4
    )
    .fromTo([menuTitles, menuLabels],
      { y: '100%' },
      {
        y: '0%',
        duration: 1.2,
        ease: 'power4.inOut',
        stagger: 0.02
      },
      0.6
    )
    .fromTo([menuLinks, menuSocialLinks],
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 1.2,
        ease: 'power4.inOut',
        stagger: 0.02
      },
      0.8
    )

  const tlClose = gsap.timeline({ paused: true })

  tlClose
    .to([menuSocialLinks, menuLinks], {
      y: '100%',
      opacity: 0,
      duration: 0.8,
      ease: 'power4.inOut',
      stagger: { each: 0.02, from: 'end' }
    })
    .to([menuTitles, menuLabels], {
      y: '100%',
      duration: 0.8,
      ease: 'power4.inOut',
      stagger: { each: 0.02, from: 'end' }
    }, '0.1')
    .to(menuImgs, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1.2,
      ease: 'power2.inOut',
      stagger: { each: 0.01, from: 'end' }
    }, '0.2')
    .to(menuOpen, {
      transform: 'translateY(-100%)',
      duration: 1.4,
      ease: 'power4.inOut'
    }, '0.3')
    .to(closeLines, {
      scaleX: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      stagger: { each: 0.05, from: 'end' }
    }, '0.8')
    .to(closeText, {
      y: '110%',
      opacity: 0,
      visibility: 'hidden',
      duration: 0.4,
      ease: 'power2.inOut'
    }, '0.8')
    .to(triggerWrap, {
      scaleX: 1,
      duration: 0.6,
      stagger: { each: 0.05, from: 'start' },
      ease: 'power2.inOut'
    }, '1.0')
    .to(menuText, {
      y: '0%',
      opacity: 1,
      visibility: 'visible',
      duration: 0.4,
      ease: 'power2.inOut'
    }, '1.0')
    .to(menuParent, {
      opacity: 1,
      visibility: 'visible',
      duration: 0.4,
      ease: 'power2.out'
    }, '1.1')
    .set(menuOpen, { display: 'none' })

  menuTrigger.addEventListener('click', () => {
    if (isTransitioning) return
    isTransitioning = true

    if (!isOpen) {
      tlClose.pause(0)
      tlOpen.pause(0)

      gsap.set(menuOpen, { display: 'none', transform: 'translateY(-100%)' })
      gsap.set(menuImgs, { clipPath: 'inset(0 0 100% 0)' })
      gsap.set(menuTitles, { y: '100%' })
      gsap.set(menuLabels, { y: '100%' })
      gsap.set(menuLinks, { y: '100%' })
      gsap.set(menuSocialLinks, { y: '100%', opacity: 0 })

      stop()
      tlOpen.play().then(() => {
        isOpen = true
        isTransitioning = false
      })
    } else {
      tlClose.play().then(() => {
        start()
        isOpen = false
        isTransitioning = false
      })
    }
  })
}

export default menuClick