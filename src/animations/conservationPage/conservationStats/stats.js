import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const conservationStats = () => {
    const statCards = document.querySelectorAll('.stat_card');
    const statLabel = document.querySelectorAll('.stat_label');
    const statText = document.querySelectorAll('.stats_text');
    const statNumbers = document.querySelectorAll('.nm');

    if (!statCards.length || !statNumbers.length) return;

    // Number counting animation
    statNumbers.forEach((number, index) => {
        // Get the target number and remove commas
        const targetText = number.textContent;
        const targetNumber = parseFloat(targetText.replace(/,/g, ''));
        
        // Format function to add commas back
        const formatNumber = (num) => {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        };

        // Set initial state
        gsap.set(number, {
            textContent: '0'
        });

        // Create the counting animation
        gsap.to(number, {
            duration: 2.4,
            textContent: targetNumber,
            ease: 'power4.inOut',
            snap: { textContent: 1 }, // Ensures whole numbers
            modifiers: {
                // Custom modifier to format the number with commas
                textContent: value => formatNumber(Math.round(value))
            },
            scrollTrigger: {
                trigger: statCards[index],
                start: 'top bottom',
                toggleActions: 'play none none none'
            }
        });
    });

    // Text splitting and animation for statText
    statText.forEach((text) => {
        // Split text into lines and words
        const splitText = new SplitText(text, {
            type: 'lines,words',
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

        // Animate the lines
        gsap.fromTo(
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
                },
                scrollTrigger: {
                    trigger: text,
                    start: 'top 60%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Text splitting and animation for statLabel
    statLabel.forEach((label) => {
        // Split text into lines and words
        const splitLabel = new SplitText(label, {
            type: 'lines,words',
            linesClass: 'split-line'
        });

        // Create wrapper divs for overflow masking
        splitLabel.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'block';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        // Animate the lines
        gsap.fromTo(
            splitLabel.lines,
            {
                y: '100%'
            },
            {
                y: '0%',
                duration: 1.8,
                ease: 'power4.out',
                stagger: {
                    each: 0.02
                },
                scrollTrigger: {
                    trigger: label,
                    start: 'top bottom',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
};

export default conservationStats;