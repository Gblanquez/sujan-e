import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const pressContent = () => {
    const pressTitle = document.querySelector('.press_title')
    const pressImages = document.querySelectorAll('.c_press_img')
    const pressLabels = document.querySelectorAll('.press_c_label')
    const pressTrigger = document.querySelector('.press_p')
    
    // New selectors
    const pressImgWrappers = document.querySelectorAll('.press_img_w')
    const pressLinkTitles = document.querySelectorAll('.p_link_title')
    const pressLinkLabels = document.querySelectorAll('.press_link_label')
    const pcWrapper = document.querySelector('.pc_wrapper')

    if (!pressTitle || !pressImages.length || !pressLabels.length || !pressTrigger || !pcWrapper) return;

    // Function to split and create masks for text
    const splitAndMaskText = (element) => {
        const split = new SplitText(element, {
            type: 'lines,words,chars',
            linesClass: 'split-line'
        });

        // Create wrapper divs for overflow masking
        split.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'block';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        return split;
    }

    // Split texts
    const splitTitle = splitAndMaskText(pressTitle);
    const splitLabels = Array.from(pressLabels).map(label => splitAndMaskText(label));

    // Set initial states
    gsap.set(splitTitle.lines, {
        y: '100%'
    });

    splitLabels.forEach(split => {
        gsap.set(split.lines, {
            y: '100%'
        });
    });

    gsap.set(pressImages, {
        y: '100%'
    });

    // Set initial states for new elements
    gsap.set(pressImgWrappers, {
        clipPath: 'inset(100% 0 0 0)'
    });

    gsap.set([pressLinkTitles, pressLinkLabels], {
        y: '100%',
        opacity: 0
    });

    // First timeline for main content
    const contentTl = gsap.timeline({
        scrollTrigger: {
            trigger: pressTrigger,
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Animate everything in sequence
    contentTl
        // Animate title
        .to(splitTitle.lines, {
            y: '0%',
            duration: 2.8,
            ease: 'expo.out',
            stagger: {
                each: 0.02
            }
        })
        // Animate labels
        .to(splitLabels.map(split => split.lines).flat(), {
            y: '0%',
            duration: 2.8,
            ease: 'expo.out',
            stagger: {
                each: 0.02
            }
        }, '<+=0.1')
        // Animate images
        .to(pressImages, {
            y: '0%',
            duration: 2.8,
            ease: 'expo.out',
            stagger: {
                each: 0.1
            }
        }, '<+=0.2');

    // Second timeline for image wrappers and links
    const linksAndImagesTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: pcWrapper,
            start: 'top bottom',
            toggleActions: 'play none none none'
        }
    });

    linksAndImagesTimeline
        // Animate image wrappers with clip path
        .to(pressImgWrappers, {
            clipPath: 'inset(0% 0 0 0)',
            duration: 2.8,
            ease: 'expo.out',
            stagger: {
                each: 0.1
            }
        })
        // Animate link titles
        .to(pressLinkTitles, {
            y: '0%',
            opacity: 1,
            duration: 2.8,
            ease: 'expo.out',
            stagger: {
                each: 0.04
            }
        }, '<+=0.2')
        // Animate link labels
        .to(pressLinkLabels, {
            y: '0%',
            opacity: 1,
            duration: 2.8,
            ease: 'expo.out',
            stagger: {
                each: 0.04
            }
        }, '<');
}

export default pressContent