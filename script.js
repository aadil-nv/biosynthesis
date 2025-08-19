const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');
        const overlay = document.getElementById('overlay');
        const body = document.body;

        // Active menu item functionality
        function setActiveMenuItem(clickedLink) {
            // Remove aria-current from all nav links
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.removeAttribute('aria-current');
            });
            
            // Set aria-current on clicked link
            clickedLink.setAttribute('aria-current', 'page');
        }

        // Toggle mobile menu
        function toggleMenu() {
            const isOpen = navMenu.classList.contains('active');
            
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        // Open mobile menu
        function openMenu() {
            mobileToggle.classList.add('active');
            navMenu.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
            mobileToggle.setAttribute('aria-expanded', 'true');
            overlay.setAttribute('aria-hidden', 'false');
            
            // Focus first menu item for accessibility
            const firstMenuItem = navMenu.querySelector('a');
            if (firstMenuItem) {
                setTimeout(() => firstMenuItem.focus(), 300);
            }
        }

        // Close mobile menu
        function closeMenu() {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
            mobileToggle.setAttribute('aria-expanded', 'false');
            overlay.setAttribute('aria-hidden', 'true');
        }

        // Event listeners
        mobileToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', closeMenu);

        // Handle navigation link clicks
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                // Set active state for clicked nav item
                setActiveMenuItem(e.target);
                
                // Close mobile menu if open
                closeMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
                mobileToggle.focus();
            }
        });

        // Handle resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Enhanced smooth scrolling with active state management
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                // Set active state
                if (this.closest('.nav-menu')) {
                    setActiveMenuItem(this);
                }
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Optional: Set active menu item based on scroll position
        // This will automatically highlight the menu item based on which section is currently visible
        function updateActiveMenuOnScroll() {
            const sections = document.querySelectorAll('section[id], main[id], div[id]');
            const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
            
            let current = '';
            const scrollPosition = window.scrollY + 100; // Offset for better detection
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.removeAttribute('aria-current');
                if (link.getAttribute('href') === `#${current}`) {
                    link.setAttribute('aria-current', 'page');
                }
            });
        }