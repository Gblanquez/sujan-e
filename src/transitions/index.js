import barba from '@barba/core'
import gsap from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { stop, start, scrollTo, initSmoothScroll } from '../smoothScroll/smoothScroll'

// Register ALL plugins
gsap.registerPlugin(CSSPlugin, CSSRulePlugin, SplitText, ScrollTrigger)

// Import load animations
import homeLoad from '../loadAnimations/homeLoad'
import storyLoad from '../loadAnimations/storyLoad'
import collectionLoad from '../loadAnimations/collectionLoad'
import conservationLoad from '../loadAnimations/conservationLoad'
import relaisLoad from '../loadAnimations/relaisLoad'
import pressLoad from '../loadAnimations/pressLoad'
import contactLoad from '../loadAnimations/contactLoad'

import menuHover from '../animations/menu/menuHover'
import menuClick from '../animations/menu/menuClick'
import clickMainButton from '../animations/buttons/clickMainButton'
import subNavButtons from '../animations/buttons/subNavButtons'
import footerLinks from '../animations/footerLinks/footerLinks'
import navSmallLinks from '../animations/navLinks/navSmallLinks'
import initNavLinkAnimation from '../animations/navLinks/navLinks'
import yellowButton from '../animations/buttons/yellowButton'
import darkButton from '../animations/buttons/darkButton'
import lightButton from '../animations/buttons/lightButton'
import mainButton from '../animations/buttons/mainButtonH'
import NavlightButton from '../animations/buttons/lightNavButton'

// // Import page initializations
import homePage from '../animations/homePage/homePage'
import storyPage from '../animations/storyPage/storyPage'
import conservationPage from '../animations/conservationPage/conservationPage'
import pressPage from '../animations/PressPage/pressPage'
import relaisPage from '../animations/relaisPage/relaisPage'
import collectionPage from '../animations/collectionPage/collectionPage'
import contactPage from '../animations/contactPage/contactPage'

// Menu Animations
menuHover()
menuClick()
clickMainButton()
subNavButtons()
navSmallLinks()
initNavLinkAnimation()
footerLinks()
yellowButton()
darkButton()
lightButton()
mainButton()
NavlightButton()



const overlay = document.createElement('div')
overlay.style.position = 'fixed'
overlay.style.top = 0
overlay.style.left = 0
overlay.style.width = '100%'
overlay.style.height = '100%'
overlay.style.backgroundColor = '#F6F3EF'
overlay.style.zIndex = 10
overlay.style.transform = 'translateY(100%)'
document.body.appendChild(overlay)

barba.init({
    debug: true,
    views: [
        {
            namespace: 'home',
            beforeEnter() {
                homePage()
            }
        },
        {
            namespace: 'story',
            beforeEnter() {

                storyPage()
            }
        },
        {
            namespace: 'collection',
            beforeEnter() {
                collectionPage()
            }
        },
        {
            namespace: 'conservation',
            beforeEnter() {
                conservationPage()
            }
        },
        {
            namespace: 'relais',
            beforeEnter() {
                relaisPage()
            }
        },
        {
            namespace: 'press',
            beforeEnter() {
                pressPage()
            },
        },
        {
            namespace: 'contact',
            beforeEnter() {
                contactPage()
            }
        },
        {
            namespace: 'product',
            beforeEnter() {

            }
        },
        {
            namespace: 'terms',
            beforeEnter() {

            }
        }
    ],

    transitions: [
        {
            name: 'default-transition',
            
            once: async ({ next }) => {
                if (next.namespace === 'home') {
                    await homeLoad()
                } else if (next.namespace === 'story') {
                    await storyLoad()
                } else if (next.namespace === 'collection') {
                    await collectionLoad()
                } else if (next.namespace === 'conservation') {
                    await conservationLoad()
                } else if (next.namespace === 'relais') {
                    await relaisLoad()
                } else if (next.namespace === 'press') {
                    await pressLoad()
                } else if (next.namespace === 'contact') {
                    await contactLoad()
                }
            },
            
            async leave({ current }) {
                const tl = gsap.timeline({
                    onStart: () => stop()
                })
                
                tl.set(overlay, { transform: 'translateY(100%)' })
                .to(overlay, {
                    transform: 'translateY(0%)',
                    duration: 2.0,
                    ease: 'power4.inOut'
                })
                .to(current.container, {
                    y: '-1.4%',
                    duration: 2.0,
                    ease: 'power4.inOut'
                }, '<')
                .set(current.container,
                    {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: -1
                    }
                )
                .set(current.container, {
                    opacity: 0
                })

                return tl
            },

            async enter({ next }) {
                window.scrollTo(0, 0)
                const tl = gsap.timeline()
                tl.set(overlay, { transform: 'translateY(0%)' })
                .set(next.container, { opacity: 1 })
                .to(overlay, {
                    transform: 'translateY(-100%)',
                    duration: 2.0,
                    ease: 'power4.inOut'
                })
                .set(next.container, {
                    clearProps: 'all',
                    onComplete: () => {
                        start()
                    }
                })

                return tl
            }
        }
    ]
}) 

barba.hooks.enter((data) => {
    console.log('ENTER hook - namespace:', data.next.namespace)
}) 