document.addEventListener('DOMContentLoaded', function() {
    // Load footer HTML
    fetch('components/footer.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            
            // After footer is loaded, fetch last commit info
            fetch('https://api.github.com/repos/fiski/portfolio/commits', {
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
                document.getElementById('last-commit').textContent = 'Last updated: Unable to fetch';
            });
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}); 