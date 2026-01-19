/**
 * Application-wide configuration and constants
 * Centralizes magic strings to prevent duplication and typos
 *
 * Usage: CONFIG.PAGES.INDEX, CONFIG.ROUTES.WORK, etc.
 */

const CONFIG = {
  // Page identifiers and routes
  PAGES: {
    INDEX: 'index',
    WORK: 'work',
    ABOUT: 'about',
    EXTENSIONS: 'extensions',
    RESUME: 'resume',
    CONTACT: 'contact'
  },

  ROUTES: {
    INDEX: 'index.html',
    WORK: 'work.html',
    ABOUT: 'about.html',
    EXTENSIONS: 'extensions.html',
    CONTACT: 'contact.html'
  },

  BACKGROUND_CLASSES: {
    INDEX: 'index-bg',
    WORK: 'work-bg',
    ABOUT: 'about-bg',
    EXTENSIONS: 'extensions-bg',
    CONTACT: 'contact-bg'
  },

  // DOM selectors
  SELECTORS: {
    BOUNCE_CONTAINER: '.bounce',
    BOUNCE_WORDS: '.bounce .word',
    WORD: '.word',
    DROPDOWN: '.dropdown',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    NAV_ITEM: '.nav-item'
  },

  // DOM IDs
  IDS: {
    LAST_COMMIT: 'last-commit'
  },

  // CSS class names
  CLASSES: {
    ACTIVE: 'active',
    NAV: 'nav',
    BUTTON: 'button',
    TEXT_BUTTON: 'text-button',
    DROPDOWN: 'dropdown',
    DROPDOWN_TOGGLE: 'dropdown-toggle',
    DROPDOWN_MENU: 'dropdown-menu',
    DROPDOWN_ITEM: 'dropdown-item',
    LOGO: 'logo',
    NAV_LEFT: 'nav-left',
    NAV_RIGHT: 'nav-right'
  },

  // GitHub API configuration
  GITHUB_API: {
    REPO: 'fiski/portfolio',
    BASE_URL: 'https://api.github.com/repos/fiski/portfolio',
    ENDPOINTS: {
      COMMITS: '/commits',
      COMMITS_MAIN: '/commits/main'
    },
    HEADERS: {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Mozilla/5.0'
    }
  },

  // Event names
  EVENTS: {
    DOM_CONTENT_LOADED: 'DOMContentLoaded',
    CLICK: 'click',
    KEYDOWN: 'keydown',
    LOAD: 'load'
  },

  // Keyboard keys
  KEYS: {
    ESCAPE: 'Escape'
  },

  // Text strings
  TEXT: {
    LAST_UPDATED_PREFIX: 'Last updated: ',
    LAST_UPDATED_ERROR: 'Unable to fetch',
    LAST_UPDATED_GITHUB: 'Check GitHub for latest changes',
    ERROR_HTTP: 'HTTP error! status: ',
    ERROR_RATE_LIMIT: 'GitHub API rate limit exceeded',
    ERROR_NO_DATA: 'No commit data available',
    ERROR_INVALID_FORMAT: 'Invalid response format'
  },

  // Asset paths
  ASSETS: {
    LOGO: 'assets/images/Maximilian-relam-wide.svg',
    CV_ENGLISH: 'assets/images/maximilian-relam-wide-CV-english.pdf',
    CV_SWEDISH: 'assets/images/maximilian-relam-wide-CV-swedish.pdf'
  },

  // Component paths
  COMPONENTS: {
    FOOTER: 'components/footer.html'
  },

  // CDN URLs
  CDN: {
    FEATHER_ICONS: 'https://unpkg.com/feather-icons/dist/feather.min.js'
  },

  // Locale settings
  LOCALE: {
    SWEDISH: 'sv-SE',
    ENGLISH: 'en-US',
    TIMEZONE_STOCKHOLM: 'Europe/Stockholm'
  },

  // Carousel configuration
  CAROUSEL: {
    SELECTORS: {
      CONTAINER: '.client-logo-list',
      TRACK: '.client-logo-track'
    },
    CLASSES: {
      DRAGGING: 'is-dragging',
      PAUSED: 'is-paused'
    },
    // Logo count (original set, duplicated for seamless loop)
    LOGO_COUNT: 8,
    // Dimensions per breakpoint (matches CSS)
    DIMENSIONS: {
      DESKTOP: { logoWidth: 185, padding: 64 },   // 4rem = 64px
      TABLET: { logoWidth: 185, padding: 32 },    // 2rem = 32px
      MOBILE: { logoWidth: 140, padding: 24 }     // 1.5rem = 24px
    },
    BREAKPOINTS: {
      TABLET: 768,
      MOBILE: 463
    },
    // Physics settings
    MOMENTUM: {
      FRICTION: 0.92,
      MIN_VELOCITY: 0.5,
      VELOCITY_SCALE: 0.3
    },
    // Timing
    RESUME_DELAY: 2000,           // ms before resuming CSS animation
    MIN_DRAG_DISTANCE: 5          // px threshold to start drag
  }
};
