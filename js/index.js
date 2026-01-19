
feather.replace();


document.addEventListener(CONFIG.EVENTS.DOM_CONTENT_LOADED, () => {
    const words = document.querySelectorAll(CONFIG.SELECTORS.WORD);
    const container = document.querySelector(CONFIG.SELECTORS.BOUNCE_CONTAINER);

    // Exit early if bounce container doesn't exist on this page
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    /**
     * Generates a random number between min and max values
     *
     * @param {number} min - Minimum value (inclusive)
     * @param {number} max - Maximum value (exclusive)
     * @returns {number} Random float between min and max
     */
    const getRandom = (min, max) => Math.random() * (max - min) + min;

    words.forEach(word => {
        const wordRect = word.getBoundingClientRect();
        const wordWidth = wordRect.width;
        const wordHeight = wordRect.height;

        let x = getRandom(0, containerWidth - wordWidth);
        let y = getRandom(0, containerHeight - wordHeight);
        let dx = getRandom(1, 3) * (Math.random() < 0.5 ? -1 : 1);
        let dy = getRandom(1, 3) * (Math.random() < 0.5 ? -1 : 1);

        word.style.left = `${x}px`;
        word.style.top = `${y}px`;

        /**
         * Animates individual word movement with boundary collision detection
         * Uses closure to access word-specific position and velocity variables
         * Recursively calls itself via requestAnimationFrame
         */
        const moveWord = () => {
            x += dx;
            y += dy;

            if (x <= 0 || x + wordWidth >= containerWidth) dx *= -1;
            if (y <= 0 || y + wordHeight >= containerHeight) dy *= -1;

            word.style.left = `${x}px`;
            word.style.top = `${y}px`;

            requestAnimationFrame(moveWord);
        };

        moveWord();
    });
});

