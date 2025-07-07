import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: {ease: "none"},
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
    });

    let length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
        totalWidth, curX, distanceToStart, distanceToLoop, item, i;

    // Convert "x" to "xPercent" to make things responsive
    gsap.set(items, {
        xPercent: (i, el) => {
            let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
            xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
            return xPercents[i];
        }
    });
    
    gsap.set(items, {x: 0});
    
    totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + 
                 items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + 
                 (parseFloat(config.paddingRight) || 0);

    for (i = 0; i < length; i++) {
        item = items[i];
        curX = xPercents[i] / 100 * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        
        tl.to(item, {
            xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
            duration: distanceToLoop / pixelsPerSecond
        }, 0)
        .fromTo(item, 
            {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)},
            {
                xPercent: xPercents[i],
                duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false
            },
            distanceToLoop / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);
        
        times[i] = distanceToStart / pixelsPerSecond;
    }

    function toIndex(index, vars) {
        vars = vars || {};
        (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
        let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
        
        if (time > tl.time() !== index > curIndex) {
            vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }

    tl.next = vars => toIndex(curIndex+1, vars);
    tl.previous = vars => toIndex(curIndex-1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    
    // Pre-render for performance
    tl.progress(1, true).progress(0, true);
    
    if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
    }
    
    return tl;
}

const logoMarquee = () => {
    const logoSection = document.querySelector('.logo_s');
    const logoWrapper = document.querySelector('.l_w');
    const logoWraps = gsap.utils.toArray('.l_wrap');

    if (!logoSection || !logoWrapper || !logoWraps.length) return;

    // Create the infinite loop
    const loop = horizontalLoop(logoWraps, {
        paused: false,
        repeat: -1,
        speed: 0.5 // Adjust this value to control the speed
    });

    // Pause animation on hover
    logoWrapper.addEventListener('mouseenter', () => {
        gsap.to(loop, {
            timeScale: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    // Resume animation on mouse leave
    logoWrapper.addEventListener('mouseleave', () => {
        gsap.to(loop, {
            timeScale: 1,
            duration: 0.5,
            ease: 'power2.in'
        });
    });

    // Optimize performance by pausing animation when not in view
    ScrollTrigger.create({
        trigger: logoSection,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => loop.play(),
        onEnterBack: () => loop.play(),
        onLeave: () => loop.pause(),
        onLeaveBack: () => loop.pause()
    });
}

export default logoMarquee;