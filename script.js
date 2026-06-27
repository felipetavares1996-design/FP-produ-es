document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Header Scroll Effect
       ========================================================================== */
    const header = document.querySelector('.main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check


    /* ==========================================================================
       2. Mobile Menu Toggle
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-cta');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : 'initial';
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.style.overflow = 'initial';
            });
        });
    }


    /* ==========================================================================
       3. Gallery Slider / Carousel
       ========================================================================== */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const dots = document.querySelectorAll('.gallery-dots .dot');
    const prevBtn = document.getElementById('prev-gallery-btn');
    const nextBtn = document.getElementById('next-gallery-btn');
    let currentIndex = 0;
    let slideInterval;
    
    const showSlide = (index) => {
        if (galleryItems.length === 0) return;
        
        // Handle boundary indexes
        if (index >= galleryItems.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = galleryItems.length - 1;
        } else {
            currentIndex = index;
        }
        
        // Update elements
        galleryItems.forEach((item, idx) => {
            if (idx === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };
    
    const nextSlide = () => {
        showSlide(currentIndex + 1);
    };
    
    const prevSlide = () => {
        showSlide(currentIndex - 1);
    };
    
    // Auto-slide setup
    const startAutoSlide = () => {
        stopAutoSlide();
        slideInterval = setInterval(nextSlide, 5000);
    };
    
    const stopAutoSlide = () => {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    };
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide(); // Reset interval
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide(); // Reset interval
        });
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const idx = parseInt(e.target.getAttribute('data-index'));
            showSlide(idx);
            startAutoSlide(); // Reset interval
        });
    });
    
    // Pause auto slide on hover
    const galleryContainer = document.querySelector('.gallery-slider-container');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', stopAutoSlide);
        galleryContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Initial slide start
    showSlide(currentIndex);
    startAutoSlide();


    /* ==========================================================================
       4. Technical Trust Accordion
       ========================================================================== */
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const headerBtn = item.querySelector('.accordion-header');
        
        if (headerBtn) {
            headerBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                accordionItems.forEach(accItem => {
                    accItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });


    /* ==========================================================================
       5. Interactive Quote Form (WhatsApp Redirection)
       ========================================================================== */
    const quoteForm = document.getElementById('quote-generator-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Gather input values
            const eventType = document.getElementById('event-type').value;
            const pianoModel = document.getElementById('piano-model').value;
            const eventDate = document.getElementById('event-date').value || 'A definir';
            const eventLocation = document.getElementById('event-location').value || 'A definir';
            
            const musicianRadio = document.querySelector('input[name="musician"]:checked');
            const musicianOption = musicianRadio ? musicianRadio.value : 'Apenas a locação';
            
            // Construct the WhatsApp message
            const phoneNumber = '5511964324323'; // Client's actual WhatsApp number
            
            const baseMessage = 
`Olá, Black White! Gostaria de solicitar um orçamento para locação de piano:

🎹 *Informações do Evento:*
- *Tipo de Evento:* ${eventType}
- *Modelo do Piano:* ${pianoModel}
- *Data do Evento:* ${eventDate}
- *Local do Evento:* ${eventLocation}
- *Necessidade de Pianista:* ${musicianOption}

Fico no aguardo do orçamento. Obrigado!`;

            const encodedMessage = encodeURIComponent(baseMessage);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // Redirect to WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    }


    /* ==========================================================================
       6. Intersection Observer Scroll Animations
       ========================================================================== */
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    if ('IntersectionObserver' in window && animatedElements.length > 0) {
        const observerOptions = {
            root: null, // Viewport
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the element is visible
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay');
                    if (delay) {
                        setTimeout(() => {
                            entry.target.classList.add('animated');
                        }, delay * 200); // 200ms multiplier per delay unit
                    } else {
                        entry.target.classList.add('animated');
                    }
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(el => {
            // Add initial class base (e.g. fade-in-up if not already specified)
            if (!el.classList.contains('fade-in-up') && 
                !el.classList.contains('fade-in-left') && 
                !el.classList.contains('fade-in-right')) {
                el.classList.add('fade-in-up');
            }
            observer.observe(el);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(el => el.classList.add('animated'));
    }

});
