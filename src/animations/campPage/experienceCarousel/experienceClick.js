import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger, SplitText);

const initExperienceClick = () => {
    const experienceItems = document.querySelectorAll('.exp_c_item');
    const experienceContentWrapper = document.querySelector('.exp_o_wrapper');
    const experienceContentItems = document.querySelectorAll('.exp_cl_item');
    const closeButtons = document.querySelectorAll('[data-a="close-trigger"]');
    const forwardButtons = document.querySelectorAll('[data-a="forward-button-e"]');
    const backwardButtons = document.querySelectorAll('[data-a="back-button-e"]');

    if (!experienceItems.length || !experienceContentWrapper || !experienceContentItems.length) return;

    let currentIndex = 0;
    let galleryDraggable = null;

    const showContentAtIndex = (index) => {
        experienceContentItems.forEach((contentItem, i) => {
            contentItem.style.display = i === index ? 'block' : 'none';
        });

        const currentContent = experienceContentItems[index];
        initGalleryDraggable(currentContent);
    };

    experienceItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            experienceContentWrapper.style.display = 'block';
            showContentAtIndex(currentIndex);
        });
    });

    if (closeButtons.length) {
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                experienceContentWrapper.style.display = 'none';
                experienceContentItems.forEach(contentItem => {
                    contentItem.style.display = 'none';
                });
                if (galleryDraggable) {
                    galleryDraggable.kill();
                    galleryDraggable = null;
                }
            });
        });
    }

    if (forwardButtons.length) {
        forwardButtons.forEach(button => {
            button.addEventListener('click', () => {
                currentIndex++;
                if (currentIndex >= experienceContentItems.length) {
                    currentIndex = 0;
                }
                showContentAtIndex(currentIndex);
            });
        });
    }

    if (backwardButtons.length) {
        backwardButtons.forEach(button => {
            button.addEventListener('click', () => {
                currentIndex--;
                if (currentIndex < 0) {
                    currentIndex = experienceContentItems.length - 1;
                }
                showContentAtIndex(currentIndex);
            });
        });
    }

    const initGalleryDraggable = (container) => {
        if (!container) return;

        const wrapper = container.querySelector('.e_g_cl_wrapper');
        const list = wrapper?.querySelector('.e_g_cl_list');
        const items = list?.querySelectorAll('.e_g_cl_item');

        const thumbsWrapper = container.querySelector('.e_cl_wrapper');
        const thumbsList = thumbsWrapper?.querySelector('.e_cl_list');
        const thumbsItems = thumbsList?.querySelectorAll('.e_cl_item');

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
                const thumbContainer = thumb.querySelector('.thumb_container');
                const thumbAct = thumbContainer?.querySelector('.thumb_act');
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

export default initExperienceClick;