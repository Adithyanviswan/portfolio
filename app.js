document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav__menu--active');
            navToggle.classList.toggle('nav__toggle--active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('nav__menu--active');
                navToggle.classList.remove('nav__toggle--active');
                
                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('nav__link--active'));
                this.classList.add('nav__link--active');
            }
        });
    });

    // Update active navigation link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('nav__link--active'));
                const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('nav__link--active');
                }
            }
        });
    }

    // Navbar background on scroll
    function updateNavbarBackground() {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
    }

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarBackground();
        animateOnScroll();
    });

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.competency-card, .timeline-item, .metric-card, .award-card, .cert-category');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-in');
            }
        });
    }

    // Add hover effects to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('timeline-item--hover');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('timeline-item--hover');
        });
    });

    // Add click to expand functionality for timeline achievements
    const timelineContents = document.querySelectorAll('.timeline-content');
    timelineContents.forEach(content => {
        const achievements = content.querySelector('.timeline-achievements');
        if (achievements && achievements.children.length > 3) {
            // Hide extra items initially
            const items = Array.from(achievements.children);
            const extraItems = items.slice(3);
            
            extraItems.forEach(item => {
                item.style.display = 'none';
            });
            
            // Add expand button
            const expandBtn = document.createElement('button');
            expandBtn.className = 'btn btn--outline btn--sm expand-btn';
            expandBtn.textContent = `Show ${extraItems.length} more achievements`;
            expandBtn.style.marginTop = 'var(--space-12)';
            
            content.appendChild(expandBtn);
            
            expandBtn.addEventListener('click', function() {
                const isExpanded = this.textContent.includes('Show less');
                
                if (isExpanded) {
                    // Collapse
                    extraItems.forEach(item => {
                        item.style.display = 'none';
                    });
                    this.textContent = `Show ${extraItems.length} more achievements`;
                } else {
                    // Expand
                    extraItems.forEach(item => {
                        item.style.display = 'block';
                    });
                    this.textContent = 'Show less';
                }
            });
        }
    });

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect for hero name
    const heroName = document.querySelector('.hero__name');
    if (heroName) {
        const originalText = heroName.textContent;
        setTimeout(() => {
            typeWriter(heroName, originalText, 80);
        }, 500);
    }

    // Add progress bar animation for metrics
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        const value = card.querySelector('.metric-value');
        if (value) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add animation class when visible
                        entry.target.classList.add('animate-metric');
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(card);
        }
    });

    // Add skill tag hover effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add competency card click to expand functionality
    const competencyCards = document.querySelectorAll('.competency-card');
    competencyCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('competency-card--expanded');
        });
    });

    // Initialize scroll position
    updateActiveNavLink();
    updateNavbarBackground();
    
    // Trigger initial animation check
    setTimeout(() => {
        animateOnScroll();
    }, 100);

    // Add smooth reveal animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, observerOptions);

    // Observe all major sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add download tracking (optional)
    const downloadLinks = document.querySelectorAll('a[href*=".pdf"]');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track download event (could be sent to analytics)
            console.log('CV Download initiated');
            
            // Add visual feedback
            const originalText = this.textContent;
            this.textContent = 'Downloading...';
            
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
    });

    // Add contact form functionality (if needed)
    const contactLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add visual feedback for contact interactions
            this.style.color = 'var(--color-accent)';
            setTimeout(() => {
                this.style.color = '';
            }, 300);
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Support for keyboard navigation between sections
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            const currentSection = getCurrentSection();
            const nextSection = getNextSection(currentSection);
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            const currentSection = getCurrentSection();
            const prevSection = getPrevSection(currentSection);
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    function getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + window.innerHeight / 2;

        for (let section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                return section;
            }
        }
        return sections[0];
    }

    function getNextSection(currentSection) {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentIndex = sections.indexOf(currentSection);
        return sections[currentIndex + 1] || null;
    }

    function getPrevSection(currentSection) {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentIndex = sections.indexOf(currentSection);
        return sections[currentIndex - 1] || null;
    }

    // Performance optimization: debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll handler
    const debouncedScrollHandler = debounce(() => {
        updateActiveNavLink();
        updateNavbarBackground();
        animateOnScroll();
    }, 10);

    // Replace the original scroll event listener
    window.removeEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarBackground();
        animateOnScroll();
    });
    
    window.addEventListener('scroll', debouncedScrollHandler);
});