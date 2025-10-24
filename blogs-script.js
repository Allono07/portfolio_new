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

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinksUl = document.querySelector('.nav-links');
    const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
    const navLinks = document.querySelectorAll('.nav-link');

    function openMobileNav() {
        navLinksUl.classList.add('open');
        if (mobileBackdrop) mobileBackdrop.classList.add('active');
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
            if (!navLinksUl.contains(e.target) && !hamburger.contains(e.target) && !mobileBackdrop.contains(e.target)) {
                closeMobileNav();
            }
        }
    });

    // Close menu if clicking the backdrop
    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                e.stopPropagation();
                closeMobileNav();
            }
        });
    }

    // Handle nav link clicks - close menu and navigate properly
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if link is external (index.html or index.html#anchor, or paths like /index or /)
            if (href.includes('.html') || (href && !href.startsWith('#'))) {
                // Prevent default, close menu, add fade-out, then navigate
                e.preventDefault();
                if (window.innerWidth <= 900) {
                    closeMobileNav();
                }
                const mainContent = document.getElementById('main-content');
                mainContent.classList.add('transitioning');
                setTimeout(() => {
                    window.location.href = href;
                }, 350);
                return;
            }
            
            // For anchor-only links (shouldn't happen on blogs page but handle anyway)
            e.preventDefault();
            if (window.innerWidth <= 900) {
                closeMobileNav();
            }
        });
    });

    // --- Decorative background shapes generator ---
    try {
        function generateBgShapes(count = 12) {
            const container = document.getElementById('bg-anim');
            if (!container) return;
            container.innerHTML = '';
            const colors = ['#64b5f6', '#38d39f', '#ffe066', '#ff7b7b', '#b39ddb', '#ffffff'];
            for (let i = 0; i < count; i++) {
                const el = document.createElement('span');
                el.className = 'bg-shape';

                // Bigger sizes for more presence
                const size = Math.round(Math.random() * 280) + 80; // 80 - 360px (increased)
                const left = (Math.random() * 110 - 5).toFixed(2) + '%';
                const top = (100 + Math.random() * 30).toFixed(2) + '%';
                const dur = (Math.random() * 20 + 12).toFixed(2) + 's';
                const delay = (Math.random() * -24).toFixed(2) + 's';
                const color = colors[Math.floor(Math.random() * colors.length)];
                const blur = Math.round(4 + Math.random() * 10) + 'px'; // 4 - 14px (less blur for more visibility)
                const opa = (Math.random() * 0.28 + 0.16).toFixed(2); // 0.16 - 0.44 (increased opacity)
                const rot = Math.round(Math.random() * 360) + 'deg';
                const round = Math.random() > 0.5 ? '50%' : (Math.random() > 0.5 ? '12%' : '0%');
                const drift = Math.round((Math.random() - 0.5) * 140) + 'px';

                el.style.width = size + 'px';
                el.style.height = size + 'px';
                el.style.left = left;
                el.style.top = top;
                el.style.setProperty('--size', size + 'px');
                el.style.setProperty('--left', left);
                el.style.setProperty('--top', top);
                el.style.setProperty('--dur', dur);
                el.style.setProperty('--delay', delay);
                el.style.setProperty('--color', color);
                el.style.setProperty('--blur', blur);
                el.style.setProperty('--opa', opa);
                el.style.setProperty('--rot', rot);
                el.style.setProperty('--round', round);
                el.style.setProperty('--drift', drift);
                el.style.opacity = opa;
                el.style.filter = 'blur(' + blur + ')';
                el.style.borderRadius = round;
                el.style.animationDuration = dur;
                el.style.animationDelay = delay;

                container.appendChild(el);
            }
        }

        const chooseCount = () => {
            if (window.innerWidth > 1400) return 32;
            if (window.innerWidth > 1000) return 24;
            if (window.innerWidth > 700) return 18;
            return 12;
        };

        generateBgShapes(chooseCount());

        let _bgResizeTimer = null;
        window.addEventListener('resize', function() {
            clearTimeout(_bgResizeTimer);
            _bgResizeTimer = setTimeout(() => {
                generateBgShapes(chooseCount());
            }, 300);
        });

        // --- Blog expand/collapse functionality ---
        const blogReadMoreLinks = document.querySelectorAll('.blog-read-more');
        blogReadMoreLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const blogCard = this.closest('.blog-card');
                const blogContent = blogCard.querySelector('.blog-content');
                
                if (blogContent) {
                    const isCollapsed = blogContent.classList.contains('collapsed');
                    if (isCollapsed) {
                        blogContent.classList.remove('collapsed');
                        this.textContent = 'Read Less ↑';
                        this.style.color = '#38d39f';
                    } else {
                        blogContent.classList.add('collapsed');
                        this.textContent = 'Read More →';
                        this.style.color = '#64b5f6';
                    }
                }
            });
        });
    } catch (err) {
        console.warn('Background shapes failed to initialize:', err);
    }
});
