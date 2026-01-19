# CLAUDE.md - Portfolio Project Documentation

This file provides context and guidance for Claude Code when working with this project.

## Project Overview

**Project Name:** Portfolio Website
**Owner:** Maximilian Relam Wide
**Type:** Personal portfolio website for UX/UI designer
**Location:** Gothenburg, Sweden

### Purpose
A personal portfolio showcasing UX/UI design work, professional experience, and projects including work for Volvo, Telia, and Coop.

### Technology Stack
- **HTML5** - Semantic markup, no templating engine
- **CSS3** - Vanilla CSS with custom properties, no preprocessors
- **JavaScript** - Vanilla ES6+, no frameworks
- **Icons** - Feather Icons (v4.29.2)
- **Fonts** - Google Fonts (Nokora family)
- **Hosting** - GitHub Pages
- **Analytics** - Microsoft Clarity

### Key Characteristics
- Static SPA-style website
- No build process or compilation
- Configuration-driven architecture
- Mobile-first responsive design
- Performance-optimized animations
- GitHub API integration

## Architecture & Structure

### Directory Structure
```
portfolio/
├── index.html              # Homepage with about, experience, work sections
├── about.html              # About page
├── work.html               # Work/projects overview
├── coop.html               # Coop Insights project details
├── volvo.html              # Volvo project details
├── telia.html              # Telia project details
├── extensions.html         # Development/extensions page
├── resume.html             # Resume page
├── project-template.html   # Template for new project pages
│
├── css/                    # 2,781 lines total
│   ├── main.css           # Main stylesheet (aggregator with @imports)
│   ├── styles.css         # Core styles & layout
│   ├── typography.css     # Font styles & text hierarchy
│   ├── button.css         # Button components
│   └── reset.css          # CSS reset
│
├── js/                     # 538 lines total
│   ├── config.js          # Centralized configuration (126 lines)
│   ├── nav.js             # Navigation component logic (183 lines)
│   ├── footer.js          # Footer & GitHub commit fetching (52 lines)
│   ├── index.js           # Main page bounce animation (55 lines)
│   ├── bounce-words.js    # Word bouncing animation logic (72 lines)
│   └── git-info.js        # Alternative GitHub info fetcher (50 lines)
│
├── components/
│   └── footer.html        # Reusable footer component
│
├── assets/
│   ├── images/            # Project images, logos, client logos, SVGs
│   └── icons/             # Icon assets
│
├── package.json           # Minimal npm config (feather-icons only)
├── README.md              # Basic project info
└── CLAUDE.md              # This file
```

### Component Architecture

**Navigation (nav.js):**
- Logo with active state detection
- Multi-page routing
- Dynamic background classes per page
- Dropdown menu with keyboard support (Escape key)
- Feather Icons integration
- Responsive behavior

**Footer (footer.js):**
- Dynamic "Last updated" timestamp
- GitHub API integration (fiski/portfolio repo)
- Rate limit handling
- Credit attribution

**Animations:**
- Fade-in on page load (0.15s)
- Word bouncing with physics-based collision detection
- requestAnimationFrame for 60fps performance

### Configuration-Driven Approach

All magic strings, constants, and configuration values are centralized in `js/config.js`:
- Page identifiers and routes
- Background class mappings
- DOM selectors and CSS classes
- GitHub API configuration
- Event names and keyboard keys
- Text strings (Swedish/English)
- Asset and component paths
- CDN URLs
- Locale settings

**When adding new features:** Always add configuration values to `config.js` instead of hardcoding them.

### CSS Architecture

**main.css** acts as an aggregator using `@import`:
```css
@import 'reset.css';
@import 'typography.css';
@import 'button.css';
@import 'styles.css';
```

**Modular organization:**
- `reset.css` - Normalizes browser defaults
- `typography.css` - Font scales, text styles, headings
- `button.css` - Button variants and states
- `styles.css` - Main styling, grids, components, layouts
- `main.css` - Page-specific styles, sections, animations

## Coding Conventions & Standards

### HTML Conventions

