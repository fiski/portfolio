/**
 * Creates the navigation HTML element with logo, menu items, and dropdown
 *
 * @param {string} currentPage - Current page identifier ('index', 'design', 'about', 'development', 'resume')
 * @returns {HTMLElement} The constructed nav element
 */
function createNavigation(currentPage) {
    const nav = document.createElement('nav');
    nav.className = CONFIG.CLASSES.NAV;
    nav.innerHTML = `
        <div class="${CONFIG.CLASSES.NAV_LEFT}">
            <a href="${CONFIG.ROUTES.INDEX}" class="${CONFIG.CLASSES.BUTTON} ${CONFIG.CLASSES.TEXT_BUTTON} ${currentPage === CONFIG.PAGES.INDEX ? CONFIG.CLASSES.ACTIVE : ''}">
                <img src="${CONFIG.ASSETS.LOGO}" alt="Maximilian Relam Wide" class="${CONFIG.CLASSES.LOGO}">
            </a>
            <!-- Old text version
            <a href="${CONFIG.ROUTES.INDEX}" class="${CONFIG.CLASSES.BUTTON} ${CONFIG.CLASSES.TEXT_BUTTON} ${currentPage === CONFIG.PAGES.INDEX ? CONFIG.CLASSES.ACTIVE : ''}">Maximilian Relam Wide</a>
            -->
        </div>
        <div class="${CONFIG.CLASSES.NAV_RIGHT}">
            <a href="${CONFIG.ROUTES.WORK}" class="${CONFIG.CLASSES.BUTTON} ${CONFIG.CLASSES.TEXT_BUTTON} ${currentPage === CONFIG.PAGES.WORK ? CONFIG.CLASSES.ACTIVE : ''}">Design</a>
            <a href="${CONFIG.ROUTES.EXTENSIONS}" class="${CONFIG.CLASSES.BUTTON} ${CONFIG.CLASSES.TEXT_BUTTON} ${currentPage === CONFIG.PAGES.EXTENSIONS ? CONFIG.CLASSES.ACTIVE : ''}">Development</a>
            <a href="${CONFIG.ROUTES.ABOUT}" class="${CONFIG.CLASSES.BUTTON} ${CONFIG.CLASSES.TEXT_BUTTON} ${currentPage === CONFIG.PAGES.ABOUT ? CONFIG.CLASSES.ACTIVE : ''}">About</a>
            <div class="${CONFIG.CLASSES.DROPDOWN}">
                <button class="${CONFIG.CLASSES.BUTTON} ${CONFIG.CLASSES.TEXT_BUTTON} ${CONFIG.CLASSES.DROPDOWN_TOGGLE} ${currentPage === CONFIG.PAGES.RESUME ? CONFIG.CLASSES.ACTIVE : ''}" type="button">
                    Resume
                    <i class="feather-16" data-feather="chevron-down"></i>

                </button>
                <div class="${CONFIG.CLASSES.DROPDOWN_MENU}">
                    <a href="${CONFIG.ASSETS.CV_ENGLISH}" class="${CONFIG.CLASSES.DROPDOWN_ITEM}" target="_blank">English</a>
                    <a href="${CONFIG.ASSETS.CV_SWEDISH}" class="${CONFIG.CLASSES.DROPDOWN_ITEM}" target="_blank">Swedish</a>
                </div>
            </div>
        </div>
    `;
    return nav;
}

/**
 * Initializes and inserts navigation into the page, manages background classes and active states
 *
 * @param {string} currentPage - Current page identifier for setting active states and backgrounds
 */
