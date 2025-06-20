import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import Flip from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

const timeline = () => {
    const tContent = Array.from(document.querySelectorAll('.timeline_content_p'))
    const tTitle = Array.from(document.querySelectorAll('.timeline_title'))
    const tText = Array.from(document.querySelectorAll('.timeline_text'))
    const tImage = Array.from(document.querySelectorAll('.timeline_i_wrap'))
    const yTitle = Array.from(document.querySelectorAll('.y_title'))
    const timelineHolder = document.querySelector('.time_content_holder')
    
    // Timeline navigation elements
    const timelineWrapHeight = document.querySelector('.t_wrap_h')
    const yearLabels = Array.from(document.querySelectorAll('.timeline_y_l_w'))
    const yearLineWrappers = Array.from(document.querySelectorAll('.y_line_w'))
    const timelineIndicator = document.querySelector('.t_line')

    // If no elements found, exit
    if (!tContent.length || !tTitle.length || !tText.length || !tImage.length || 
        !yTitle.length || !timelineHolder || !timelineWrapHeight || 
        !yearLabels.length || !timelineIndicator || !yearLineWrappers.length) return;

    // Animation state management
    let currentIndex = 0;
    let isAnimating = false;
    let targetIndex = 0;
    let scrollDirection = 'forward';
    let mainScrollTrigger;
    let isScrolling = false;
    let scrollTimeout;

    // Calculate total scroll height based on number of sections and animation duration
    const totalSections = tContent.length;
    const viewportHeight = window.innerHeight;
    // We want enough scroll space for each section transition
    // Multiply by 2 to give enough space for each transition
    const totalHeight = viewportHeight * (totalSections - 1) * 2;
    
    // Set the height of the timeline holder and timeline wrap
    timelineHolder.style.height = `${totalHeight}px`;
    timelineWrapHeight.style.height = `${totalHeight}px`;

    // Split text for titles and year titles
    const splitTitles = tTitle.map(title => new SplitText(title, {
        type: 'lines',
        linesClass: 'split-line'
    }));

    const splitYTitles = yTitle.map(title => new SplitText(title, {
        type: 'chars',
        charsClass: 'split-char'
    }));

    // Split text for content text into lines
    const splitTexts = tText.map(text => {
        const split = new SplitText(text, {
            type: 'lines',
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
    });

    // Create wrapper divs for title lines
    splitTitles.forEach(split => {
        split.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'block';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });
    });

    // Set initial states
    const setInitialState = (index) => {
        gsap.set(splitTitles[index].lines, {
            y: '110%'
        });

        gsap.set(splitYTitles[index].chars, {
            x: '-10%',
            y: '100%',
            rotateX: -72,
            rotateY: -45,
            rotateZ: -4,
            transformOrigin: 'top',
            transformStyle: 'preserve-3d',
            opacity: 0
        });

        gsap.set(splitTexts[index].lines, {
            y: '100%'
        });

        gsap.set(tImage[index], {
            clipPath: 'inset(100% 0% 0% 0%)'
        });
    };

    // Set all to initial state
    tContent.forEach((_, index) => {
        if (index === 0) {
            // Set first section to visible
            gsap.set(splitTitles[0].lines, { y: '0%' });
            gsap.set(splitYTitles[0].chars, { x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 });
            gsap.set(splitTexts[0].lines, { y: '0%' });
            gsap.set(tImage[0], { clipPath: 'inset(0% 0% 0% 0%)' });
        } else {
            setInitialState(index);
        }
    });

    // Function to move timeline indicator
    const moveTimelineIndicator = (toIndex) => {
        const targetWrapper = yearLineWrappers[toIndex];
        if (!targetWrapper) return;

        // Get the current state
        const state = Flip.getState(timelineIndicator);
        
        // Move the indicator to new parent
        targetWrapper.appendChild(timelineIndicator);
        
        // Animate the movement
        Flip.from(state, {
            duration: 0.4, 
            ease: "power2.inOut",
            absolute: true
        });
    };

    // Create transition animation
    const createTransition = (fromIndex, toIndex, direction) => {
        return new Promise((resolve) => {
            const tl = gsap.timeline({
                onComplete: () => {
                    isAnimating = false;
                    currentIndex = toIndex;
                    resolve();
                }
            });

            if (direction === 'forward') {
                // Out animation for current section
                tl.to(splitTitles[fromIndex].lines, {
                    y: '-110%',
                    duration: 0.8,
                    ease: 'power4.in',
                    stagger: { each: 0.05 }
                })
                // Move timeline indicator during the out animation
                .add(() => moveTimelineIndicator(toIndex), '<0.2')
                .to(splitYTitles[fromIndex].chars, {
                    x: '10%',
                    y: '-100%',
                    rotateX: 72,
                    rotateY: 45,
                    rotateZ: 4,
                    opacity: 0,
                    duration: 1,
                    ease: 'power4.in',
                    stagger: { each: 0.02 }
                }, '<0.1')
                .to(splitTexts[fromIndex].lines, {
                    y: '-100%',
                    duration: 0.8,
                    ease: 'power4.in',
                    stagger: { each: 0.05 }
                }, '<0.2')
                .to(tImage[fromIndex], {
                    clipPath: 'inset(0% 0% 100% 0%)',
                    duration: 1,
                    ease: 'power4.in'
                }, '<0.3')
                // Shorter delay before in animation
                .add('transition', '+=0.05')
                // In animation for next section
                .to(splitTitles[toIndex].lines, {
                    y: '0%',
                    duration: 1,
                    ease: 'power4.out',
                    stagger: { each: 0.05 }
                }, 'transition')
                .to(splitYTitles[toIndex].chars, {
                    x: '0%',
                    y: '0%',
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power4.out',
                    stagger: { each: 0.02 }
                }, 'transition+=0.1')
                .to(splitTexts[toIndex].lines, {
                    y: '0%',
                    duration: 1,
                    ease: 'power4.out',
                    stagger: { each: 0.05 }
                }, 'transition+=0.2')
                .to(tImage[toIndex], {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.2,
                    ease: 'power4.out'
                }, 'transition+=0.3');
            } else {
                // Reverse animations for backward scrolling
                tl.to(splitTitles[fromIndex].lines, {
                    y: '110%',
                    duration: 0.8,
                    ease: 'power4.in',
                    stagger: { each: 0.05 }
                })
                // Move timeline indicator during the out animation
                .add(() => moveTimelineIndicator(toIndex), '<0.2')
                .to(splitYTitles[fromIndex].chars, {
                    x: '-10%',
                    y: '100%',
                    rotateX: -72,
                    rotateY: -45,
                    rotateZ: -4,
                    opacity: 0,
                    duration: 1,
                    ease: 'power4.in',
                    stagger: { each: 0.02 }
                }, '<0.1')
                .to(splitTexts[fromIndex].lines, {
                    y: '100%',
                    duration: 0.8,
                    ease: 'power4.in',
                    stagger: { each: 0.05 }
                }, '<0.2')
                .to(tImage[fromIndex], {
                    clipPath: 'inset(100% 0% 0% 0%)',
                    duration: 1,
                    ease: 'power4.in'
                }, '<0.3')
                .add('transition', '+=0.05')
                .to(splitTitles[toIndex].lines, {
                    y: '0%',
                    duration: 1,
                    ease: 'power4.out',
                    stagger: { each: 0.05 }
                }, 'transition')
                .to(splitYTitles[toIndex].chars, {
                    x: '0%',
                    y: '0%',
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power4.out',
                    stagger: { each: 0.02 }
                }, 'transition+=0.1')
                .to(splitTexts[toIndex].lines, {
                    y: '0%',
                    duration: 1,
                    ease: 'power4.out',
                    stagger: { each: 0.05 }
                }, 'transition+=0.2')
                .to(tImage[toIndex], {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.2,
                    ease: 'power4.out'
                }, 'transition+=0.3');
            }
        });
    };

    // Handle section transitions
    const handleTransition = async (newIndex) => {
        if (newIndex === currentIndex || newIndex < 0 || newIndex >= tContent.length || isAnimating) return;
        
        isAnimating = true;
        const direction = newIndex > currentIndex ? 'forward' : 'backward';
        await createTransition(currentIndex, newIndex, direction);
    };

    // Create main scroll trigger with pinning
    mainScrollTrigger = ScrollTrigger.create({
        trigger: timelineHolder,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        onUpdate: (self) => {
            // Clear any existing scroll timeout
            clearTimeout(scrollTimeout);
            
            // Update scroll direction
            scrollDirection = self.direction > 0 ? 'forward' : 'backward';
            
            // Calculate target section based on scroll progress
            const progress = Math.max(0, Math.min(1, self.progress));
            const newTargetIndex = Math.min(
                Math.floor(progress * (totalSections - 1)),
                totalSections - 1
            );
            
            if (newTargetIndex !== targetIndex) {
                targetIndex = newTargetIndex;
                
                // If not currently animating, start the sequence
                if (!isAnimating) {
                    const nextIndex = scrollDirection === 'forward' ? 
                        Math.min(currentIndex + 1, targetIndex) : 
                        Math.max(currentIndex - 1, targetIndex);
                    
                    handleTransition(nextIndex);
                }
            }
        }
    });

    // Create scroll trigger for timeline navigation
    ScrollTrigger.create({
        trigger: timelineWrapHeight,
        start: "top top",
        end: "bottom bottom",
        pin: ".timeline_y",
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const newViewportHeight = window.innerHeight;
        const newTotalHeight = newViewportHeight * (totalSections - 1) * 2;
        timelineHolder.style.height = `${newTotalHeight}px`;
        timelineWrapHeight.style.height = `${newTotalHeight}px`;
        mainScrollTrigger.refresh();
    });

    // Make year labels clickable
    yearLabels.forEach((label, index) => {
        label.addEventListener('click', () => {
            if (!isAnimating && index !== currentIndex) {
                targetIndex = index;
                const nextIndex = index > currentIndex ? 
                    Math.min(currentIndex + 1, index) : 
                    Math.max(currentIndex - 1, index);
                handleTransition(nextIndex);
            }
        });
    });

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            if (currentIndex < totalSections - 1 && !isAnimating) {
                targetIndex = currentIndex + 1;
                handleTransition(targetIndex);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            if (currentIndex > 0 && !isAnimating) {
                targetIndex = currentIndex - 1;
                handleTransition(targetIndex);
            }
        }
    });
}

export default timeline