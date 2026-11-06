// ========== Navbar scroll effect ==========
var navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// ========== Mobile menu toggle ==========
var menuToggle = document.getElementById('menuToggle');
var navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
});

// close menu when a link is clicked
var navItems = navLinks.querySelectorAll('a');
for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', function () {
        navLinks.classList.remove('open');
    });
}


// ========== Back to Top button ==========
var backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ========== Scroll fade-in animations ==========
var animateSelectors = [
    '.card', '.history-card', '.place-card',
    '.food-item', '.travel-card', '.about-text',
    '.about-img', '.travel-banner'
];

animateSelectors.forEach(function (selector) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (el) {
        el.classList.add('fade-in');
    });
});

var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
});


// ========== Gallery filter ==========
var filterBtns = document.querySelectorAll('.filter-btn');
var galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-filter');

        galleryItems.forEach(function (item) {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});


// ========== Lightbox ==========
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightboxImg');
var lightboxCaption = document.getElementById('lightboxCaption');
var lightboxClose = document.getElementById('lightboxClose');

galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
        var img = item.querySelector('img');
        var caption = item.querySelector('.gallery-caption');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = caption ? caption.textContent : '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}


// ========== Smooth scroll for nav links ==========
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            var offset = navbar.offsetHeight;
            var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        }
    });
});


// ========== Image fallback handler ==========
document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
    img.addEventListener('error', function () {
        this.style.display = 'none';
        if (this.parentElement) {
            this.parentElement.style.background = '#e0dcd5';
            this.parentElement.style.display = 'flex';
            this.parentElement.style.alignItems = 'center';
            this.parentElement.style.justifyContent = 'center';
            // add a small text placeholder
            if (!this.parentElement.querySelector('.img-placeholder')) {
                var placeholder = document.createElement('span');
                placeholder.className = 'img-placeholder';
                placeholder.textContent = '📷 Image';
                placeholder.style.color = '#999';
                placeholder.style.fontSize = '0.85rem';
                this.parentElement.appendChild(placeholder);
            }
        }
    });
});
