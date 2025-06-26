// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase and Analytics using CDN scripts
    const firebaseConfig = {
        apiKey: "AIzaSyD0v66rpnRlf5s_TO2CxBEBPSt2CJwx2vg",
        authDomain: "portfolio-website-c899e.firebaseapp.com",
        projectId: "portfolio-website-c899e",
        storageBucket: "portfolio-website-c899e.firebasestorage.app",
        messagingSenderId: "955465981238",
        appId: "1:955465981238:web:48be745bc5c5da4107e797",
        measurementId: "G-EL2LSGW7SV"
      };
    if (window.firebase && firebase.initializeApp && firebase.analytics) {
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }

    // Hide loader overlay
    const loaderOverlay = document.getElementById('loader-overlay');
    if (loaderOverlay) {
        loaderOverlay.classList.add('hidden');
        setTimeout(() => loaderOverlay.style.display = 'none', 600);
    }

    // const firebaseConfig = {
    //     apiKey: "x2vg",
    //     authDomain: "portp.com",
    //     projectId: "portfsite-c899e",
    //     storageBucket: "portebasestorage.app",
    //     messagingSenderId: "955465981238",
    //     appId: "1:955465981238:w7SV"
    //   };
    // const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
    // Splash screen logic
    const splash = document.getElementById('splash-screen');
    const progressBar = document.getElementById('splash-progressbar');
    const mainContent = document.getElementById('main-content');
    if (splash) {
        // Fade in
        splash.classList.add('show');
        setTimeout(() => {
            if (progressBar) progressBar.style.width = '100%';
        }, 50); // allow DOM to apply .show first
        // Show main content when progress bar is halfway (1s)
        setTimeout(() => {
            if (mainContent) mainContent.style.display = '';
        }, 1000);
        // Hide splash after 2s
        setTimeout(() => {
            splash.classList.remove('show');
            splash.classList.add('hide');
            setTimeout(() => {
                splash.style.display = 'none';
            }, 700);
        }, 2000);
    } else {
        if (mainContent) mainContent.style.display = '';
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
    const typingText = 'Application and Backend Developer';
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
    if (homeNav) {
        homeNav.addEventListener('click', () => {
            clearTimeout(typingTimeout);
            setTimeout(typeTitle, 500);
        });
    }

    // Projects grid (edit projects in code only)
    const projects = [
        {
            title: 'Sonno Music Player',
            description: 'Music player where you can set a timer or schedule for the music to stop playing automatically. Built on Expo, uses React Native Track Player for music control and notifications.',
            links: [
                { label: 'Play Store', url: '', disabled: true },
                { label: 'View Project', url: 'https://github.com/yourusername/sonno-music-player' }
            ]
        },
        {
            title: 'Attendance Tracking Mobile Application - Composable',
            description: 'Attendance tracking app that generates QR codes for students and fetches real-time attendance records from the backend. Technologies: Jetpack Compose (Mobile), Spring Boot Kotlin (Backend)',
            links: [
                { label: 'View Project', url: 'https://github.com/yourusername/attendance-tracking-app' }
            ]
        },
        {
            title: 'Corpcon Backend Application',
            description: `Written and maintained the backend for Corpcon WebApplication.
· Technologies: Kafka for event synchronization, Git, Docker, Kotlin, Spring Boot, Deployed on Google Cloud`,
            links: [
                { label: 'View Project', url: 'https://github.com/yourusername/corpcon-backend' }
            ]
        },
        {
            title: 'Food Delivery App - Flutter',
            description: 'Delivery app built on Flutter. Firebase Auth SDK (User Authentication), Firestore SDK (Backend/DB). Design: MVVM Architecture.',
            links: [
                { label: 'View Project', url: 'https://github.com/yourusername/food-delivery-flutter' }
            ]
        },
        {
            title: 'Automatic Billing Machine - IoT',
            description: 'Billing machine using image recognition and ML for item billing. Hardware: Raspberry Pi 3b+, Load Cell 5Kg, HX711-Load Cell amplifier, Webcam.',
            links: [
                { label: 'View Project', url: 'https://github.com/yourusername/automatic-billing-machine' }
            ]
        }
    ];
    function renderProjectsGrid() {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        grid.innerHTML = '';
        projects.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `<h3>${proj.title}</h3><p>${proj.description.replace(/\n/g, '<br>')}</p>`;
            if (proj.links) {
                proj.links.forEach(link => {
                    if (link.disabled) {
                        const btn = document.createElement('a');
                        btn.className = 'disabled-link';
                        btn.textContent = link.label;
                        btn.href = 'javascript:void(0)';
                        btn.title = 'Will be available soon';
                        btn.addEventListener('click', e => {
                            e.preventDefault();
                            alert('Play Store link will be available soon!');
                        });
                        card.appendChild(btn);
                    } else {
                        const a = document.createElement('a');
                        a.href = link.url;
                        a.target = '_blank';
                        a.textContent = link.label;
                        card.appendChild(a);
                    }
                });
            }
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
    if (modeToggle) {
        modeToggle.addEventListener('click', function() {
            const isLight = document.body.classList.contains('light-mode');
            setMode(isLight ? 'dark' : 'light');
        });
    }

    // Show loader on contact form submit
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            const loaderOverlay = document.getElementById('loader-overlay');
            if (loaderOverlay) {
                loaderOverlay.style.display = 'flex';
                loaderOverlay.classList.remove('hidden');
            }
        });
    }
});
 