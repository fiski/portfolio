function createNavigation(currentPage) {
    const nav = document.createElement('div');
    nav.className = 'top_nav';
    nav.innerHTML = `
        <div class="left">
            <h1><a href="index.html" class="button name-link ${currentPage === 'index' ? 'active' : ''}">Maximilian Relam Wide</a></h1>
        </div>

        <div class="right">
            <a href="work.html" class="button text-button ${currentPage === 'work' ? 'active' : ''}">Work</a>
            <a href="about.html" class="button text-button ${currentPage === 'about' ? 'active' : ''}">About</a>
            <a href="contact.html" class="button text-button ${currentPage === 'contact' ? 'active' : ''}">Contact</a>
        </div>
    `;
    return nav;
}

// Function to initialize navigation
function initNavigation(currentPage) {
    const body = document.body;
    const nav = createNavigation(currentPage);
    body.insertBefore(nav, body.firstChild);
} 