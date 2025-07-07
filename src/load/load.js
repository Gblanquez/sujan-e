import { gsap } from 'gsap'

const loadImages = () => {
    // Get all the target images
    const images = [
        document.querySelector('.h_img'),
        document.querySelector('.c_img'),
        document.querySelector('.ca_img'),
        document.querySelector('.story_img_main'),
        document.querySelector('.ite_img')
    ]

    let loadedImages = 0
    const totalImages = images.length
    let isComplete = false

    return new Promise((resolve) => {
        // Get loading elements
        const loadNumb = document.querySelector('.load_n')
        const loadB = document.querySelector('.load_bg')

        // Create timeline for progress animations
        const progressTl = gsap.timeline()

        // Set minimum duration for the loader
        const minLoadTime = 2000 
        const maxLoadTime = 8000 
        const startTime = Date.now()

        const updateProgress = (forceComplete = false) => {
            // Prevent updates if we're already complete
            if (isComplete) return

            if (!forceComplete) {
                loadedImages = Math.min(loadedImages + 1, totalImages) // Cap at totalImages
            }
            
            // Calculate progress based on loaded images or force to 100
            let progress = forceComplete ? 100 : (loadedImages / totalImages) * 100
            
            // Ensure progress stays between 0 and 100
            progress = Math.min(Math.max(progress, 0), 100)

            // Ensure progress moves forward only (never backwards)
            const currentProgress = parseInt(loadNumb.textContent) || 0
            progress = Math.max(progress, currentProgress)

            // Animate both number and loading bar
            progressTl.to([loadNumb, loadB], {
                duration: 0.5,
                ease: 'power2.out',
                onStart: () => {
                    // Update the number with padding, ensuring it never exceeds 100
                    loadNumb.textContent = Math.min(progress, 100).toFixed(0).padStart(2, '0')
                },
                height: `${Math.min(progress, 100)}%`,
            })

            // If all images are loaded or we're forcing completion
            if (loadedImages === totalImages || forceComplete) {
                if (!isComplete) {
                    isComplete = true
                    resolve()
                }
            }
        }

        // Set up a fallback timer to ensure the loader completes
        const fallbackTimer = setTimeout(() => {
            console.log('Loading fallback triggered')
            // Force progress to 100%
            loadedImages = totalImages
            updateProgress(true)
        }, maxLoadTime)

        // Ensure minimum loading time
        const minLoadTimer = setTimeout(() => {
            const elapsed = Date.now() - startTime
            if (elapsed < minLoadTime) {
                // If we're done loading but haven't met minimum time, delay completion
                const remainingTime = minLoadTime - elapsed
                setTimeout(() => updateProgress(), remainingTime)
            }
        }, minLoadTime)

        // Load each image
        images.forEach(img => {
            if (!img) {
                // If image element doesn't exist, count it as loaded
                updateProgress()
                return
            }

            // Create a new image object to handle loading
            const tempImage = new Image()
            let hasLoaded = false

            tempImage.onload = () => {
                if (!hasLoaded) {
                    hasLoaded = true
                    updateProgress()
                }
            }

            tempImage.onerror = () => {
                if (!hasLoaded) {
                    hasLoaded = true
                    console.warn(`Failed to load image: ${img.src}`)
                    updateProgress() // Count as loaded even if it failed
                }
            }

            // Start loading the image
            if (img.currentSrc) {
                tempImage.src = img.currentSrc
            } else if (img.src) {
                tempImage.src = img.src
            } else if (img.dataset.src) {
                tempImage.src = img.dataset.src
            } else {
                // If no source is found, count as loaded
                updateProgress()
            }

            // If the image is already cached
            if (tempImage.complete && !hasLoaded) {
                hasLoaded = true
                updateProgress()
            }
        })

        // Cleanup function
        return () => {
            clearTimeout(fallbackTimer)
            clearTimeout(minLoadTimer)
        }
    })
}

export default loadImages
