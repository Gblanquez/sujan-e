import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const conservationIntro = () => {
    const statsTitle = document.querySelector('.stats_title');
    const abBg = document.querySelector('.ab_i_w');
    const statsSection = document.querySelector('.stats-s');
    const hBg = document.querySelector('.h_bg');

    if (!statsTitle || !abBg || !statsSection) return;

    const splitStatsTitle = new SplitText(statsTitle, {
        type: 'lines,words,chars',
        linesClass: 'split-line'
    });

    splitStatsTitle.lines.forEach(line => {
        const wrapper = document.createElement('div');
        wrapper.style.overflow = 'hidden';
        wrapper.style.display = 'block';
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
    });

    gsap.fromTo(
        splitStatsTitle.lines,
        {
            y: '100%'
        },
        {
            y: '0%',
            duration: 1.8,
            ease: 'power4.out',
            stagger: { each: 0.1 },
            scrollTrigger: {
                trigger: statsTitle,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            onComplete: () => {
                splitStatsTitle.revert();
                ScrollTrigger.refresh();
            }
        }
    );

    gsap.fromTo(
        abBg,
        {
            scale: 1,
            y: '0%'
        },
        {
            scale: 1.3,
            y: '-5%',
            ease: 'none',
            scrollTrigger: {
                trigger: statsSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        }
    );

    if (hBg) {
        gsap.fromTo(
            hBg,
            { scale: 1 },
            {
                scale: 1.5,
                ease: 'none',
                scrollTrigger: {
                    trigger: statsSection,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
    }
};

export default conservationIntro;
