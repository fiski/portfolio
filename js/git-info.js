/**
 * Fetches and displays the last commit date from GitHub API
 * Formats the date in US locale and updates the DOM element with id 'last-commit'
 * Handles API errors and displays debug information in console
 */
function getLastCommitDate() {
    // Using the Git command to get the last commit date
    fetch('https://api.github.com/repos/fiski/portfolio/commits/main', {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('GitHub API response:', data); // Debug log
            if (!data.commit || !data.commit.author || !data.commit.author.date) {
                throw new Error('Invalid response format');
            }
            const commitDate = new Date(data.commit.author.date);
            const formattedDate = commitDate.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZoneName: 'short'
            });
            const commitElement = document.getElementById('last-commit');
            if (commitElement) {
                commitElement.textContent = `Last updated: ${formattedDate}`;
            } else {
                console.error('Element with id "last-commit" not found');
            }
        })
        .catch(error => {
            console.error('Error fetching commit date:', error);
            const commitElement = document.getElementById('last-commit');
            if (commitElement) {
                commitElement.textContent = 'Last updated: Unable to fetch';
            }
        });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', getLastCommitDate); 