import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const relaisRest = () => {
    // Text elements selectors
    const textSelectors = [
        '.rc_v_title',
        '.rc_v_text',
        '.rc_label',
        '.values_title',
        '.value_label',
        '.value_label_text',
        '.commit_title',
        '.commit_label',
        '.commit_text',
        '.p_text',
        '.dw_link',
        '.nmb_label'
    ];

    // Get all text elements (including multiple instances of each class)
    const textElements = textSelectors.reduce((acc, selector) => {
        const elements = Array.from(document.querySelectorAll(selector));
        return [...acc, ...elements];
    }, []);

    // Image wrapper elements
    const visionWrappers = document.querySelectorAll('.rc_vision_m_c');
    const imgWrappers = document.querySelectorAll('.img_w');
    const visionImages = document.querySelectorAll('.vision_img');
    const valueImages = document.querySelectorAll('.v_img');

    // Function to split and animate text
    const splitAndAnimateText = (element) => {
        if (!element) return;

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

        // Animate the lines
        gsap.fromTo(
            split.lines,
            {
                y: '100%'
            },
            {
                y: '0%',
                duration: 2.8,
                ease: 'expo.out',
                stagger: {
                    each: 0.02
                },
                scrollTrigger: {
                    trigger: element,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
    };

    // Animate all text elements
    textElements.forEach(element => splitAndAnimateText(element));

    // Animate vision wrappers and images
    visionWrappers.forEach((wrapper, index) => {
        const img = visionImages[index];
        if (!wrapper || !img) return;

        // Clip path animation for wrapper
        gsap.fromTo(
            wrapper,
            {
                clipPath: 'inset(0 0 100% 0)'
            },
            {
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.2,
                ease: 'power4.inOut',
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top bottom',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Scale animation for vision image
        gsap.fromTo(
            img,
            {
                scale: 1
            },
            {
                scale: 1.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
    });

    // Animate second image wrappers and images
    imgWrappers.forEach((wrapper, index) => {
        const img = valueImages[index];
        if (!wrapper || !img) return;

        // Clip path animation for wrapper
        gsap.fromTo(
            wrapper,
            {
                clipPath: 'inset(0 0 100% 0)'
            },
            {
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.2,
                ease: 'power4.inOut',
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top bottom',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Scale animation for value image
        gsap.fromTo(
            img,
            {
                scale: 1
            },
            {
                scale: 1.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
    });
}

export default relaisRest