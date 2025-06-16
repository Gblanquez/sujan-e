import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const projects = () => {
    const projectsSection = document.querySelector('.projects_s');
    const projectsTitle = document.querySelector('.project_title');
    const projectsImage = document.querySelectorAll('.proj_im');
    const projectsIWrap = document.querySelectorAll('.p_img_wr');
    const projectsText = document.querySelector('.project_text');
    const projectLabel = document.querySelectorAll('.p_label');
    const projectLine = document.querySelectorAll('.project_line');
    const projLine = document.querySelectorAll('.proj_line');
    const projectNLabel = document.querySelectorAll('.p_title');
    const projectNText = document.querySelectorAll('.p_p_text');

    // Function to split and animate text
    const splitAndAnimateText = (element) => {
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
                duration: 1.6,
                ease: 'power4.inOut',
                stagger: {
                    each: 0.02
                },
                scrollTrigger: {
                    trigger: element,
                    start: 'top 95%',
                    toggleActions: 'play none none none'
                }
            }
        );
    };

    // Split and animate main texts
    if (projectsTitle) splitAndAnimateText(projectsTitle);
    if (projectsText) splitAndAnimateText(projectsText);

    // Split and animate labels and texts
    projectLabel.forEach(label => splitAndAnimateText(label));
    projectNLabel.forEach(label => splitAndAnimateText(label));
    projectNText.forEach(text => splitAndAnimateText(text));

    // Animate lines
    projectLine.forEach(line => {
        gsap.fromTo(
            line,
            {
                scaleX: 0,
                transformOrigin: 'left center'
            },
            {
                scaleX: 1,
                duration: 1.6,
                ease: 'power4.inOut',
                scrollTrigger: {
                    trigger: line,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Animate proj_line elements
    projLine.forEach(line => {
        gsap.fromTo(
            line,
            {
                scaleX: 0,
                transformOrigin: 'left center'
            },
            {
                scaleX: 1,
                duration: 1.2,
                ease: 'power4.inOut',
                scrollTrigger: {
                    trigger: line,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Animate image wrappers and images
    projectsIWrap.forEach((wrapper, index) => {
        // Clip path animation for wrapper
        gsap.fromTo(
            wrapper,
            {
                clipPath: 'inset(0 0 100% 0)'
            },
            {
                clipPath: 'inset(0 0 0% 0)',
                duration: 2.0,
                ease: 'power4.inOut',
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top bottom',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Scale animation for image
        if (projectsImage[index]) {
            gsap.fromTo(
                projectsImage[index],
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
        }
    });
} 

export default projects;