// ================================================================
//  LEITURA VIVA — Catálogo
//  Ficheiro: js/catalogo.js
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

    if (!window.LeituraViva) {
        console.error('LeituraViva: data/livros.js não carregou.');
        const empty = document.getElementById('catalogo-empty');
        if (empty) empty.removeAttribute('hidden');
        return;
    }

    // ── ESTADO ──────────────────────────────────────────────────
    let categoriaActiva = 'all';
    let ordenacao       = 'default';

    // ── ELEMENTOS ───────────────────────────────────────────────
    const grid           = document.getElementById('catalogo-grid');
    const filtersWrap    = document.getElementById('filters-container');
    const sortSelect     = document.getElementById('sort-select');
    const countEl        = document.getElementById('count-visivel');
    const emptyEl        = document.getElementById('catalogo-empty');
    const btnReset       = document.getElementById('btn-reset');
    const destaqueSlider = document.getElementById('destaque-slider');

    const LABELS = {
        'romance'         : '💕 Romance',
        'terror-suspense' : '🔪 Terror & Suspense',
        'filosofia'       : '🧠 Filosofia',
        'negocios'        : '💼 Negócios',
        'desenvolvimento' : '🚀 Desenvolvimento',
        'autoajuda'       : '✨ Autoajuda',
        'ficcao'          : '🌌 Ficção',
        'classicos'       : '📖 Clássicos',
        'infantil'        : '🧸 Infantil',
        'religiao'        : '✝️ Religião',
        'historia'        : '🏛️ História',
        'ciencia'         : '🔬 Ciência',
    };

    const BADGES = {
        popular    : '🔥 Popular',
        novo       : '🆕 Novo',
        esgotado   : 'Esgotado',
        disponivel : '',
    };

    // ────────────────────────────────────────────────────────────
    //  RENDER DESTAQUES
    // ────────────────────────────────────────────────────────────

    function renderDestaques() {
        if (!destaqueSlider) return;

        const destaques = window.LeituraViva.getDestaques();
        if (!destaques.length) {
            destaqueSlider.closest('.destaques') && destaqueSlider.closest('.destaques').remove();
            return;
        }

        destaqueSlider.innerHTML = destaques.map(function(livro) {
            var esgotado     = livro.estado === 'esgotado';
            var desconto     = livro.precoOld > livro.preco
                ? Math.round((1 - livro.preco / livro.precoOld) * 100) : 0;
            var tagLabel     = BADGES[livro.estado] || '';
            var tagHTML      = tagLabel
                ? '<span class="tag ' + livro.estado + '">' + tagLabel + '</span>' : '';
            var precoOldHTML = livro.precoOld > livro.preco
                ? '<span class="price-old">' + livro.precoOld.toLocaleString('pt-AO') + ' Kz</span>' : '';
            var descontoHTML = desconto ? '<span class="discount-tag">-' + desconto + '%</span>' : '';

            var botaoOverlay = esgotado
                ? '<button class="destaque-btn notify-btn" data-id="' + livro.id + '" data-name="' + livro.titulo + '">🔔 Avisar-me</button>'
                : '<button class="destaque-btn add-to-cart" data-id="' + livro.id + '" data-name="' + livro.titulo + '" data-price="' + livro.preco + '"><span>🛒 Adicionar</span></button>';

            var botaoMobile = esgotado
                ? '<button class="destaque-btn-mobile notify-btn" data-id="' + livro.id + '" data-name="' + livro.titulo + '">🔔 Avisar-me</button>'
                : '<button class="destaque-btn-mobile add-to-cart" data-id="' + livro.id + '" data-name="' + livro.titulo + '" data-price="' + livro.preco + '"><span>🛒 Adicionar</span></button>';

            return '<article class="card-destaque' + (esgotado ? ' is-out' : '') + '" role="listitem" data-categoria="' + livro.categoria + '">'
                + '<div class="img-box">'
                + tagHTML
                + '<img src="' + livro.imagem + '" alt="Capa de ' + livro.titulo + '" loading="lazy">'
                + '<div class="destaque-overlay" aria-hidden="true">' + botaoOverlay + '</div>'
                + '</div>'
                + '<div class="card-content">'
                + '<h3 class="title">' + livro.titulo + '</h3>'
                + '<p class="meta">' + livro.autor + '</p>'
                + '<div class="price-row">'
                + '<span class="price-now">' + livro.preco.toLocaleString('pt-AO') + ' Kz</span>'
                + precoOldHTML + descontoHTML
                + '</div>'
                + botaoMobile
                + '</div>'
                + '</article>';
        }).join('');

        destaqueSlider.addEventListener('click', function(e) {
            var addBtn    = e.target.closest('.add-to-cart');
            var notifyBtn = e.target.closest('.notify-btn');

            if (addBtn) {
                e.stopPropagation();
                var livro = window.LeituraViva.getPorId(addBtn.dataset.id);
                if (!livro) return;
                if (typeof addToCart === 'function') {
                    addToCart({ id: livro.id, name: livro.titulo, price: livro.preco, image: livro.imagem, quantity: 1 });
                }
                if (typeof animateButton === 'function') animateButton(addBtn);
            }

            if (notifyBtn) {
                e.stopPropagation();
                var nome    = notifyBtn.dataset.name || 'este livro';
                var message = encodeURIComponent('Olá! Gostaria de saber quando "' + nome + '" estiver disponível.');
                var orig    = notifyBtn.innerHTML;
                notifyBtn.textContent         = 'A abrir...';
                notifyBtn.style.pointerEvents = 'none';
                setTimeout(function() {
                    window.open('https://wa.me/244930793980?text=' + message, '_blank');
                    notifyBtn.innerHTML           = orig;
                    notifyBtn.style.pointerEvents = 'auto';
                }, 500);
            }
        });
    }

    // ────────────────────────────────────────────────────────────
    //  RENDER FILTROS
    // ────────────────────────────────────────────────────────────

    function renderFiltros() {
        if (!filtersWrap) return;

        var categorias = window.LeituraViva.getCategorias();

        var botoes = ['<button type="button" data-filter="all" class="active" aria-pressed="true">Todos</button>'];
        categorias.forEach(function(cat) {
            var label = LABELS[cat] || cat;
            botoes.push('<button type="button" data-filter="' + cat + '" aria-pressed="false">' + label + '</button>');
        });

        filtersWrap.innerHTML = botoes.join('');

        filtersWrap.querySelectorAll('button').forEach(function(btn) {
            btn.addEventListener('click', function() {
                filtersWrap.querySelectorAll('button').forEach(function(b) {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                categoriaActiva = btn.dataset.filter;
                renderGrid();
            });
        });
    }

    // ────────────────────────────────────────────────────────────
    //  RENDER GRID
    // ────────────────────────────────────────────────────────────

    function renderGrid() {
        if (!grid) return;

        var lista = categoriaActiva === 'all'
            ? window.LeituraViva.getTodos()
            : window.LeituraViva.getPorCategoria(categoriaActiva);

        lista = ordenar(lista.slice());

        if (countEl) countEl.textContent = lista.length;

        if (!lista.length) {
            grid.innerHTML = '';
            if (emptyEl) emptyEl.removeAttribute('hidden');
            return;
        }

        if (emptyEl) emptyEl.setAttribute('hidden', '');
        grid.innerHTML = lista.map(function(livro, i) {
            return criarCardHTML(livro, i);
        }).join('');
    }

    // ────────────────────────────────────────────────────────────
    //  CRIAR HTML DO CARD
    // ────────────────────────────────────────────────────────────

    function criarCardHTML(livro, index) {
        var esgotado     = livro.estado === 'esgotado';
        var badgeText    = BADGES[livro.estado] || '';
        var desconto     = livro.precoOld > livro.preco
            ? Math.round((1 - livro.preco / livro.precoOld) * 100) : 0;
        var badgeHTML    = badgeText ? '<span class="badge">' + badgeText + '</span>' : '';
        var precoOldHTML = livro.precoOld > livro.preco
            ? '<span class="price-old">' + livro.precoOld.toLocaleString('pt-AO') + ' Kz</span>' : '';
        var descontoHTML = desconto ? '<span class="discount-tag">-' + desconto + '%</span>' : '';

        var botaoHTML = esgotado
            ? '<button class="notify-btn" data-id="' + livro.id + '" data-name="' + livro.titulo + '" aria-label="Ser avisado quando ' + livro.titulo + ' estiver disponível">🔔 Avisar-me</button>'
            : '<button class="add-to-cart" data-id="' + livro.id + '" data-name="' + livro.titulo + '" data-price="' + livro.preco + '" aria-label="Adicionar ' + livro.titulo + ' ao carrinho"><span>🛒 Adicionar</span></button>';

        return '<article class="book-card' + (esgotado ? ' is-out' : '') + '" data-category="' + livro.categoria + '" role="listitem" style="animation-delay:' + (index * 0.04) + 's">'
            + '<div class="book-media">'
            + badgeHTML
            + '<div class="image-box"><img src="' + livro.imagem + '" alt="Capa do livro ' + livro.titulo + '" loading="lazy"></div>'
            + '</div>'
            + '<div class="card-info">'
            + '<h3 class="book-title">' + livro.titulo + '</h3>'
            + '<p class="book-author">' + livro.autor + '</p>'
            + '<div class="price-box"><div class="price-group">'
            + precoOldHTML
            + '<span class="price">' + livro.preco.toLocaleString('pt-AO') + ' Kz</span>'
            + '</div>' + descontoHTML + '</div>'
            + botaoHTML
            + '</div>'
            + '</article>';
    }

    // ────────────────────────────────────────────────────────────
    //  ORDENAÇÃO
    // ────────────────────────────────────────────────────────────

    function ordenar(lista) {
        var ordem = { popular: 0, novo: 1, disponivel: 2, esgotado: 3 };
        switch (ordenacao) {
            case 'preco-asc':
                return lista.sort(function(a, b) { return a.preco - b.preco; });
            case 'preco-desc':
                return lista.sort(function(a, b) { return b.preco - a.preco; });
            case 'titulo-asc':
                return lista.sort(function(a, b) { return a.titulo.localeCompare(b.titulo, 'pt'); });
            default:
                return lista.sort(function(a, b) {
                    return (ordem[a.estado] !== undefined ? ordem[a.estado] : 2)
                         - (ordem[b.estado] !== undefined ? ordem[b.estado] : 2);
                });
        }
    }

    // ────────────────────────────────────────────────────────────
    //  EVENTOS
    // ────────────────────────────────────────────────────────────

    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            ordenacao = sortSelect.value;
            renderGrid();
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', function() {
            categoriaActiva = 'all';
            ordenacao       = 'default';
            if (sortSelect) sortSelect.value = 'default';
            if (filtersWrap) {
                filtersWrap.querySelectorAll('button').forEach(function(b) {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                var allBtn = filtersWrap.querySelector('[data-filter="all"]');
                if (allBtn) allBtn.classList.add('active');
            }
            renderGrid();
        });
    }

    if (grid) {
        grid.addEventListener('click', function(e) {
            var addBtn    = e.target.closest('.add-to-cart');
            var notifyBtn = e.target.closest('.notify-btn');

            if (addBtn) {
                e.stopPropagation();
                var livro = window.LeituraViva.getPorId(addBtn.dataset.id);
                if (!livro) return;
                if (typeof addToCart === 'function') {
                    addToCart({ id: livro.id, name: livro.titulo, price: livro.preco, image: livro.imagem, quantity: 1 });
                }
                if (typeof animateButton === 'function') animateButton(addBtn);
            }

            if (notifyBtn) {
                e.stopPropagation();
                var nome    = notifyBtn.dataset.name || 'este livro';
                var phone   = '244930793980';
                var message = encodeURIComponent('Olá! Gostaria de saber quando "' + nome + '" estiver disponível.');
                var orig    = notifyBtn.innerHTML;
                notifyBtn.textContent         = 'Abrindo WhatsApp...';
                notifyBtn.style.pointerEvents = 'none';
                notifyBtn.style.opacity       = '0.8';
                setTimeout(function() {
                    window.open('https://wa.me/' + phone + '?text=' + message, '_blank');
                    notifyBtn.innerHTML           = orig;
                    notifyBtn.style.pointerEvents = 'auto';
                    notifyBtn.style.opacity       = '1';
                }, 500);
            }
        });
    }

    function lerCatDaURL() {
        var params = new URLSearchParams(window.location.search);
        var cat    = params.get('cat');
        if (cat && cat !== 'all') {
            categoriaActiva = cat;
            if (filtersWrap) {
                var btn = filtersWrap.querySelector('[data-filter="' + cat + '"]');
                if (btn) {
                    filtersWrap.querySelectorAll('button').forEach(function(b) {
                        b.classList.remove('active');
                        b.setAttribute('aria-pressed', 'false');
                    });
                    btn.classList.add('active');
                    btn.setAttribute('aria-pressed', 'true');
                }
            }
        }
    }

    // ────────────────────────────────────────────────────────────
    //  INIT
    // ────────────────────────────────────────────────────────────

    renderDestaques();
    renderFiltros();
    lerCatDaURL();
    renderGrid();

});