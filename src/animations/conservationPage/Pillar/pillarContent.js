import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const pillarContent = () => {
    const pillarCards = document.querySelectorAll('.pillars_card');
    const pillarText = document.querySelectorAll('.pillar_txt_c');
    const pillarContent = document.querySelectorAll('.pillar_content');

    if (!pillarCards.length || !pillarText.length || !pillarContent.length) return;

    // Set initial state - all content hidden
    pillarContent.forEach(content => {
        gsap.set(content, {
            display: 'none'
        });
    });

    const animateContentClose = (content, text) => {
        // Split text while it's visible
        const splitText = new SplitText(text, {
            type: 'lines,words,chars',
            linesClass: 'split-line'
        });

        // Create wrapper divs for overflow masking
        splitText.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'block';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        // Animate lines up and then hide content
        return gsap.fromTo(
            splitText.lines,
            {
                y: '0%'
            },
            {
                y: '-100%',
                duration: 0.6,
                ease: 'power2.inOut',
                stagger: {
                    each: 0.01,
                    from: 'start'
                },
                onComplete: () => {
                    gsap.set(content, { display: 'none' });
                    splitText.revert();
                }
            }
        );
    };

    const animateContentOpen = (content, text) => {
        // Show content first
        gsap.set(content, { display: 'flex' });

        // Split text after it's visible
        const splitText = new SplitText(text, {
            type: 'lines,words,chars',
            linesClass: 'split-line'
        });

        // Create wrapper divs for overflow masking
        splitText.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'block';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        // Animate the lines in
        return gsap.fromTo(
            splitText.lines,
            {
                y: '100%'
            },
            {
                y: '0%',
                duration: 1.8,
                ease: 'power4.out',
                stagger: {
                    each: 0.02
                }
            }
        );
    };

    let activeCard = null;
    let activeAnimation = null;

    // Set up first card to open on scroll
    ScrollTrigger.create({
        trigger: pillarCards[0],
        start: 'top 80%',
        once: true,
        onEnter: () => {
            activeCard = pillarCards[0];
            activeAnimation = animateContentOpen(pillarContent[0], pillarText[0]);
        }
    });

    pillarCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const targetContent = pillarContent[index];
            const targetText = pillarText[index];

            // If there's an active animation, kill it
            if (activeAnimation) {
                activeAnimation.kill();
            }

            // If clicking the active card, just close it
            if (activeCard === card) {
                activeAnimation = animateContentClose(targetContent, targetText);
                activeCard = null;
                return;
            }

            // If there's an active card, close it first then open the new one
            if (activeCard !== null) {
                const activeIndex = Array.from(pillarCards).indexOf(activeCard);
                const closeAnimation = animateContentClose(pillarContent[activeIndex], pillarText[activeIndex]);
                
                // Wait for close animation to complete before opening new content
                closeAnimation.then(() => {
                    activeAnimation = animateContentOpen(targetContent, targetText);
                });
            } else {
                // If no active card, just open the new content
                activeAnimation = animateContentOpen(targetContent, targetText);
            }

            // Update active card
            activeCard = card;
        });
    });
};

export default pillarContent;