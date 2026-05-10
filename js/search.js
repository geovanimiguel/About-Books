// ================================================================
//  LEITURA VIVA — Pesquisa
//  Ficheiro: js/search.js
//
//  Depende de:
//    data/livros.js  → window.LeituraViva
//    js/main.js      → addToCart, animateButton
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

    if (!window.LeituraViva) {
        console.error('LeituraViva: data/livros.js não carregou.');
        return;
    }

    // ── ELEMENTOS ───────────────────────────────────────────────
    const input       = document.getElementById('search-input');
    const clearBtn    = document.getElementById('search-clear');
    const statusEl    = document.getElementById('search-status');
    const grid        = document.getElementById('results-grid');
    const idleEl      = document.getElementById('search-idle');
    const emptyEl     = document.getElementById('search-empty');
    const emptyQuery  = document.getElementById('empty-query');
    const tags        = document.querySelectorAll('.search-tag');

    // ── ESTADO ──────────────────────────────────────────────────
    let debounceTimer = null;
    let queryActual   = '';

    // ── BADGES ──────────────────────────────────────────────────
    const BADGES = {
        popular  : '🔥 Popular',
        novo     : '🆕 Novo',
        esgotado : 'Esgotado',
    };


    // ────────────────────────────────────────────────────────────
    //  INPUT — debounce 280ms
    // ────────────────────────────────────────────────────────────

    input?.addEventListener('input', () => {
        const q = input.value.trim();

        // Mostra / esconde botão de limpar
        clearBtn?.toggleAttribute('hidden', q.length === 0);

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => pesquisar(q), 280);
    });

    // Limpar
    clearBtn?.addEventListener('click', () => {
        if (input) input.value = '';
        clearBtn.setAttribute('hidden', '');
        input?.focus();
        mostrarIdle();
    });

    // Tecla Escape limpa
    input?.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            clearBtn?.click();
        }
    });

    // Tags rápidas
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            const q = tag.dataset.query || '';
            if (input) input.value = q;
            clearBtn?.removeAttribute('hidden');
            pesquisar(q);
            input?.focus();
        });
    });

    // Foco automático ao abrir a página
    setTimeout(() => input?.focus(), 300);


    // ────────────────────────────────────────────────────────────
    //  PESQUISA PRINCIPAL
    // ────────────────────────────────────────────────────────────

    function pesquisar(query) {
        queryActual = query;

        if (!query) {
            mostrarIdle();
            return;
        }

        // Pesquisa em título, autor, categoria e descrição
        const q       = query.toLowerCase();
        const livros  = window.LeituraViva.getTodos();

        const resultado = livros.filter(l =>
            l.titulo.toLowerCase().includes(q)     ||
            l.autor.toLowerCase().includes(q)      ||
            l.categoria.toLowerCase().includes(q)  ||
            (l.descricao || '').toLowerCase().includes(q)
        );

        if (!resultado.length) {
            mostrarVazio(query);
            return;
        }

        mostrarResultados(resultado, query);
    }


    // ────────────────────────────────────────────────────────────
    //  ESTADOS
    // ────────────────────────────────────────────────────────────

    function mostrarIdle() {
        grid.innerHTML = '';
        idleEl?.removeAttribute('hidden');
        emptyEl?.setAttribute('hidden', '');
        if (statusEl) statusEl.innerHTML = '';
    }

    function mostrarVazio(query) {
        grid.innerHTML = '';
        idleEl?.setAttribute('hidden', '');
        emptyEl?.removeAttribute('hidden');
        if (emptyQuery) emptyQuery.textContent = query;
        if (statusEl)   statusEl.innerHTML     = '';
    }

    function mostrarResultados(lista, query) {
        idleEl?.setAttribute('hidden', '');
        emptyEl?.setAttribute('hidden', '');

        // Contador
        if (statusEl) {
            statusEl.innerHTML = lista.length === 1
                ? `<strong>1</strong> resultado para "<em>${query}</em>"`
                : `<strong>${lista.length}</strong> resultados para "<em>${query}</em>"`;
        }

        grid.innerHTML = lista.map((livro, i) => criarCardHTML(livro, query, i)).join('');
    }


    // ────────────────────────────────────────────────────────────
    //  CRIAR HTML DO CARD COM HIGHLIGHT
    // ────────────────────────────────────────────────────────────

    function criarCardHTML(livro, query, index) {
        const esgotado  = livro.estado === 'esgotado';
        const badge     = BADGES[livro.estado] || '';
        const desconto  = livro.precoOld > livro.preco
            ? Math.round((1 - livro.preco / livro.precoOld) * 100)
            : 0;

        // Highlight do termo pesquisado no título e autor
        const titulo = highlight(livro.titulo, query);
        const autor  = highlight(livro.autor,  query);

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
                     role="listitem"
                     style="animation-delay:${index * 0.04}s">

                <div class="book-media">
                    ${badge ? `<span class="badge">${badge}</span>` : ''}
                    <div class="image-box">
                        <img src="${livro.imagem}"
                             alt="Capa do livro ${livro.titulo}"
                             loading="lazy">
                    </div>
                </div>

                <div class="card-info">
                    <h3 class="book-title">${titulo}</h3>
                    <p class="book-author">${autor}</p>

                    <div class="price-box">
                        <div class="price-group">
                            ${livro.precoOld > livro.preco
                                ? `<span class="price-old">${livro.precoOld.toLocaleString('pt-AO')} Kz</span>`
                                : ''}
                            <span class="price">${livro.preco.toLocaleString('pt-AO')} Kz</span>
                        </div>
                        ${desconto ? `<span class="discount-tag">-${desconto}%</span>` : ''}
                    </div>

                    ${botaoHTML}
                </div>

            </article>
        `;
    }

    // Envolve o termo pesquisado em <mark> para realce visual
    function highlight(texto, query) {
        if (!query) return texto;
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return texto.replace(regex, '<mark class="search-highlight">$1</mark>');
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }


    // ────────────────────────────────────────────────────────────
    //  EVENTOS DO GRID — carrinho e avisar
    // ────────────────────────────────────────────────────────────

    grid?.addEventListener('click', e => {
        const addBtn    = e.target.closest('.add-to-cart');
        const notifyBtn = e.target.closest('.notify-btn');

        if (addBtn) {
            e.stopPropagation();

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
            e.stopPropagation();

            const nome    = notifyBtn.dataset.name || 'este livro';
            const phone   = '244930793980';
            const message = encodeURIComponent(`Olá! Gostaria de saber quando "${nome}" estiver disponível.`);
            const orig    = notifyBtn.innerHTML;

            notifyBtn.textContent         = 'Abrindo WhatsApp...';
            notifyBtn.style.pointerEvents = 'none';
            notifyBtn.style.opacity       = '0.8';

            setTimeout(() => {
                window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
                notifyBtn.innerHTML           = orig;
                notifyBtn.style.pointerEvents = 'auto';
                notifyBtn.style.opacity       = '1';
            }, 500);
        }
    });

    // ── INIT ────────────────────────────────────────────────────

    // Lê query da URL (?q=algo) — útil para links externos
    const params = new URLSearchParams(window.location.search);
    const qUrl   = params.get('q');

    if (qUrl) {
        if (input) input.value = qUrl;
        clearBtn?.removeAttribute('hidden');
        pesquisar(qUrl);
    } else {
        mostrarIdle();
    }

});