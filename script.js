    // Loading Screen
        window.addEventListener('load', function() {
            const loadingOverlay = document.getElementById('loadingOverlay');
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
            }, 200);
        });

        // Mobile Menu Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');

        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Header Scroll Effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth Scroll for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });

// Form Submission (Formspree Integration)
        const quoteForm = document.getElementById('quoteForm');
        quoteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data for validation
            const formData = new FormData(this);
            const name = formData.get('name');
            const company = formData.get('company');
            const email = formData.get('email');
            const phone = formData.get('phone');
            
            // Basic validation
            if (!name || !company || !email || !phone) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i> Enviando...';
            submitBtn.disabled = true;
            
            try {
                // Send data to Formspree via AJAX
                const response = await fetch('https://formspree.io/f/xzzvkgon', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    alert('Sua solicitação foi enviada com sucesso! Entraremos em contato em breve.');
                    this.reset(); // Clear form
                } else {
                    throw new Error('Erro no envio');
                }
                
            } catch (error) {
                // Error
                alert('Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente ou entre em contato diretamente conosco.');
                console.error('Form submission error:', error);
                
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll');
                }
            });
        }, observerOptions);

        // Observe service cards and other elements
        document.querySelectorAll('.service-card, .stat-item, .about-text').forEach(el => {
            observer.observe(el);
        });

        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
             // Limitar a 11 dígitos
            if (value.length > 11) {
                value = value.substring(0, 11);
            } else if (value.length >= 11) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length == 10) {
                value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 7) {
                value = value.replace(/^(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            }
            e.target.value = value;
        });

        // Email validation
        const emailInput = document.getElementById('email');
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            } else {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });