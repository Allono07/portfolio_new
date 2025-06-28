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
                { label: 'View Project', url: 'https://github.com/allenThomsonNetcore/music-player-sonno' }
            ]
        },
        {
            title: 'Attendance Tracking Mobile Application - Composable',
            description: 'Attendance tracking app that generates QR codes for students and fetches real-time attendance records from the backend. Technologies: Jetpack Compose (Mobile), Spring Boot Kotlin (Backend)',
            links: [
                { label: 'View Project', url: 'https://github.com/Allono07/attendance_composable' }
            ]
        },
        {
            title: 'Corpcon Backend Application',
            description: `Written and maintained the backend for Corpcon WebApplication.
· Technologies: Kafka for event synchronization, Git, Docker, Kotlin, Spring Boot, Deployed on Google Cloud`,
            links: [
                { label: 'View Project', url: 'https://corpcon.in/' }
            ]
        },
        {
            title: 'Food Delivery App - Flutter',
            description: 'Delivery app built on Flutter. Firebase Auth SDK (User Authentication), Firestore SDK (Backend/DB). Design: MVVM Architecture.',
            links: [
                { label: 'View Project', url: 'https://github.com/Allono07/restaurant_app_flutter' }
            ]
        },
        {
            title: 'Automatic Billing Machine - IoT',
            description: 'Billing machine using image recognition and ML for item billing. Hardware: Raspberry Pi 3b+, Load Cell 5Kg, HX711-Load Cell amplifier, Webcam.',
            links: [
                { label: 'View Project', url: 'https://github.com/Allono07/autobillproject' }
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
                    if (link.disabled && link.label === 'Play Store') {
                        const btn = document.createElement('a');
                        btn.className = 'disabled-link';
                        btn.textContent = link.label;
                        btn.href = 'javascript:void(0)';
                        btn.title = 'Will be available soon';
                        btn.addEventListener('click', e => {
                            e.preventDefault();
                            alert('Play Store link is not live yet. You can download the app from Google Drive.');
                            window.open('https://drive.google.com/file/d/1JFeMZl858jQ0tmwd5FtX6w6s2IqZxTiW/view?usp=drive_link', '_blank');
                        });
                        card.appendChild(btn);
                    } else if (link.disabled) {
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

    // --- AI Resume Analysis Logic ---
    const resumeForm = document.getElementById('resume-form');
    const resumeFileInput = document.getElementById('resume-file');
    const resumeResultDiv = document.getElementById('resume-analysis-result');

    // --- Resume Analysis Nudge Feature ---
    const resumeAnalysisNudge = () => {
        const resumeNavLink = document.querySelector('a[href="#resume-analysis"]');
        if (!resumeNavLink) return;

        // Create nudge tooltip
        const nudgeTooltip = document.createElement('div');
        nudgeTooltip.id = 'resume-nudge-tooltip';
        nudgeTooltip.innerHTML = `
            <div class="nudge-content">
                <span class="nudge-text">🤖 Try our<br>AI Resume Analysis!</span>
                <button class="nudge-close" aria-label="Close nudge">×</button>
            </div>
            <div class="nudge-arrow"></div>
        `;
        nudgeTooltip.style.cssText = `
            position: absolute;
            background: linear-gradient(135deg, #64b5f6, #38d39f);
            color: #232136;
            padding: ${window.innerWidth <= 900 ? '0.6rem 0.8rem' : '0.8rem 1rem'};
            border-radius: 8px;
            font-weight: 600;
            font-size: ${window.innerWidth <= 900 ? '0.8rem' : '0.9rem'};
            box-shadow: 0 4px 20px rgba(100,181,246,0.3);
            z-index: 10000;
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 0.3s, transform 0.3s;
            pointer-events: none;
        `;

        // Style the nudge content
        const nudgeContent = nudgeTooltip.querySelector('.nudge-content');
        nudgeContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;

        const nudgeClose = nudgeTooltip.querySelector('.nudge-close');
        nudgeClose.style.cssText = `
            background: none;
            border: none;
            color: #232136;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            margin-left: 0.5rem;
            font-weight: bold;
        `;

        const nudgeArrow = nudgeTooltip.querySelector('.nudge-arrow');
        const isMobile = window.innerWidth <= 900;
        
        if (isMobile) {
            // Arrow pointing right on mobile (towards hamburger)
            nudgeArrow.style.cssText = `
                position: absolute;
                right: -8px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
                border-left: 8px solid #38d39f;
            `;
        } else {
            // Arrow pointing up on desktop (towards Resume Analysis tab)
            nudgeArrow.style.cssText = `
                position: absolute;
                top: -8px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-bottom: 8px solid #38d39f;
            `;
        }

        // Add to navigation container instead of body
        const nav = document.querySelector('nav');
        if (nav) {
            nav.appendChild(nudgeTooltip);
        } else {
            document.body.appendChild(nudgeTooltip);
        }

        // Position the tooltip
        const positionTooltip = () => {
            const isMobile = window.innerWidth <= 900;
            
            if (isMobile) {
                // On mobile, position relative to hamburger button
                const hamburger = document.getElementById('hamburger');
                const hamburgerRect = hamburger ? hamburger.getBoundingClientRect() : null;
                const navRect = nav ? nav.getBoundingClientRect() : { left: 0, top: 0 };
                
                if (hamburgerRect) {
                    const tooltipWidth = 140;
                    const tooltipHeight = 70;
                    
                    // Position to the left of hamburger button with more space
                    let tooltipLeft = hamburgerRect.left - navRect.left - tooltipWidth - 40;
                    let tooltipTop = hamburgerRect.top - navRect.top + hamburgerRect.height/2 - tooltipHeight/2;
                    
                    // Ensure it doesn't go off-screen
                    tooltipLeft = Math.max(10, tooltipLeft);
                    tooltipTop = Math.max(10, Math.min(tooltipTop, window.innerHeight - tooltipHeight - 10));
                    
                    nudgeTooltip.style.left = `${tooltipLeft}px`;
                    nudgeTooltip.style.top = `${tooltipTop}px`;
                }
            } else {
                // Desktop positioning - relative to Resume Analysis tab
                const rect = resumeNavLink.getBoundingClientRect();
                const navRect = nav ? nav.getBoundingClientRect() : { left: 0, top: 0 };
                const tooltipWidth = 160;
                const tooltipHeight = 80;
                
                let tooltipLeft = rect.left - navRect.left + rect.width/2 - tooltipWidth/2;
                let tooltipTop = rect.bottom - navRect.top + 15;
                
                const maxLeft = window.innerWidth - tooltipWidth - 40;
                tooltipLeft = Math.max(20, Math.min(tooltipLeft, maxLeft));
                
                const maxTop = window.innerHeight - tooltipHeight - 20;
                if (tooltipTop > maxTop) {
                    tooltipTop = rect.top - navRect.top - tooltipHeight - 15;
                }
                tooltipTop = Math.max(20, tooltipTop);
                
                nudgeTooltip.style.left = `${tooltipLeft}px`;
                nudgeTooltip.style.top = `${tooltipTop}px`;
            }
        };

        positionTooltip();

        // Show with animation
        setTimeout(() => {
            nudgeTooltip.style.opacity = '1';
            nudgeTooltip.style.transform = 'translateY(0)';
            nudgeTooltip.style.pointerEvents = 'auto';
        }, 100);

        // Close functionality
        const closeNudge = () => {
            nudgeTooltip.style.opacity = '0';
            nudgeTooltip.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (nudgeTooltip.parentNode) {
                    nudgeTooltip.parentNode.removeChild(nudgeTooltip);
                }
            }, 300);
        };

        nudgeClose.addEventListener('click', closeNudge);
        nudgeTooltip.addEventListener('click', (e) => {
            if (e.target === nudgeTooltip) closeNudge();
        });

        // Auto-close after 8 seconds
        setTimeout(closeNudge, 8000);

        // Reposition on window resize and scroll
        window.addEventListener('resize', positionTooltip);
        window.addEventListener('scroll', positionTooltip);
    };

    // Show nudge after 7 seconds, but check if tab is visible first
    setTimeout(() => {
        const resumeNavLink = document.querySelector('a[href="#resume-analysis"]');
        if (resumeNavLink) {
            const rect = resumeNavLink.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
            
            if (!isVisible) {
                // Scroll to the navigation area first
                resumeNavLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(resumeAnalysisNudge, 1000);
            } else {
                resumeAnalysisNudge();
            }
        }
    }, 7000);

    if (resumeForm && resumeFileInput && resumeResultDiv) {
        resumeForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            resumeResultDiv.textContent = 'Extracting text from PDF...';
            const file = resumeFileInput.files[0];
            if (!file || file.type !== 'application/pdf') {
                resumeResultDiv.textContent = 'Please upload a PDF file.';
                return;
            }
            try {
                if (!window.pdfjsLib) {
                    resumeResultDiv.textContent = 'PDF.js library failed to load. Please check your internet connection or try again later.';
                    return;
                }
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

                // Read PDF as ArrayBuffer
                const arrayBuffer = await file.arrayBuffer();
                // Load PDF with pdf.js
                const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let fullText = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    const pageText = content.items.map(item => item.str).join(' ');
                    fullText += pageText + '\n';
                }
                resumeResultDiv.textContent = 'Analyzing resume with AI...';
                // Call Hugging Face Router API for DeepSeek model (replace YOUR_HF_TOKEN with your actual token)
                const hfToken = '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'; // <-- Replace this!
                const deepseekPrompt = `Analyze this resume and extract key skills, experience summary, and suggest improvements.\n\nResume:\n${fullText}`;
                const deepseekResponse = await fetch('https://router.huggingface.co/fireworks-ai/inference/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${hfToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        messages: [
                            { role: 'user', content: deepseekPrompt }
                        ],
                        model: 'accounts/fireworks/models/deepseek-r1',
                        stream: false
                    })
                });
                if (!deepseekResponse.ok) throw new Error('DeepSeek API error');
                const deepseekData = await deepseekResponse.json();
                // Parse the response for the answer
                let aiText = 'No analysis returned.';
                if (deepseekData.choices && deepseekData.choices[0]?.message?.content) {
                    aiText = deepseekData.choices[0].message.content;
                } else if (deepseekData.error) {
                    aiText = 'Error: ' + deepseekData.error;
                }
                resumeResultDiv.innerHTML = `<strong>AI Analysis:</strong><br><pre style="white-space: pre-wrap;">${aiText}</pre>`;
            } catch (err) {
                resumeResultDiv.textContent = 'Error: ' + err.message;
            }
        });
    }
});
 