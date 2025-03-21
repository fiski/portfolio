function createNavigation(currentPage) {
    const nav = document.createElement('nav');
    nav.className = 'nav';
    nav.innerHTML = `
        <div class="nav-left">
            <a href="home.html" class="button text-button ${currentPage === 'home' ? 'active' : ''}">Maximilian Relam Wide</a>
        </div>
        <div class="nav-right">
            <a href="work.html" class="button text-button ${currentPage === 'work' ? 'active' : ''}">Work</a>
            <a href="about.html" class="button text-button ${currentPage === 'about' ? 'active' : ''}">About</a>
            <!---  <a href="contact.html" class="button text-button ${currentPage === 'contact' ? 'active' : ''}">Contact</a> -->
        </div>
    `;
    document.body.insertBefore(nav, document.body.firstChild);
}

// Function to initialize navigation
function initNavigation(currentPage) {
    const body = document.body;
    
    // Create and insert navigation
    const nav = createNavigation(currentPage);
    body.insertBefore(nav, body.firstChild);

    // Remove all existing background classes
    body.classList.remove('home-bg', 'work-bg', 'about-bg', 'contact-bg');

    // Add the appropriate background class based on the current page
    switch (currentPage) {
        case 'home':
            body.classList.add('home-bg');
            break;
        case 'work':
            body.classList.add('work-bg');
            break;
        case 'about':
            body.classList.add('about-bg');
            break;
        case 'contact':
            body.classList.add('contact-bg');
            break;
    }



    // Update navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href === 'home.html' && currentPage === 'home') {
                item.classList.add('active');
            } else if (href === 'work.html' && currentPage === 'work') {
                item.classList.add('active');
            } else if (href === 'about.html' && currentPage === 'about') {
                item.classList.add('active');
            } else if (href === 'contact.html' && currentPage === 'contact') {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }
    });
} 