/**
 * Fetches and displays the last commit date from GitHub API
 * Formats the date in US locale and updates the DOM element with id 'last-commit'
 * Handles API errors and displays debug information in console
 */
function getLastCommitDate() {
    // Using the Git command to get the last commit date
    fetch(CONFIG.GITHUB_API.BASE_URL + CONFIG.GITHUB_API.ENDPOINTS.COMMITS_MAIN, {
        headers: {
            'Accept': CONFIG.GITHUB_API.HEADERS.Accept
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`${CONFIG.TEXT.ERROR_HTTP}${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('GitHub API response:', data); // Debug log
            if (!data.commit || !data.commit.author || !data.commit.author.date) {
                throw new Error(CONFIG.TEXT.ERROR_INVALID_FORMAT);
            }
            const commitDate = new Date(data.commit.author.date);
            const formattedDate = commitDate.toLocaleString(CONFIG.LOCALE.ENGLISH, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZoneName: 'short'
            });
            const commitElement = document.getElementById(CONFIG.IDS.LAST_COMMIT);
            if (commitElement) {
                commitElement.textContent = `${CONFIG.TEXT.LAST_UPDATED_PREFIX}${formattedDate}`;
            } else {
                console.error('Element with id "last-commit" not found');
            }
        })
        .catch(error => {
            console.error('Error fetching commit date:', error);
            const commitElement = document.getElementById(CONFIG.IDS.LAST_COMMIT);
            if (commitElement) {
                commitElement.textContent = `${CONFIG.TEXT.LAST_UPDATED_PREFIX}${CONFIG.TEXT.LAST_UPDATED_ERROR}`;
            }
        });
}

// Call the function when the page loads
document.addEventListener(CONFIG.EVENTS.DOM_CONTENT_LOADED, getLastCommitDate); 