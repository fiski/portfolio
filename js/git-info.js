function getLastCommitDate() {
    // Using the Git command to get the last commit date
    fetch('https://api.github.com/repos/MaxRelam/portfolio/commits/main')
        .then(response => response.json())
        .then(data => {
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
            document.getElementById('last-commit').textContent = `Last updated: ${formattedDate}`;
        })
        .catch(error => {
            console.error('Error fetching commit date:', error);
            document.getElementById('last-commit').textContent = 'Last updated: Unable to fetch';
        });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', getLastCommitDate); 