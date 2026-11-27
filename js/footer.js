/**
 * Loads the footer component and shows when the site was last updated.
 *
 * Source order:
 *   1. Fresh cached commit date (localStorage, CONFIG.GITHUB_API.CACHE_TTL_MS)
 *   2. Latest commit date from the GitHub API (then cached)
 *   3. Stale cached commit date, if the API fails (e.g. rate limited)
 *   4. document.lastModified (GitHub Pages serves the deploy time as Last-Modified)
 *   5. Text fallback
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
     * Reads the cached commit date
     * @returns {{date: string, fetchedAt: number}|null} Cached entry or null
     */
    function readCache() {
        try {
            const cached = JSON.parse(localStorage.getItem(CONFIG.GITHUB_API.CACHE_KEY));
            return cached && cached.date ? cached : null;
        } catch (error) {
            return null;
        }
    }

    /**
     * Stores the commit date in the cache
     * @param {string} isoDate - Commit date as ISO string
     */
    function writeCache(isoDate) {
        try {
            localStorage.setItem(CONFIG.GITHUB_API.CACHE_KEY, JSON.stringify({
                date: isoDate,
                fetchedAt: Date.now()
            }));
        } catch (error) {
            // Storage unavailable (private mode etc.) - ignore
        }
    }

    /**
     * Fetches the latest commit date from the GitHub API
     * @returns {Promise<string>} Commit date as ISO string
     */
    function fetchCommitDate() {
        return fetch(CONFIG.GITHUB_API.BASE_URL + CONFIG.GITHUB_API.ENDPOINTS.COMMITS, {
            headers: CONFIG.GITHUB_API.HEADERS
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 403 || response.status === 429) {
                        throw new Error(CONFIG.TEXT.ERROR_RATE_LIMIT);
                    }
                    throw new Error(`${CONFIG.TEXT.ERROR_HTTP}${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const date = data && data[0] && data[0].commit && data[0].commit.author && data[0].commit.author.date;
                if (!date) {
                    throw new Error(CONFIG.TEXT.ERROR_NO_DATA);
                }
                return date;
            });
    }

    /**
     * Returns the page's Last-Modified date, or null if unavailable
     * @returns {Date|null} Last modified date
     */
    function getDocumentLastModified() {
        const date = new Date(document.lastModified);
        return isNaN(date.getTime()) ? null : date;
    }

    /**
     * Writes the "Last updated" text into the footer
     * @param {Date|null} date - Date to show, or null for the text fallback
     */
    function render(date) {
        const element = document.getElementById(CONFIG.IDS.LAST_COMMIT);
        if (!element) return;
        const value = date ? formatDate(date) : CONFIG.TEXT.LAST_UPDATED_GITHUB;
        element.textContent = `${CONFIG.TEXT.LAST_UPDATED_PREFIX}${value}`;
    }

    /**
     * Resolves the last-updated date and renders it
     */
    function updateLastCommit() {
        const cached = readCache();
        if (cached && Date.now() - cached.fetchedAt < CONFIG.GITHUB_API.CACHE_TTL_MS) {
            render(new Date(cached.date));
            return;
        }

        fetchCommitDate()
            .then(isoDate => {
                writeCache(isoDate);
                render(new Date(isoDate));
            })
            .catch(error => {
                console.warn('Error fetching commit info:', error.message);
                render(cached ? new Date(cached.date) : getDocumentLastModified());
            });
    }

    document.addEventListener(CONFIG.EVENTS.DOM_CONTENT_LOADED, function() {
        fetch(CONFIG.COMPONENTS.FOOTER)
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                updateLastCommit();
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    });
})();