- **Semantic HTML5:** Use appropriate semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **BEM-style naming:** Where applicable, use Block Element Modifier naming (e.g., `.card__title`, `.button--primary`)
- **Page-specific body classes:** Each page has a unique body class for styling (e.g., `<body class="homepage">`)
- **Accessibility:** Include ARIA labels where appropriate, ensure keyboard navigation works
- **Clean structure:** Proper indentation, meaningful class names, organized attributes

### CSS Conventions

- **CSS Custom Properties:** Use CSS variables for theming and reusable values
  ```css
  --color-primary: #yourcolor;
  --background-color: #yourcolor;
  ```
- **No preprocessors:** Vanilla CSS only (no Sass, Less, PostCSS)
- **Mobile-first responsive:** Default styles for mobile, enhance with media queries
- **Breakpoints:**
  - `768px` - Tablet
  - `465px` - Mobile
- **Class naming:**
  - Descriptive, lowercase with hyphens
  - Component-based where appropriate
  - Utility classes for reusable styles (`.shadow-default`, `.grid`)
- **Organization:** Group related styles together, comment section headers
- **Performance:** Avoid expensive selectors, minimize specificity wars

### JavaScript Conventions

- **Vanilla ES6+:** No frameworks (React, Vue, Angular) or libraries except Feather Icons
- **Config-driven:** All constants in `config.js`, never hardcode strings/values
- **JSDoc comments:** Document functions with parameter types and return values
  ```javascript
  /**
   * Fetches the latest commit information from GitHub
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   * @returns {Promise<Object>} Commit data
   */
  ```
- **Module pattern:** Use closures for state management and encapsulation
- **Event-driven:** Use event listeners and custom events for communication
- **Avoid global pollution:** Minimize global variables, use IIFE or modules
- **Naming conventions:**
  - `camelCase` for variables and functions
  - `UPPER_CASE` for constants
  - Descriptive names (avoid single letters except loop counters)
- **Error handling:** Handle API failures gracefully (GitHub rate limits, network errors)
- **Performance:** Use `requestAnimationFrame` for animations, debounce/throttle where needed

## Development Workflows

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fiski/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This installs `feather-icons` (the only dependency).

3. **Open in browser:**
   - Open `index.html` directly in a browser, or
   - Use a local server (e.g., Live Server extension in VS Code)

### Development

- **No build process:** Edit HTML, CSS, and JS files directly
- **Live preview:** Use browser dev tools and live reload extensions
- **Testing viewports:** Test at mobile (320px-767px), tablet (768px-1023px), and desktop (1024px+)
- **GitHub API:** Be aware of rate limits (60 requests/hour unauthenticated)
- **Icons:** Use Feather Icons library loaded from CDN
  ```javascript
  feather.replace(); // Call after adding new icons to DOM
  ```

### Deployment

- **Platform:** GitHub Pages
- **Branch:** `main` branch
- **Process:** Push to `main` triggers automatic deployment
- **URL:** https://fiski.github.io/portfolio/ (or custom domain if configured)
- **No build step:** Files are served as-is from the repository

### Testing

**Manual browser testing:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest, especially for iOS)
- Edge (latest)

**Responsive testing:**
- Use browser dev tools device emulation
- Test at breakpoints: 465px, 768px, 1024px, 1920px
- Verify navigation, dropdowns, and interactions work on mobile

**Feature testing:**
- Navigation (active states, dropdown menu, Escape key)
- Animations (fade-in, word bouncing, smooth transitions)
- GitHub API integration (last updated footer)
- Form submissions (if applicable)
- External links (CV downloads, LinkedIn, email)

**Performance:**
- Check page load times
- Verify animations run at 60fps
- Monitor console for errors
- Check network tab for failed requests

## Key Features & Components

### Navigation System (nav.js)

**Functionality:**
- Logo with active state indicator
- Multi-page routing with active page detection
- Dynamic background classes based on current page
- Dropdown menu for Resume (English/Swedish CV options)
- Keyboard navigation (Escape to close dropdown)
- Responsive behavior (hamburger menu on mobile)
- Feather Icons integration for UI icons

**Active page detection:** Checks `window.location.pathname` against `CONFIG.pages`

### Footer Component (footer.js)

