document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const splashImage = document.getElementById('splash-image');
    const splashText = document.getElementById('splash-text');
    const mainContent = document.getElementById('main-content');

    let splashTimeout;

    // --- 1. SPLASH SCREEN LOGIC ---
    if (splashScreen && splashImage && mainContent) {
        splashTimeout = setTimeout(() => {
            if (splashImage) splashImage.classList.add('blurred');
            if (splashText) splashText.classList.add('visible');
        }, 10000); // 10 seconds

        splashScreen.addEventListener('click', () => {
            clearTimeout(splashTimeout);
            splashScreen.classList.add('fade-out');
            
            setTimeout(() => {
                splashScreen.style.display = 'none';
                mainContent.classList.remove('visually-hidden');
                mainContent.classList.add('loaded');
                animateElementsOnLoad();
            }, 500); 
        });
    } else {
        console.warn('Splash screen elements not found. Skipping splash logic.');
        if (mainContent) {
            mainContent.classList.remove('visually-hidden');
            mainContent.classList.add('loaded');
            animateElementsOnLoad();
        }
    }

    // --- 2. MAIN CONTENT LOAD ANIMATIONS ---
    function animateElementsOnLoad() {
        const elementsToAnimate = document.querySelectorAll(
            '.site-header, .card, .social-links-bar' // Added .social-links-bar
        );
        
        let baseDelay = 200; // Initial delay after splash screen fades

        elementsToAnimate.forEach((element, index) => {
            let currentDelay;
            if (element.classList.contains('social-links-bar')) {
                currentDelay = baseDelay + (elementsToAnimate.length -1) * 100 + 100; // Ensure it's last
            } else {
                currentDelay = baseDelay + index * 100;
            }
            
            element.style.transitionDelay = `${currentDelay}ms`; 
            element.classList.add('visible');
        });
    }


    // --- 3. PROJECTS CARD INTERACTIVITY ---
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectKey = item.dataset.project;
            const imageContainer = document.getElementById(`${projectKey}-image-container`);

            if (imageContainer) {
                const currentlyVisible = imageContainer.classList.contains('visible');
                
                document.querySelectorAll('.project-image-container.visible').forEach(openContainer => {
                    openContainer.classList.remove('visible');
                });
                document.querySelectorAll('.project-item.active').forEach(activeItem => {
                    activeItem.classList.remove('active');
                });
                
                if (!currentlyVisible) {
                    imageContainer.classList.add('visible');
                    item.classList.add('active');
                }
            }
        });
    });


    // --- 4. CONTACT CARD INTERACTIVITY ---
    const contactCard = document.getElementById('contact-card');
    const contactTrigger = contactCard ? contactCard.querySelector('.contact-arrow-trigger') : null;

    if (contactTrigger && contactCard) {
        contactTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            contactCard.classList.toggle('expanded');
        });
    } else {
        console.warn('Contact card interactive elements not found.');
    }

    console.log('Daksh Dagar Portfolio Script Initialized.');
});