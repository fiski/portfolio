/**
 * Loads footer component and fetches latest GitHub commit information
 * Displays formatted commit date in Swedish locale (CET timezone)
 * Handles API errors gracefully with fallback messages
 */
document.addEventListener(CONFIG.EVENTS.DOM_CONTENT_LOADED, function() {
    // Load footer HTML
    fetch(CONFIG.COMPONENTS.FOOTER)
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            
            // After footer is loaded, fetch last commit info
            fetch(CONFIG.GITHUB_API.BASE_URL + CONFIG.GITHUB_API.ENDPOINTS.COMMITS, {
                headers: CONFIG.GITHUB_API.HEADERS
            })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        throw new Error(CONFIG.TEXT.ERROR_RATE_LIMIT);
                    }
                    throw new Error(`${CONFIG.TEXT.ERROR_HTTP}${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data[0]) {
                    const lastCommit = data[0];
                    const date = new Date(lastCommit.commit.author.date);
                    const formattedDate = date.toLocaleDateString(CONFIG.LOCALE.SWEDISH, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                        timeZone: CONFIG.LOCALE.TIMEZONE_STOCKHOLM
                    });
                    document.getElementById(CONFIG.IDS.LAST_COMMIT).textContent = `${CONFIG.TEXT.LAST_UPDATED_PREFIX}${formattedDate} CET`;
                } else {
                    throw new Error(CONFIG.TEXT.ERROR_NO_DATA);
                }
            })
            .catch(error => {
                console.error('Error fetching commit info:', error);
                // Use a more user-friendly message
                document.getElementById(CONFIG.IDS.LAST_COMMIT).textContent = `${CONFIG.TEXT.LAST_UPDATED_PREFIX}${CONFIG.TEXT.LAST_UPDATED_GITHUB}`;
            });
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}); 