**Functionality:**
- Displays "Last updated" timestamp
- Fetches latest commit date from GitHub API
- Handles rate limits gracefully (shows fallback message)
- Repository: `fiski/portfolio`
- Credit attribution

**API Integration:**
```javascript
fetch('https://api.github.com/repos/fiski/portfolio/commits?per_page=1')
```

### Animation System

**Fade-in on page load:**
- 0.15s fade-in animation
- Applied to all pages for visual polish

**Word bouncing animation (bounce-words.js):**
- Physics-based collision detection
- Smooth motion using `requestAnimationFrame`
- Performance-optimized
- Interactive and playful

**Navigation transitions:**
- Recent update added smoother page transitions
- Background color changes with page navigation

### Design System

**CSS Custom Properties:**
- Color variables: `--color-*`, `--background-color`
- Spacing: `--spacing-*` (if defined)
- Typography scales in `typography.css`

**Layout Systems:**
- Grid-based layouts (`.grid`, `.grid-homepage`)
- Flexbox for component layouts
- Responsive utilities

**Components:**
- Cards (`.card`)
- Buttons (`.button`, `.button--primary`, `.button--secondary`)
- Sections (`.section`, `.hero`, `.featured`)
- Blocks (`.block`)

**Utilities:**
- Shadows: `.shadow-default`
- Borders: `.border-radius-*` (if defined)
- Text utilities: alignment, sizes, weights

## Instructions for Claude Code

### DO

- **Maintain vanilla JavaScript approach** - No frameworks or build tools
- **Follow existing CSS patterns** - Use custom properties, match existing style
- **Use config.js** - All constants, strings, and configuration values go here
- **Add JSDoc comments** - Document new functions with types and descriptions
- **Keep responsive design** - Mobile-first approach, test at all breakpoints
- **Follow BEM-style naming** - For new CSS components
- **Use Feather Icons** - For any new icon needs (loaded from CDN)
- **Preserve animations** - Maintain existing animation patterns and performance
- **Maintain separation** - Keep HTML, CSS, and JS in separate files
- **Clean code** - Readable, well-commented, consistent with existing style
- **Descriptive commits** - Clear, concise commit messages
- **Accessibility** - Semantic HTML, keyboard support, ARIA where needed

### DON'T

- **Don't add frameworks** - No React, Vue, Angular, Svelte, etc.
- **Don't add build tools** - No Webpack, Vite, Parcel, etc.
- **Don't add preprocessors** - No Sass, Less, PostCSS, etc.
- **Don't use inline styles** - Keep all styles in CSS files
- **Don't add unnecessary dependencies** - Keep `package.json` minimal
- **Don't break mobile responsiveness** - Always test responsive behavior
- **Don't remove animations** - Consult first if changes are needed
- **Don't hardcode values** - Use `config.js` for all configuration
- **Don't mix coding styles** - Be consistent with existing patterns
- **Don't introduce security vulnerabilities** - Sanitize inputs, be careful with API data
- **Use /dev/null in Git Bash, not nul** - Windows reserved filenames cause issues

### Preferences

- **Simple over clever** - Maintainable code over clever abstractions
- **Performance-conscious** - Use `requestAnimationFrame`, optimize animations
- **Accessibility first** - Semantic HTML, keyboard support, screen reader friendly
- **Clean and readable** - Comments where logic isn't self-evident
- **Consistent patterns** - Follow established architecture and conventions
- **User experience focus** - Smooth interactions, fast load times, polish

## Project Context for AI

### About the Owner

**Name:** Maximilian Relam Wide
**Role:** UX/UI Designer
**Location:** Gothenburg, Sweden

**Professional Focus:**
- User experience design
- Visual/interface design
- Design systems
- Prototyping and user testing

**Experience:**
- **Koalitionen** (2021-2025) - Current/recent position
- **Volvo** (2023-2025) - Design work
- **Telia** (2022-2023) - Design work
- **Coop** (2021-2022) - Coop Insights project

### Design Philosophy

- **Clean, modern aesthetic** - Minimalist design with intentional details
- **Smooth animations** - Transitions and micro-interactions enhance UX
- **Mobile-responsive** - Mobile-first, works beautifully on all devices
- **Performance-conscious** - Fast load times, optimized assets
- **Accessible design** - Inclusive, works for all users

