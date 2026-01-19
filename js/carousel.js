/**
 * Draggable Client Logo Carousel
 * Adds mouse drag and touch swipe support to the client logo carousel
 * while preserving the seamless infinite loop animation.
 */

/**
 * Initializes the draggable carousel functionality
 * @returns {void}
 */
function initCarousel() {
  const { CAROUSEL } = CONFIG;
  const container = document.querySelector(CAROUSEL.SELECTORS.CONTAINER);
  const track = document.querySelector(CAROUSEL.SELECTORS.TRACK);

  if (!container || !track) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // State
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let dragOffset = 0;
  let velocity = 0;
  let lastX = 0;
  let lastTime = 0;
  let animationId = null;
  let resumeTimeout = null;

  /**
   * Gets the logo item width based on current viewport
   * @returns {number} Width of one logo item including padding
   */
  function getItemWidth() {
    const width = window.innerWidth;
    const dims = width <= CAROUSEL.BREAKPOINTS.MOBILE
      ? CAROUSEL.DIMENSIONS.MOBILE
      : width <= CAROUSEL.BREAKPOINTS.TABLET
        ? CAROUSEL.DIMENSIONS.TABLET
        : CAROUSEL.DIMENSIONS.DESKTOP;
    return dims.logoWidth + dims.padding;
  }

  /**
   * Gets the total width of one set of logos (for loop wrapping)
   * @returns {number} Total width of original logo set
   */
  function getSetWidth() {
    return CAROUSEL.LOGO_COUNT * getItemWidth();
  }

  /**
   * Gets the current animated position from CSS animation
   * @returns {number} Current translateX value
   */
  function getCurrentPosition() {
    const style = window.getComputedStyle(track);
    const matrix = new DOMMatrix(style.transform);
    return matrix.m41;
  }

  /**
   * Wraps position for seamless infinite loop
   * @param {number} position - Current position
   * @returns {number} Wrapped position
   */
  function wrapPosition(position) {
    const setWidth = getSetWidth();
    // Wrap when exceeding bounds in either direction
    if (position > 0) {
      return position - setWidth;
    }
    if (position < -setWidth) {
      return position + setWidth;
    }
    return position;
  }

  /**
   * Applies position to track via transform
   * @param {number} position - Position to apply
   */
  function setPosition(position) {
    track.style.transform = `translateX(${position}px)`;
  }

  /**
   * Handles drag start
   * @param {PointerEvent} e - Pointer event
   */
  function onPointerDown(e) {
    // Only handle primary button (left click / touch)
    if (e.button !== 0) return;

    isDragging = false; // Will become true after min distance
    startX = e.clientX;
    lastX = e.clientX;
    lastTime = performance.now();
    velocity = 0;

    // Cancel any running momentum animation
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    // Clear resume timeout
    if (resumeTimeout) {
      clearTimeout(resumeTimeout);
      resumeTimeout = null;
    }

    // Capture current animated position and set it immediately
    // Must set inline transform BEFORE disabling animation to prevent jump
    currentX = getCurrentPosition();
    dragOffset = 0;
    setPosition(currentX);

    // Now disable CSS animation (inline transform will take over)
    track.classList.add(CAROUSEL.CLASSES.PAUSED);

    // Set pointer capture for reliable tracking
    container.setPointerCapture(e.pointerId);

    // Add move and up listeners
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerUp);
  }

  /**
   * Handles drag move
   * @param {PointerEvent} e - Pointer event
   */
  function onPointerMove(e) {
    const deltaX = e.clientX - startX;

    // Check if we've exceeded minimum drag distance
    if (!isDragging && Math.abs(deltaX) > CAROUSEL.MIN_DRAG_DISTANCE) {
      isDragging = true;
      container.classList.add(CAROUSEL.CLASSES.DRAGGING);
    }

    if (!isDragging) return;

    // Calculate velocity
    const now = performance.now();
    const dt = now - lastTime;
    if (dt > 0) {
      velocity = (e.clientX - lastX) / dt;
    }
    lastX = e.clientX;
    lastTime = now;

    // Update position
    dragOffset = deltaX;
    let newPosition = wrapPosition(currentX + dragOffset);
    setPosition(newPosition);
  }

  /**
   * Handles drag end
   * @param {PointerEvent} e - Pointer event
   */
  function onPointerUp(e) {
    // Remove listeners
    container.removeEventListener('pointermove', onPointerMove);
    container.removeEventListener('pointerup', onPointerUp);
    container.removeEventListener('pointercancel', onPointerUp);

    // Release pointer capture
    if (container.hasPointerCapture(e.pointerId)) {
      container.releasePointerCapture(e.pointerId);
    }

    container.classList.remove(CAROUSEL.CLASSES.DRAGGING);

    if (!isDragging) {
      // No drag happened, just resume animation
      resumeAnimation();
      return;
    }

    isDragging = false;

    // Apply momentum if not reduced motion
    if (!prefersReducedMotion && Math.abs(velocity) > CAROUSEL.MOMENTUM.MIN_VELOCITY) {
      currentX = wrapPosition(currentX + dragOffset);
      applyMomentum();
    } else {
      resumeAnimation();
    }
  }

  /**
   * Applies momentum animation after drag release
   */
  function applyMomentum() {
    const { FRICTION, MIN_VELOCITY, VELOCITY_SCALE } = CAROUSEL.MOMENTUM;

    function animate() {
      // Apply friction
      velocity *= FRICTION;

      // Update position
      currentX += velocity * VELOCITY_SCALE * 16; // Approximate 16ms per frame
      currentX = wrapPosition(currentX);
      setPosition(currentX);

      // Continue or stop
      if (Math.abs(velocity) > MIN_VELOCITY) {
        animationId = requestAnimationFrame(animate);
      } else {
        animationId = null;
        resumeAnimation();
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  /**
   * Resumes CSS animation after delay
   */
  function resumeAnimation() {
    resumeTimeout = setTimeout(() => {
      // Remove inline transform to let CSS animation take over
      track.style.transform = '';
      track.classList.remove(CAROUSEL.CLASSES.PAUSED);
      resumeTimeout = null;
    }, CAROUSEL.RESUME_DELAY);
  }

  // Attach event listener
  container.addEventListener('pointerdown', onPointerDown);
}
