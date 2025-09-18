// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 CV de Joël Djoum chargé avec succès !');
    
    // Initialiser toutes les fonctionnalités
    initSmoothScrolling();
    initHeaderScroll();
    initMobileMenu();
    initSkillBars();
    initContactForm();
    initAnimations();
    
    console.log('✅ Toutes les fonctionnalités initialisées');
});

// ============================================
// NAVIGATION SMOOTH SCROLLING
// ============================================
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Fermer le menu mobile si ouvert
                const navMenu = document.getElementById('nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                // Scroll vers la section avec offset pour le header fixe
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log(`📍 Navigation vers ${targetId}`);
            }
        });
    });
    
    console.log('✅ Smooth scrolling initialisé');
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Ajouter classe 'scrolled' après 50px de scroll
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Cacher/montrer le header selon la direction du scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    console.log('✅ Header scroll effect initialisé');
}

// ============================================
// MENU MOBILE HAMBURGER
// ============================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animation hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            
            console.log('📱 Menu mobile togglé');
        });
        
        // Fermer le menu si on clique ailleurs
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                
                // Reset hamburger animation
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    console.log('✅ Menu mobile initialisé');
}

// ============================================
// ANIMATION DES BARRES DE COMPÉTENCES
// ============================================
function initSkillBars() {
    // Observer pour détecter quand la section skills est visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                
                progressBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    
                    // Animer avec un délai pour chaque barre
                    setTimeout(() => {
                        bar.style.width = width;
                        console.log(`📊 Barre de compétence animée: ${width}`);
                    }, index * 200);
                });
                
                // Ne pas observer à nouveau
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5, // Déclencher quand 50% de la section est visible
        rootMargin: '0px 0px -100px 0px' // Déclencher un peu avant
    });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
        console.log('✅ Animation des compétences initialisée');
    }
}

// ============================================
// FORMULAIRE DE CONTACT
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Validation simple
            if (!validateForm(data)) {
                return;
            }
            
            // Simulation d'envoi (remplacer par vraie logique d'envoi)
            handleFormSubmission(data);
        });
    }
    
    console.log('✅ Formulaire de contact initialisé');
}

// Validation du formulaire
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Email invalide');
    }
    
    if (!data.subject || data.subject.trim().length < 5) {
        errors.push('Le sujet doit contenir au moins 5 caractères');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères');
    }
    
    if (errors.length > 0) {
        showNotification('Erreurs dans le formulaire:\n' + errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

// Vérifier si l'email est valide
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Gérer la soumission du formulaire
function handleFormSubmission(data) {
    // Désactiver le bouton de soumission
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    
    // Simulation d'une requête (remplacer par vraie API)
    setTimeout(() => {
        console.log('📧 Message envoyé:', data);
        
        // Reset du formulaire
        document.getElementById('contactForm').reset();
        
        // Restaurer le bouton
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Notification de succès
        showNotification('Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
    }, 2000);
}

// ============================================
// SYSTÈME DE NOTIFICATIONS
// ============================================
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Ajouter les styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Auto-suppression après 5 secondes
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    console.log(`📢 Notification ${type}: ${message}`);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-triangle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#06d6a0',
        error: '#ef476f',
        info: '#667eea',
        warning: '#f77f00'
    };
    return colors[type] || colors.info;
}

// ============================================
// ANIMATIONS AU SCROLL
// ============================================
function initAnimations() {
    // Observer pour les animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Éléments à animer
    const animatedElements = document.querySelectorAll('.project-card, .stat-item, .skill-category, .contact-item');
    
    animatedElements.forEach((el, index) => {
        // Style initial
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(el);
    });
    
    console.log('✅ Animations au scroll initialisées');
}

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

// Fonction pour débugger les éléments
function debugElements() {
    console.log('🔍 Debug des éléments:');
    console.log('Header:', document.querySelector('.header'));
    console.log('Nav Menu:', document.getElementById('nav-menu'));
    console.log('Hamburger:', document.getElementById('hamburger'));
    console.log('Contact Form:', document.getElementById('contactForm'));
    console.log('Skills Section:', document.querySelector('.skills'));
    console.log('Skill Bars:', document.querySelectorAll('.skill-progress'));
}

// Fonction pour tester toutes les fonctionnalités
function testAllFeatures() {
    console.log('🧪 Test de toutes les fonctionnalités:');
    
    // Test notification
    setTimeout(() => showNotification('Test notification info', 'info'), 1000);
    setTimeout(() => showNotification('Test notification succès', 'success'), 2000);
    setTimeout(() => showNotification('Test notification erreur', 'error'), 3000);
    
    // Debug elements
    setTimeout(debugElements, 4000);
}

// Exposer les fonctions globalement pour le debug
window.cvApp = {
    debugElements,
    testAllFeatures,
    showNotification
};

// ============================================
// ÉVÉNEMENTS GLOBAUX
// ============================================

// Gestion des erreurs JavaScript
window.addEventListener('error', function(e) {
    console.error('❌ Erreur JavaScript:', e.error);
    showNotification('Une erreur est survenue. Veuillez actualiser la page.', 'error');
});

// Log de performance
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Page chargée en ${loadTime.toFixed(2)}ms`);
});

// Gestion du redimensionnement
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('📱 Fenêtre redimensionnée:', window.innerWidth + 'x' + window.innerHeight);
    }, 250);
});

console.log('🎯 Script CV Joël Djoum v1.0 - Prêt pour l\'emploi !');