function initNavigation(currentPage) {
    const body = document.body;

    // Create and insert navigation
    const nav = createNavigation(currentPage);
    body.insertBefore(nav, body.firstChild);

    // Remove all existing background classes
    body.classList.remove(
        CONFIG.BACKGROUND_CLASSES.INDEX,
        CONFIG.BACKGROUND_CLASSES.WORK,
        CONFIG.BACKGROUND_CLASSES.ABOUT,
        CONFIG.BACKGROUND_CLASSES.CONTACT,
        CONFIG.BACKGROUND_CLASSES.EXTENSIONS
    );

    // Add the appropriate background class based on the current page
    switch (currentPage) {
        case CONFIG.PAGES.INDEX:
            body.classList.add(CONFIG.BACKGROUND_CLASSES.INDEX);
            break;
        case CONFIG.PAGES.WORK:
            body.classList.add(CONFIG.BACKGROUND_CLASSES.WORK);
            break;
        case CONFIG.PAGES.ABOUT:
            body.classList.add(CONFIG.BACKGROUND_CLASSES.ABOUT);
            break;
        case CONFIG.PAGES.EXTENSIONS:
            body.classList.add(CONFIG.BACKGROUND_CLASSES.EXTENSIONS);
            break;
        case CONFIG.PAGES.CONTACT:
            body.classList.add(CONFIG.BACKGROUND_CLASSES.CONTACT);
            break;
    }

    // Update navigation items
    const navItems = document.querySelectorAll(CONFIG.SELECTORS.NAV_ITEM);
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href === CONFIG.ROUTES.INDEX && currentPage === CONFIG.PAGES.INDEX) {
                item.classList.add(CONFIG.CLASSES.ACTIVE);
            } else if (href === CONFIG.ROUTES.WORK && currentPage === CONFIG.PAGES.WORK) {
                item.classList.add(CONFIG.CLASSES.ACTIVE);
            } else if (href === CONFIG.ROUTES.EXTENSIONS && currentPage === CONFIG.PAGES.EXTENSIONS) {
                item.classList.add(CONFIG.CLASSES.ACTIVE);
            } else if (href === CONFIG.ROUTES.ABOUT && currentPage === CONFIG.PAGES.ABOUT) {
                item.classList.add(CONFIG.CLASSES.ACTIVE);
            } else if (href === CONFIG.ROUTES.CONTACT && currentPage === CONFIG.PAGES.CONTACT) {
                item.classList.add(CONFIG.CLASSES.ACTIVE);
            } else {
                item.classList.remove(CONFIG.CLASSES.ACTIVE);
            }
        }
    });
    
    // Initialize dropdown functionality
    initDropdown();
    
    // Ensure Feather is loaded, then replace icons
    loadFeatherIfNeeded(function() {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    });
}

/**
 * Dynamically loads Feather Icons library from CDN if not already available
 *
 * @param {Function} callback - Function to execute after Feather Icons is loaded
 */
function loadFeatherIfNeeded(callback) {
    if (typeof feather !== 'undefined') {
        callback && callback();
        return;
    }
    var existing = document.querySelector('script[data-feather-cdn]');
    if (existing) {
        existing.addEventListener(CONFIG.EVENTS.LOAD, function() { callback && callback(); });
        return;
    }
    var script = document.createElement('script');
    script.src = CONFIG.CDN.FEATHER_ICONS;
    script.async = true;
    script.setAttribute('data-feather-cdn', 'true');
    script.onload = function() { callback && callback(); };
    document.head.appendChild(script);
}

/**
 * Initializes dropdown menu functionality with click handlers, keyboard navigation, and click-outside behavior
 */
function initDropdown() {
    const dropdowns = document.querySelectorAll(CONFIG.SELECTORS.DROPDOWN);

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector(CONFIG.SELECTORS.DROPDOWN_TOGGLE);

        if (toggle) {
            toggle.addEventListener(CONFIG.EVENTS.CLICK, function(e) {
                e.preventDefault();
                e.stopPropagation();

                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove(CONFIG.CLASSES.ACTIVE);
                    }
                });

                // Toggle current dropdown
                dropdown.classList.toggle(CONFIG.CLASSES.ACTIVE);
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener(CONFIG.EVENTS.CLICK, function(e) {
        if (!e.target.closest(CONFIG.SELECTORS.DROPDOWN)) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove(CONFIG.CLASSES.ACTIVE);
            });
        }
    });

    // Close dropdowns when pressing Escape
    document.addEventListener(CONFIG.EVENTS.KEYDOWN, function(e) {
        if (e.key === CONFIG.KEYS.ESCAPE) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove(CONFIG.CLASSES.ACTIVE);
            });
        }
    });
}

