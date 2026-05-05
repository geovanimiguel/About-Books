// ================= ESTADO GLOBAL =================

// Carrinho
let cart = JSON.parse(localStorage.getItem('leituraViva_cart')) || [];

// Scroll control (menu)
let scrollPosition = 0;


// ================= INIT =================

document.addEventListener('DOMContentLoaded', () => {
    setupMenu();
    setupEventListeners();
    updateCartCount();
    setupHeaderScroll();
    setupNotifyButtons();
    setupReveal(); // 🔥 animação ativada
});


// ================= MENU =================

function setupMenu() {
    const hamburger = document.querySelector('.hamburger');
    const drawer = document.querySelector('.nav-drawer');
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.close-menu');

    if (!hamburger || !drawer || !overlay || !closeBtn) return;

    function openMenu() {
        scrollPosition = window.scrollY;

        drawer.classList.add('active');
        overlay.classList.add('active');
        hamburger.classList.add('active');

        hamburger.setAttribute('aria-expanded', 'true');

        document.body.classList.add('menu-open');
        document.body.style.top = `-${scrollPosition}px`;
    }

    function closeMenu() {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.classList.remove('active');

        hamburger.setAttribute('aria-expanded', 'false');

        document.body.classList.remove('menu-open');
        document.body.style.top = '';

        window.scrollTo(0, scrollPosition);
    }

    hamburger.addEventListener('click', () => {
        const isOpen = drawer.classList.contains('active');
        isOpen ? closeMenu() : openMenu();
    });

    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('active')) {
            closeMenu();
        }
    });
}


// ================= EVENTOS GLOBAIS =================

function setupEventListeners() {
    document.body.addEventListener('click', (e) => {

        const addBtn = e.target.closest('.add-to-cart');

        if (addBtn) {
            const item = {
                id: addBtn.getAttribute('data-id'),
                name: addBtn.getAttribute('data-name'),
                price: parseFloat(addBtn.getAttribute('data-price')),
                image: addBtn.closest('.book-card')?.querySelector('img')?.src || '',
                quantity: 1
            };

            addToCart(item);
            animateButton(addBtn);
        }

    });
}


// ================= CARRINHO =================

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }

    saveCart();
    updateCartCount();
}

function saveCart() {
    localStorage.setItem('leituraViva_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const counters = document.querySelectorAll('.cart-count');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    counters.forEach(counter => {
        counter.innerText = totalItems;
        counter.classList.toggle('pulse', totalItems > 0);
    });
}


// ================= ANIMAÇÃO BOTÃO =================

function animateButton(btn) {
    const span = btn.querySelector('span');
    const originalText = span ? span.innerText : btn.innerText;

    btn.classList.add('loading');

    setTimeout(() => {
        btn.classList.remove('loading');
        btn.classList.add('success');

        if (span) {
            span.innerText = "✔ Adicionado";
        } else {
            btn.innerText = "✔ Adicionado";
        }

        setTimeout(() => {
            btn.classList.remove('success');

            if (span) {
                span.innerText = originalText;
            } else {
                btn.innerText = originalText;
            }
        }, 1200);

    }, 400);
}


// ================= HEADER SCROLL =================

function setupHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll <= 0) {
            header.classList.remove('hide');
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 80) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }

        lastScroll = currentScroll;
    });
}


// ================= WHATSAPP NOTIFY =================

// Exemplo de correção
document.querySelectorAll('.notify-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const originalText = this.textContent;
        const originalHTML = this.innerHTML;
        
        // Feedback visual
        this.textContent = 'Abrindo WhatsApp...';
        this.style.pointerEvents = 'none';
        this.style.opacity = '0.8';
        
        // Abrir WhatsApp
        const phone = '244930793980';
        const message = encodeURIComponent('Olá! Gostaria de saber quando este livro estiver disponível.');
        const waLink = `https://wa.me/${phone}?text=${message}`;
        
        // Pequeno delay para o utilizador ver o feedback
        setTimeout(() => {
            window.open(waLink, '_blank');
            
            // Reset após voltar
            this.innerHTML = originalHTML;
            this.style.pointerEvents = 'auto';
            this.style.opacity = '1';
        }, 600);
    });
});


// ================= REVEAL ANIMATION =================

function setupReveal() {
    const elements = document.querySelectorAll('.book-card, .card');

    if (!elements.length) {
        console.log("Nenhum elemento encontrado para animar 👀");
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.2
    });

    elements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.05}s`; // 🔥 efeito cascata
        observer.observe(el);
    });
}

function setupSequentialReveal() {
    const container = document.querySelector('.book-concierge');

    if (!container) return;

    const items = container.querySelectorAll('.reveal-seq');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                items.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('active');
                    }, index * 400);
                });

                observer.unobserve(container);
            }

        });
    }, {
        threshold: 0.3
    });

    observer.observe(container);
}

/* INIT */
document.addEventListener('DOMContentLoaded', () => {
    setupSequentialReveal();
});

// No final do body, antes de </body>
document.querySelectorAll('.nav-desktop a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});