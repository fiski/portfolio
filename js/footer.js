document.addEventListener('DOMContentLoaded', function() {
    // Load footer HTML
    fetch('components/footer.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            
            // After footer is loaded, fetch last commit info
            fetch('https://api.github.com/repos/fiski/portfolio/commits', {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Mozilla/5.0' // Add User-Agent header to avoid 403
                }
            })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        throw new Error('GitHub API rate limit exceeded');
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data[0]) {
                    const lastCommit = data[0];
                    const date = new Date(lastCommit.commit.author.date);
                    const formattedDate = date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                        timeZoneName: 'short',
                        day: 'numeric'
                    });
                    document.getElementById('last-commit').textContent = `Last updated: ${formattedDate}`;
                } else {
                    throw new Error('No commit data available');
                }
            })
            .catch(error => {
                console.error('Error fetching commit info:', error);
                // Use a more user-friendly message
                document.getElementById('last-commit').textContent = 'Last updated: Check GitHub for latest changes';
            });
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}); 