    // Loading Screen
    window.addEventListener('load', function() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 150);
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

    // Form Submission with EmailJS
    const quoteForm = document.getElementById('quoteForm');
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            company: formData.get('company'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            origin: formData.get('origin') || 'Não informado',
            product: formData.get('product') || 'Não informado',
            message: formData.get('message') || 'Não informado'
        };
        
        // Basic validation
        if (!data.name || !data.company || !data.email || !data.phone) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Send email via EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            to_email: 'thiago@arthashipping.com.br',
            from_name: data.name,
            from_email: data.email,
            company: data.company,
            phone: data.phone,
            origin: data.origin,
            product: data.product,
            message: data.message,
            subject: 'Nova Solicitação de Cotação - Artha Shipping'
        })
        .then(function(response) {
            alert('Obrigado! Sua solicitação foi enviada com sucesso. Retornaremos em até 24 horas.');
            quoteForm.reset();
        })
        .catch(function(error) {
            alert('Erro ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp.');
            console.error('EmailJS Error:', error);
        })
        .finally(function() {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
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
        if (value.length >= 11) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
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

    // Google Analytics (replace with your tracking ID)
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_TRACKING_ID');