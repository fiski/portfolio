function createNavigation(currentPage) {
    const nav = document.createElement('nav');
    nav.className = 'nav';
    nav.innerHTML = `
        <div class="nav-left">
            <a href="index.html" class="button text-button ${currentPage === 'index' ? 'active' : ''}">
                <img src="assets/images/Maximilian-relam-wide.svg" alt="Maximilian Relam Wide" class="logo">
            </a>
            <!-- Old text version
            <a href="index.html" class="button text-button ${currentPage === 'index' ? 'active' : ''}">Maximilian Relam Wide</a>
            -->
        </div>
        <div class="nav-right">
            <a href="work.html" class="button text-button ${currentPage === 'work' ? 'active' : ''}">Work</a>
            <a href="extensions.html" class="button text-button ${currentPage === 'extensions' ? 'active' : ''}">Extensions</a>
            <a href="about.html" class="button text-button ${currentPage === 'about' ? 'active' : ''}">About</a>
            <div class="dropdown">
                <button class="button text-button dropdown-toggle ${currentPage === 'resume' ? 'active' : ''}" type="button">
                    Resume
                    <i class="feather-16" data-feather="chevron-down"></i>
                    
                </button>
                <div class="dropdown-menu">
                    <a href="assets/images/maximilian-relam-wide-CV-english.pdf" class="dropdown-item" target="_blank">English</a>
                    <a href="assets/images/Maximilian-Relam-Wide-CV-svenska.pdf" class="dropdown-item" target="_blank">Swedish</a>
                </div>
            </div>
        </div>
    `;
    return nav;
}

// Function to initialize navigation
function initNavigation(currentPage) {
    const body = document.body;
    console.log("initNavigation körs med sidan:", currentPage); // Debug
    
    // Create and insert navigation
    const nav = createNavigation(currentPage);
    body.insertBefore(nav, body.firstChild);

    // Remove all existing background classes
    body.classList.remove('index-bg', 'work-bg', 'about-bg', 'contact-bg', 'extensions-bg');

    // Add the appropriate background class based on the current page
    switch (currentPage) {
        case 'index':
            body.classList.add('index-bg');
            break;
        case 'work':
            body.classList.add('work-bg');
            break;
        case 'about':
            body.classList.add('about-bg');
            break;
        case 'extensions':
            body.classList.add('extensions-bg');
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
            if (href === 'index.html' && currentPage === 'index') {
                item.classList.add('active');
            } else if (href === 'work.html' && currentPage === 'work') {
                item.classList.add('active');
            } else if (href === 'extensions.html' && currentPage === 'extensions') {
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
    
    // Initialize dropdown functionality
    initDropdown();
    
    // Initialize feather icons for the newly created navigation
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Function to initialize dropdown functionality
function initDropdown() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Close dropdowns when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

