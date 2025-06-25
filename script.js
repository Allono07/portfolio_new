document.addEventListener('DOMContentLoaded', function() {
    // Hide loader overlay
    const loaderOverlay = document.getElementById('loader-overlay');
    if (loaderOverlay) {
        loaderOverlay.classList.add('hidden');
        setTimeout(() => loaderOverlay.style.display = 'none', 600);
    }
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinksUl = document.querySelector('.nav-links');
    const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
    const navLinks = document.querySelectorAll('.nav-link');
    // Log all nav-link elements at load
    console.log('[DEBUG] nav-link elements at load:', navLinks);
    function openMobileNav() {
        navLinksUl.classList.add('open');
        if (mobileBackdrop) mobileBackdrop.classList.add('active');
        // Log when menu is opened and nav-links are visible
        setTimeout(() => {
            const visibleLinks = document.querySelectorAll('.nav-links.open .nav-link');
            console.log('[DEBUG] Hamburger menu opened. Visible nav-links:', visibleLinks);
        }, 100);
    }
    function closeMobileNav() {
        navLinksUl.classList.remove('open');
        if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    }
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navLinksUl.classList.contains('open')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });
    // Close menu if clicking outside nav on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 900 && navLinksUl.classList.contains('open')) {
            if (!navLinksUl.contains(e.target) && !hamburger.contains(e.target)) {
                closeMobileNav();
            }
        }
    });
    // Global click logger for debugging
    document.addEventListener('click', function(e) {
        console.log('[DEBUG] Global click:', e.target, 'Class:', e.target.className);
    });
    // Close menu if clicking the backdrop
    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', function(e) {
            console.log('[DEBUG] Backdrop clicked');
            closeMobileNav();
        });
    }

    // Typing animation for the title
    const typingTitle = document.getElementById('typing-title');
    const typingText = 'Software Engineer - Mobile Application Developer & Backend Developer';
    let typingIndex = 0;
    let typingTimeout;
    function typeTitle() {
        typingTitle.classList.remove('done');
        typingIndex = 0;
        function type() {
            if (typingIndex <= typingText.length) {
                typingTitle.innerHTML = typingText.slice(0, typingIndex) + '<span class="caret">|</span>';
                typingTitle.classList.remove('done');
                typingIndex++;
                typingTimeout = setTimeout(type, 90);
            } else {
                typingTitle.textContent = typingText;
                typingTitle.classList.add('done');
                typingTimeout = setTimeout(() => {
                    typingTitle.textContent = '';
                    typingTitle.classList.remove('done');
                    typingIndex = 0;
                    setTimeout(type, 400);
                }, 2000);
            }
        }
        type();
    }
    typeTitle();
    const homeNav = document.querySelector('a[href="#home"]');
    homeNav.addEventListener('click', () => {
        clearTimeout(typingTimeout);
        setTimeout(typeTitle, 500);
    });

    // Projects grid (edit projects in code only)
    const projects = [
        {
            title: 'Mobile Banking App',
            description: 'A secure and modern mobile banking application built with Flutter and Node.js backend.\n\nFeatures:\n- Biometric authentication\n- Real-time notifications\n- Transaction history and analytics',
            link: '#',
        },
        {
            title: 'E-commerce Backend',
            description: 'Scalable backend for an e-commerce platform using Node.js, Express, and MongoDB.\n\nHighlights:\n- Product catalog management\n- Order processing\n- Payment gateway integration',
            link: '#',
        },
        {
            title: 'Chat App',
            description: 'Real-time chat application with push notifications and group chat features.\n\nTech Stack:\n- WebSockets\n- User presence\n- Media sharing',
            link: '#',
        },
        {
            title: 'Portfolio Website',
            description: 'Personal portfolio website to showcase my projects and skills.\n\nIncludes:\n- Responsive design\n- Interactive UI\n- Contact form',
            link: '#',
        },
        {
            title: 'Fitness Tracker',
            description: 'A mobile app to track workouts, nutrition, and progress.\n\nFeatures:\n- Step counter\n- Workout planner\n- Progress analytics',
            link: '#',
        },
        {
            title: 'Weather Dashboard',
            description: 'A web dashboard for real-time weather updates and forecasts.\n\nHighlights:\n- Location-based weather\n- 7-day forecast\n- Animated weather icons',
            link: '#',
        },
        {
            title: 'Task Manager',
            description: 'A productivity app for managing daily tasks and to-dos.\n\nFeatures:\n- Task lists\n- Reminders\n- Calendar integration',
            link: '#',
        },
    ];
    function renderProjectsGrid() {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        grid.innerHTML = '';
        projects.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `<h3>${proj.title}</h3><p>${proj.description.replace(/\n/g, '<br>')}</p>${proj.link ? `<a href=\"${proj.link}\" target=\"_blank\">View Project</a>` : ''}`;
            grid.appendChild(card);
        });
    }
    renderProjectsGrid();

    // Ensure smooth scroll on nav click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            console.log('[NAV] Link clicked:', href);
            // If mobile, close menu first, then scroll after a short delay
            if (window.innerWidth <= 900) {
                closeMobileNav();
                console.log('[NAV] Mobile menu closed');
                setTimeout(() => {
                    if (target) {
                        console.log('[NAV] Scrolling to:', href, 'Offset:', target.offsetTop - 60);
                        window.scrollTo({
                            top: target.offsetTop - 60,
                            behavior: 'smooth'
                        });
                    } else {
                        console.log('[NAV] Target not found for:', href);
                    }
                }, 220); // delay to allow menu to close
            } else {
                if (target) {
                    console.log('[NAV] Scrolling to:', href, 'Offset:', target.offsetTop - 60);
                    window.scrollTo({
                        top: target.offsetTop - 60,
                        behavior: 'smooth'
                    });
                } else {
                    console.log('[NAV] Target not found for:', href);
                }
            }
        });
    });

    // --- Fade-in animation for sections/cards/footer ---
    const fadeEls = [
        ...document.querySelectorAll('section, .about-banner, .projects-banner, .footer, .project-card, .skill-card, .experience-card')
    ];
    const fadeInObserver = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    fadeEls.forEach(el => fadeInObserver.observe(el));

    // Add dark/light mode toggle to social pallet
    const socialPallet = document.querySelector('.social-pallet');
    const modeToggle = document.createElement('button');
    modeToggle.id = 'mode-toggle';
    modeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    modeToggle.innerHTML = '<span class="mode-icon">🌙</span>';
    if (socialPallet) socialPallet.appendChild(modeToggle);

    function setMode(mode) {
        if (mode === 'light') {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            modeToggle.innerHTML = '<span class="mode-icon">☀️</span>';
        } else {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            modeToggle.innerHTML = '<span class="mode-icon">🌙</span>';
        }
        localStorage.setItem('theme', mode);
    }
    // On load, set mode from localStorage or default to dark
    const savedMode = localStorage.getItem('theme');
    setMode(savedMode === 'light' ? 'light' : 'dark');
    modeToggle.addEventListener('click', function() {
        const isLight = document.body.classList.contains('light-mode');
        setMode(isLight ? 'dark' : 'light');
    });
});
 