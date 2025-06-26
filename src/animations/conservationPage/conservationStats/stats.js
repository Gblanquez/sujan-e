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
    const targetText = number.textContent;
    const targetNumber = parseFloat(targetText.replace(/,/g, ''));

    const formatNumber = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    gsap.set(number, {
      textContent: '0'
    });

    const cardTrigger = statCards[index] || number; // Fallback if mismatch

    gsap.to(number, {
      duration: 2.4,
      textContent: targetNumber,
      ease: 'power4.inOut',
      snap: { textContent: 1 },
      modifiers: {
        textContent: value => formatNumber(Math.round(value))
      },
      scrollTrigger: {
        trigger: cardTrigger,
        start: 'top 85%', // Trigger slightly earlier
        toggleActions: 'play none none none',
        once: true
      }
    });
  });

  // Animate stat text
  statText.forEach((text) => {
    const splitText = new SplitText(text, {
      type: 'lines,words',
      linesClass: 'split-line'
    });

    splitText.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      wrapper.style.display = 'block';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.fromTo(
      splitText.lines,
      { y: '100%' },
      {
        y: '0%',
        duration: 1.8,
        ease: 'power4.out',
        stagger: { each: 0.02 },
        scrollTrigger: {
          trigger: text,
          start: 'top 60%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Animate stat label
  statLabel.forEach((label) => {
    const splitLabel = new SplitText(label, {
      type: 'lines,words',
      linesClass: 'split-line'
    });

    splitLabel.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      wrapper.style.display = 'block';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.fromTo(
      splitLabel.lines,
      { y: '100%' },
      {
        y: '0%',
        duration: 1.8,
        ease: 'power4.out',
        stagger: { each: 0.02 },
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