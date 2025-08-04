// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Preview Modal
function openPreview(imageSrc) {
    const modal = document.getElementById('previewModal');
    const previewImage = document.getElementById('previewImage');
    previewImage.src = imageSrc;
    modal.style.display = 'block';
}

// Close modal
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('previewModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Create WhatsApp message
    const whatsappMessage = `مرحباً، أريد طلب خدمة كتابة السيرة الذاتية
    
الاسم: ${name}
البريد الإلكتروني: ${email}
رقم الهاتف: ${phone}
الخدمة المطلوبة: ${getServiceName(service)}
${message ? `تفاصيل إضافية: ${message}` : ''}`;
    
    const whatsappUrl = `https://wa.me/201234567890?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    this.reset();
    alert('تم إرسال طلبك بنجاح! سيتم تحويلك إلى الواتساب.');
});

function getServiceName(serviceValue) {
    const services = {
        'cv-only': 'CV فقط',
        'cover-letter-only': 'Cover Letter فقط',
        'complete-package': 'الباقة الكاملة',
        'translation': 'ترجمة CV'
    };
    return services[serviceValue] || serviceValue;
}

// Language Toggle
const langToggle = document.getElementById('langToggle');
const body = document.body;

// English translations
const translations = {
    en: {
        // Navigation
        'الرئيسية': 'Home',
        'عن الخدمة': 'About',
        'أعمالنا': 'Portfolio',
        'الأسعار': 'Pricing',
        'التقييمات': 'Reviews',
        'الأسئلة الشائعة': 'FAQ',
        'اتصل بنا': 'Contact',
        
        // Hero Section
        'خدمة كتابة السيرة الذاتية والـ Cover Letter باحتراف': 'Professional CV & Cover Letter Writing Service',
        'احصل على سيرة ذاتية تنقلك للمقابلة من أول مرة': 'Get a CV that lands you the interview on the first try',
        'تسليم خلال 24 ساعة': 'Delivery within 24 hours',
        'تصميم احترافي': 'Professional design',
        'أسعار رمزية': 'Affordable prices',
        'اطلب الخدمة الآن': 'Order Service Now',
        
        // About Section
        'لماذا تختارنا؟': 'Why Choose Us?',
        'استخدام الذكاء الاصطناعي': 'AI-Powered',
        'نستخدم أحدث تقنيات الذكاء الاصطناعي لضمان كتابة سيرة ذاتية متميزة ومطابقة لمعايير السوق العالمية': 'We use the latest AI technologies to ensure exceptional CV writing that meets global market standards',
        'تسليم سريع': 'Fast Delivery',
        'نضمن تسليم سيرتك الذاتية خلال 24 ساعة كحد أقصى مع إمكانية التسليم العاجل في نفس اليوم': 'We guarantee delivery of your CV within 24 hours maximum with same-day express delivery available',
        'خبرة واسعة': 'Extensive Experience',
        'فريق من الخبراء المتخصصين في كتابة السير الذاتية لجميع المجالات والتخصصات المختلفة': 'A team of experts specialized in CV writing for all different fields and specializations',
        'أسعار رمزية': 'Affordable Prices',
        'أسعار تنافسية ومناسبة للجميع مع ضمان الجودة العالية والخدمة المتميزة': 'Competitive and affordable prices for everyone with guaranteed high quality and excellent service'
    }
};

langToggle.addEventListener('click', function() {
    if (body.classList.contains('en')) {
        // Switch to Arabic
        body.classList.remove('en');
        body.setAttribute('dir', 'rtl');
        body.setAttribute('lang', 'ar');
        langToggle.textContent = 'EN';
        
        // Restore Arabic text (reload page for simplicity)
        location.reload();
    } else {
        // Switch to English
        body.classList.add('en');
        body.setAttribute('dir', 'ltr');
        body.setAttribute('lang', 'en');
        langToggle.textContent = 'AR';
        
        // Apply English translations
        applyTranslations();
    }
});

function applyTranslations() {
    // This is a simplified translation function
    // In a real application, you would use a proper i18n library
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations.en[key]) {
            element.textContent = translations.en[key];
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .portfolio-card, .pricing-card, .review-card').forEach(el => {
    observer.observe(el);
});

// Pricing button clicks
document.querySelectorAll('.pricing-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.pricing-card');
        const service = card.querySelector('h3').textContent;
        
        const whatsappMessage = `مرحباً، أريد طلب خدمة: ${service}`;
        const whatsappUrl = `https://wa.me/201234567890?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
    });
});

// Download buttons (placeholder functionality)
document.querySelectorAll('.download-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        alert('لتحميل النماذج، يرجى التواصل معنا عبر الواتساب');
    });
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Add mobile menu styles if screen is small
if (window.innerWidth <= 768) {
    const navbar = document.querySelector('.navbar .container');
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.className = 'mobile-menu-btn';
    menuButton.onclick = toggleMobileMenu;
    navbar.appendChild(menuButton);
}

// Scroll to top functionality
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
        if (!document.querySelector('.scroll-to-top')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.className = 'scroll-to-top';
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
            document.body.appendChild(scrollBtn);
        }
    } else {
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn) {
            scrollBtn.remove();
        }
    }
});

// Add scroll to top button styles
const scrollTopStyles = `
.scroll-to-top {
    position: fixed;
    bottom: 90px;
    left: 20px;
    background: var(--primary-color);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    z-index: 999;
    transition: all 0.3s ease;
}

.scroll-to-top:hover {
    background: var(--secondary-color);
    transform: translateY(-2px);
}

body.en .scroll-to-top {
    right: 20px;
    left: auto;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = scrollTopStyles;
document.head.appendChild(styleSheet);