### Current State

**Active development:**
- Recent commits show ongoing improvements
- Navigation animations added for smoother transitions
- Page titles updated
- Fresh deployments to GitHub Pages

**Main pages:**
- **Home** (`index.html`) - About, experience, work showcase
- **About** (`about.html`) - Personal background
- **Work** (`work.html`) - Project portfolio
- **Projects:** Coop (`coop.html`), Volvo (`volvo.html`), Telia (`telia.html`)
- **Extensions** (`extensions.html`) - Development projects
- **Resume** (`resume.html`) - CV in English and Swedish

**Deployment:**
- GitHub Pages hosting
- Custom domain possible via CNAME
- Automatic deployment on push to `main`

**Analytics:**
- Microsoft Clarity integrated for user behavior tracking

## Common Tasks

### Adding a New Project Page

1. **Duplicate `project-template.html`** or use an existing project page as reference
2. **Update content:** title, description, images, sections
3. **Add to navigation** if needed (update `nav.js` and `CONFIG.pages`)
4. **Add to work gallery:** Update `work.html` or `index.html` work section
5. **Test responsiveness** at all breakpoints
6. **Commit and push** to deploy

### Adding a New Component

1. **Create HTML structure** following semantic HTML5
2. **Add styles** to appropriate CSS file (or create new file and import in `main.css`)
3. **Add JavaScript** if needed (create new file in `js/`, add constants to `config.js`)
4. **Use Feather Icons** for any icon needs
5. **Add JSDoc comments** for new functions
6. **Test across browsers** and viewports
7. **Verify accessibility** (keyboard nav, screen readers)

### Updating Configuration

1. **Edit `js/config.js`** - Add/update constants
2. **Use new constants** throughout code (never hardcode values)
3. **Update documentation** if adding new configuration patterns
4. **Test affected features** to ensure changes work

### Modifying Styles

1. **Identify correct CSS file** (styles.css, typography.css, button.css, etc.)
2. **Use CSS custom properties** for colors and reusable values
3. **Follow mobile-first approach** - Default styles, then media queries
4. **Test at all breakpoints** (465px, 768px, 1024px+)
5. **Check browser compatibility** if using newer CSS features
6. **Avoid inline styles** - Keep all styles in CSS files

## Technical Details

### GitHub API Integration

**Purpose:** Display last commit date in footer

**Endpoint:** `https://api.github.com/repos/fiski/portfolio/commits?per_page=1`

**Rate limits:**
- Unauthenticated: 60 requests/hour
- Authenticated: 5000 requests/hour

**Error handling:**
- Rate limit exceeded: Show fallback message
- Network errors: Fail gracefully, show default text
- Invalid response: Handle missing data

**Implementation:** See `js/footer.js`

### Animation Performance

**Best practices:**
- Use `requestAnimationFrame` for smooth 60fps animations
- Prefer CSS animations/transitions for simple effects
- Use `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left` (reflow/repaint expensive)
- Debounce scroll/resize events if adding listeners

**Current animations:**
- Fade-in: CSS-based, 0.15s on page load
- Word bouncing: JavaScript with `requestAnimationFrame`
- Navigation transitions: CSS transitions

### Responsive Breakpoints

```css
/* Mobile: 320px - 464px (default styles) */

/* Mobile large: 465px+ */
@media (min-width: 465px) {
  /* Mobile large adjustments */
}

/* Tablet: 768px+ */
@media (min-width: 768px) {
  /* Tablet and up */
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  /* Desktop styles */
}
```

**Testing:** Always test at 320px (smallest), 465px, 768px, 1024px, and 1920px

## Resources

- **Repository:** https://github.com/fiski/portfolio
- **Live site:** https://fiski.github.io/portfolio/ (or custom domain)
- **Feather Icons:** https://feathericons.com/
- **Google Fonts:** https://fonts.google.com/
- **GitHub API docs:** https://docs.github.com/en/rest

## Version History

- **2026-01-13:** CLAUDE.md created with comprehensive documentation
- **Recent updates:** Navigation animations, page title updates, force deploy tests

---

**Last updated:** 2026-01-13
**For questions or clarifications, consult the project owner.**
