import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import { start, stop } from '../../../smoothScroll/smoothScroll';

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger, SplitText);

const initTentClick = () => {
    const tentItems = document.querySelectorAll('.tents_c_item .l_b_w');
    const tentContentWrapper = document.querySelector('.tents_overlay_wrapper');
    const tentContentItems = document.querySelectorAll('.t_o_cl_item');
    const closeButtons = document.querySelectorAll('[data-a="close-trigger-t"]');
    const forwardButtons = document.querySelectorAll('[data-a="forward-button-t"]');
    const backwardButtons = document.querySelectorAll('[data-a="back-button-t"]');
    const navWrapper = document.querySelector('.g_nav_w');

    if (!tentItems.length || !tentContentWrapper || !tentContentItems.length) return;

    let currentIndex = 0;
    let galleryDraggable = null;

    const showContentAtIndex = (index) => {
        tentContentItems.forEach((contentItem, i) => {
            contentItem.style.display = i === index ? 'block' : 'none';
        });

        const currentContent = tentContentItems[index];
        initGalleryDraggable(currentContent);
    };

    tentItems.forEach((item, index) => {
        item.addEventListener('click', () => {

            if (navWrapper) {
                gsap.to(navWrapper, {
                    y: '-100%',
                    duration: 1.0,
                    ease: 'power4.inOut'
                });
            }

            currentIndex = index;


            gsap.delayedCall(0.7, () => {
                tentContentWrapper.style.display = 'block';
                stop();
                showContentAtIndex(currentIndex);
            });
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            tentContentWrapper.style.display = 'none';
            tentContentItems.forEach(contentItem => {
                contentItem.style.display = 'none';
            });
            if (galleryDraggable) {
                galleryDraggable.kill();
                galleryDraggable = null;
            }
            // Restore nav
            if (navWrapper) {
                gsap.to(navWrapper, {
                    y: '0%',
                    duration: 0.8,
                    ease: 'power4.out'
                });
            }
            start();
        });
    });

    forwardButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % tentContentItems.length;
            showContentAtIndex(currentIndex);
        });
    });

    backwardButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + tentContentItems.length) % tentContentItems.length;
            showContentAtIndex(currentIndex);
        });
    });

    const initGalleryDraggable = (container) => {
        if (!container) return;

        const wrapper = container.querySelector('.tent_galle_wrapper');
        const list = wrapper?.querySelector('.tent_galle_list');
        const items = list?.querySelectorAll('.tent_galle_item');

        const thumbsWrapper = container.querySelector('.tent_thumb_wrapper');
        const thumbsList = thumbsWrapper?.querySelector('.tent_thumb_list');
        const thumbsItems = thumbsList?.querySelectorAll('.tent_thumb_item');

        if (!wrapper || !list || !items?.length || !thumbsItems?.length) return;

        if (galleryDraggable) {
            galleryDraggable.kill();
            galleryDraggable = null;
        }

        const itemWidth = items[0].offsetWidth;
        const getMaxScroll = () => list.scrollWidth - wrapper.offsetWidth;
        let maxScroll = getMaxScroll();

        const updateThumbAct = (index) => {
            thumbsItems.forEach((thumb, i) => {
                const thumbAct = thumb.querySelector('.tent_thumb_act');
                if (thumbAct) {
                    thumbAct.style.display = i === index ? 'block' : 'none';
                }
            });
        };

        const goToSlide = (index) => {
            const targetX = -index * itemWidth;
            gsap.to(list, { x: targetX, duration: 0.8, ease: 'power3.out' });
            galleryDraggable.update();
            galleryDraggable.endX = targetX;
            updateThumbAct(index);
        };

        galleryDraggable = Draggable.create(list, {
            type: "x",
            inertia: true,
            edgeResistance: 0.95,
            zIndexBoost: false,
            bounds: {
                minX: -maxScroll,
                maxX: 0
            },
            allowContextMenu: true,
            overshootTolerance: 0.15,
            inertiaResistance: 20,
            onDragEnd: function () {
                const snappedIndex = Math.round(-this.endX / itemWidth);
                goToSlide(snappedIndex);
            },
            onThrowComplete: function () {
                const snappedIndex = Math.round(-this.endX / itemWidth);
                goToSlide(snappedIndex);
            }
        })[0];

        thumbsItems.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        updateThumbAct(0);

        window.addEventListener('resize', () => {
            maxScroll = getMaxScroll();
            galleryDraggable.applyBounds({
                minX: -maxScroll,
                maxX: 0
            });
        });
    };
};

export default initTentClick;