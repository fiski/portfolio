/**
 * Loads the footer component and shows when the site was last updated.
 *
 * Uses document.lastModified: GitHub Pages serves the deploy time as the
 * Last-Modified header, so no GitHub API call (and no rate limit) is needed.
 */
(function() {
    /**
     * Formats a date in Swedish locale, Stockholm time (CET/CEST)
     * @param {Date} date - Date to format
     * @returns {string} Formatted date, e.g. "27 nov. 2026 10:20 CET"
     */
    function formatDate(date) {
        return date.toLocaleString(CONFIG.LOCALE.SWEDISH, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: CONFIG.LOCALE.TIMEZONE_STOCKHOLM,
            timeZoneName: 'short'
        });
    }

    /**
     * Returns the page's Last-Modified date, or null if the server didn't send one
     * (browsers then report the current time instead)
     * @returns {Date|null} Last modified date
     */
    function getLastModified() {
        const date = new Date(document.lastModified);
        const age = Date.now() - date.getTime();
        if (isNaN(age) || age < CONFIG.FOOTER.LAST_MODIFIED_MIN_AGE_MS) {
            return null;
        }
        return date;
    }

    /**
     * Writes the "Last updated" text into the footer
     */
    function renderLastUpdated() {
        const element = document.getElementById(CONFIG.IDS.LAST_COMMIT);
        if (!element) return;
        const date = getLastModified();
        const value = date ? formatDate(date) : CONFIG.TEXT.LAST_UPDATED_FALLBACK;
        element.textContent = `${CONFIG.TEXT.LAST_UPDATED_PREFIX}${value}`;
    }

    document.addEventListener(CONFIG.EVENTS.DOM_CONTENT_LOADED, function() {
        fetch(CONFIG.COMPONENTS.FOOTER)
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                renderLastUpdated();
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    });
})();
