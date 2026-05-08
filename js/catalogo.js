// ================================================================
//  LEITURA VIVA — Catálogo
//  Ficheiro: js/catalogo.js
//
//  Depende de:
//    data/livros.js  → window.LeituraViva
//    js/main.js      → addToCart, animateButton, setupNotifyButtons
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

    // Garante que o livros.js carregou
    if (!window.LeituraViva) {
        console.error('LeituraViva: data/livros.js não carregou.');
        return;
    }

    // ── ESTADO ──────────────────────────────────────────────────
    let categoriaActiva = 'all';
    let ordenacao       = 'default';

    // ── ELEMENTOS ───────────────────────────────────────────────
    const grid          = document.getElementById('catalogo-grid');
    const filtersWrap   = document.getElementById('filters-container');
    const sortSelect    = document.getElementById('sort-select');
    const countEl       = document.getElementById('count-visivel');
    const emptyEl       = document.getElementById('catalogo-empty');
    const btnReset      = document.getElementById('btn-reset');
    const destaqueSlider = document.getElementById('destaque-slider');

    // ── LABELS DAS CATEGORIAS ────────────────────────────────────
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

    // ── BADGES ──────────────────────────────────────────────────
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
            destaqueSlider.closest('.destaques')?.remove();
            return;
        }

        destaqueSlider.innerHTML = destaques.map(livro => {
            const desconto = livro.precoOld > livro.preco
                ? Math.round((1 - livro.preco / livro.precoOld) * 100)
                : 0;

            const tagLabel = BADGES[livro.estado] || '';
            const tagHTML  = tagLabel
                ? `<span class="tag ${livro.estado}" aria-label="${tagLabel}">${tagLabel}</span>`
                : '';

            const precoOldHTML = livro.precoOld > livro.preco
                ? `<span class="price-old">${livro.precoOld.toLocaleString('pt-AO')} Kz</span>`
                : '';

            return `
                <article class="card-destaque" role="listitem" data-categoria="${livro.categoria}">
                    <div class="img-box">
                        ${tagHTML}
                        <img src="${livro.imagem}"
                             alt="Capa do livro ${livro.titulo}"
                             loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3 class="title">${livro.titulo}</h3>
                        <p class="meta">${livro.autor}</p>
                        <div class="price-row">
                            <span class="price-now">${livro.preco.toLocaleString('pt-AO')} Kz</span>
                            ${precoOldHTML}
                            ${desconto ? `<span class="discount-tag">-${desconto}%</span>` : ''}
                        </div>
                    </div>
                </article>
            `;
        }).join('');
    }


    // ────────────────────────────────────────────────────────────
    //  RENDER FILTROS
    // ────────────────────────────────────────────────────────────

    function renderFiltros() {
        if (!filtersWrap) return;

        const categorias = window.LeituraViva.getCategorias();

        const botoes = [
            `<button type="button" data-filter="all" class="active" aria-pressed="true">Todos</button>`,
            ...categorias.map(cat => {
                const label = LABELS[cat] || cat;
                return `<button type="button" data-filter="${cat}" aria-pressed="false">${label}</button>`;
            })
        ];

        filtersWrap.innerHTML = botoes.join('');

        // eventos
        filtersWrap.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                filtersWrap.querySelectorAll('button').forEach(b => {
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

        // 1. Filtra
        let lista = categoriaActiva === 'all'
            ? window.LeituraViva.getTodos()
            : window.LeituraViva.getPorCategoria(categoriaActiva);

        // 2. Ordena
        lista = ordenar([...lista]);

        // 3. Actualiza contador
        if (countEl) countEl.textContent = lista.length;

        // 4. Estado vazio
        if (!lista.length) {
            grid.innerHTML = '';
            emptyEl?.removeAttribute('hidden');
            return;
        }
        emptyEl?.setAttribute('hidden', '');

        // 5. Render
        grid.innerHTML = lista.map((livro, i) => criarCardHTML(livro, i)).join('');
    }


    // ────────────────────────────────────────────────────────────
    //  CRIAR HTML DO CARD
    // ────────────────────────────────────────────────────────────

    function criarCardHTML(livro, index) {
        const esgotado  = livro.estado === 'esgotado';
        const badgeText = BADGES[livro.estado] || '';
        const desconto  = livro.precoOld > livro.preco
            ? Math.round((1 - livro.preco / livro.precoOld) * 100)
            : 0;

        const badgeHTML = badgeText
            ? `<span class="badge">${badgeText}</span>`
            : '';

        const precoOldHTML = livro.precoOld > livro.preco
            ? `<span class="price-old">${livro.precoOld.toLocaleString('pt-AO')} Kz</span>`
            : '';

        const descontoHTML = desconto
            ? `<span class="discount-tag">-${desconto}%</span>`
            : '';

        const botaoHTML = esgotado
            ? `<button class="notify-btn"
                        data-id="${livro.id}"
                        data-name="${livro.titulo}"
                        aria-label="Ser avisado quando ${livro.titulo} estiver disponível">
                   🔔 Avisar-me
               </button>`
            : `<button class="add-to-cart"
                        data-id="${livro.id}"
                        data-name="${livro.titulo}"
                        data-price="${livro.preco}"
                        aria-label="Adicionar ${livro.titulo} ao carrinho">
                   <span>🛒 Adicionar</span>
               </button>`;

        return `
            <article class="book-card${esgotado ? ' is-out' : ''}"
                     data-category="${livro.categoria}"
                     role="listitem"
                     style="animation-delay: ${index * 0.04}s">

                <div class="book-media">
                    ${badgeHTML}
                    <div class="image-box">
                        <img src="${livro.imagem}"
                             alt="Capa do livro ${livro.titulo}"
                             loading="lazy">
                    </div>
                </div>

                <div class="card-info">
                    <h3 class="book-title">${livro.titulo}</h3>
                    <p class="book-author">${livro.autor}</p>

                    <div class="price-box">
                        <div class="price-group">
                            ${precoOldHTML}
                            <span class="price">${livro.preco.toLocaleString('pt-AO')} Kz</span>
                        </div>
                        ${descontoHTML}
                    </div>

                    ${botaoHTML}
                </div>

            </article>
        `;
    }


    // ────────────────────────────────────────────────────────────
    //  ORDENAÇÃO
    // ────────────────────────────────────────────────────────────

    function ordenar(lista) {
        switch (ordenacao) {
            case 'preco-asc':
                return lista.sort((a, b) => a.preco - b.preco);
            case 'preco-desc':
                return lista.sort((a, b) => b.preco - a.preco);
            case 'titulo-asc':
                return lista.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt'));
            default:
                // Relevância: populares primeiro, depois novos, depois os outros
                const ordem = { popular: 0, novo: 1, disponivel: 2, esgotado: 3 };
                return lista.sort((a, b) => (ordem[a.estado] ?? 2) - (ordem[b.estado] ?? 2));
        }
    }


    // ────────────────────────────────────────────────────────────
    //  EVENTOS
    // ────────────────────────────────────────────────────────────

    // Ordenação
    sortSelect?.addEventListener('change', () => {
        ordenacao = sortSelect.value;
        renderGrid();
    });

    // Botão "Ver todos" no estado vazio
    btnReset?.addEventListener('click', () => {
        categoriaActiva = 'all';
        ordenacao       = 'default';

        if (sortSelect) sortSelect.value = 'default';

        filtersWrap?.querySelectorAll('button').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        filtersWrap?.querySelector('[data-filter="all"]')?.classList.add('active');

        renderGrid();
    });

    // Delegação de eventos do grid (carrinho + avisar)
    grid?.addEventListener('click', e => {
        const addBtn    = e.target.closest('.add-to-cart');
        const notifyBtn = e.target.closest('.notify-btn');

        if (addBtn) {
            const livro = window.LeituraViva.getPorId(addBtn.dataset.id);
            if (!livro) return;

            if (typeof addToCart === 'function') {
                addToCart({
                    id      : livro.id,
                    name    : livro.titulo,
                    price   : livro.preco,
                    image   : livro.imagem,
                    quantity: 1,
                });
            }

            if (typeof animateButton === 'function') {
                animateButton(addBtn);
            }
        }

        if (notifyBtn) {
            const nome    = notifyBtn.dataset.name || 'este livro';
            const phone   = '244930793980';
            const message = encodeURIComponent(`Olá! Gostaria de saber quando "${nome}" estiver disponível.`);
            const orig    = notifyBtn.innerHTML;

            notifyBtn.textContent        = 'Abrindo WhatsApp...';
            notifyBtn.style.pointerEvents = 'none';
            notifyBtn.style.opacity       = '0.8';

            setTimeout(() => {
                window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
                notifyBtn.innerHTML          = orig;
                notifyBtn.style.pointerEvents = 'auto';
                notifyBtn.style.opacity       = '1';
            }, 500);
        }
    });

    // Lê categoria da URL (ex: catalogo.html?cat=romance)
    function lerCatDaURL() {
        const params = new URLSearchParams(window.location.search);
        const cat    = params.get('cat');
        if (cat && cat !== 'all') {
            categoriaActiva = cat;
            const btn = filtersWrap?.querySelector(`[data-filter="${cat}"]`);
            if (btn) {
                filtersWrap?.querySelectorAll('button').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
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
