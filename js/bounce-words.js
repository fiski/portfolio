/**
 * Initializes bouncing word animation with random positions and velocities
 * Creates animation loop that continuously updates word positions with boundary collision detection
 */
function initBounceWords() {
    const words = document.querySelectorAll(CONFIG.SELECTORS.BOUNCE_WORDS);
    const container = document.querySelector(CONFIG.SELECTORS.BOUNCE_CONTAINER);
    if (!container || !words.length) return;

    const containerRect = container.getBoundingClientRect();
    const wordStates = [];

    // Initialize each word with random position and velocity
    words.forEach((word, index) => {
        const wordRect = word.getBoundingClientRect();
        wordStates[index] = {
            x: Math.random() * (containerRect.width - wordRect.width),
            y: Math.random() * (containerRect.height - wordRect.height),
            dx: (Math.random() - 0.5) * 2, // Random horizontal velocity
            dy: (Math.random() - 0.5) * 2  // Random vertical velocity
        };
        updateWordPosition(word, wordStates[index]);
    });

    /**
     * Updates the CSS transform position of a word element
     *
     * @param {HTMLElement} word - The word DOM element to update
     * @param {Object} state - Position state object
     * @param {number} state.x - X coordinate in pixels
     * @param {number} state.y - Y coordinate in pixels
     */
    function updateWordPosition(word, state) {
        word.style.transform = `translate(${state.x}px, ${state.y}px)`;
    }

    /**
     * Main animation loop that updates word positions and handles collision detection
     * Recursively calls itself using requestAnimationFrame for smooth 60fps animation
     */
    function animate() {
        words.forEach((word, index) => {
            const state = wordStates[index];
            const wordRect = word.getBoundingClientRect();

            // Update position
            state.x += state.dx;
            state.y += state.dy;

            // Bounce off walls
            if (state.x <= 0 || state.x >= containerRect.width - wordRect.width) {
                state.dx *= -1;
            }
            if (state.y <= 0 || state.y >= containerRect.height - wordRect.height) {
                state.dy *= -1;
            }

            // Keep words within bounds
            state.x = Math.max(0, Math.min(state.x, containerRect.width - wordRect.width));
            state.y = Math.max(0, Math.min(state.y, containerRect.height - wordRect.height));

            updateWordPosition(word, state);
        });

        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
}

// Initialize when the page loads
document.addEventListener(CONFIG.EVENTS.DOM_CONTENT_LOADED, initBounceWords); 