// ================================================================
//  LEITURA VIVA — Carrinho
//  Ficheiro: js/carrinho.js
//
//  Depende de:
//    js/main.js       → cart, saveCart, updateCartCount, animateButton
//    data/livros.js   → window.LeituraViva (para sugestões)
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ── CUPÕES VÁLIDOS ───────────────────────────────────────────
    // Para adicionar um cupão: { CODIGO: percentagem_de_desconto }
    const CUPOES = {
        'LEITURA10' : 10,
        'ANGOLA20'  : 20,
        'BEM-VINDO' : 15,
    };

    // ── ESTADO ──────────────────────────────────────────────────
    let cupaoActivo    = null;  // { codigo, percentagem }
    let descontoValor  = 0;

    // ── ELEMENTOS ───────────────────────────────────────────────
    const listaEl       = document.getElementById('itens-lista');
    const vazioEl       = document.getElementById('carrinho-vazio');
    const acoesEl       = document.getElementById('carrinho-acoes');
    const resumoEl      = document.getElementById('carrinho-resumo');
    const sugestoesEl   = document.getElementById('carrinho-sugestoes');
    const sugestoesGrid = document.getElementById('sugestoes-grid');

    const subtotalEl    = document.getElementById('resumo-subtotal');
    const descontoEl    = document.getElementById('resumo-desconto');
    const totalEl       = document.getElementById('resumo-total');
    const descontoLinha = document.getElementById('desconto-linha');

    const cupaoInput    = document.getElementById('cupao-input');
    const btnAplicar    = document.getElementById('btn-aplicar-cupao');
    const cupaoFeedback = document.getElementById('cupao-feedback');
    const btnRemoverCup = document.getElementById('btn-remover-cupao');

    const btnWhatsApp   = document.getElementById('btn-whatsapp');
    const btnLimpar     = document.getElementById('btn-limpar');

    const nomeInput     = document.getElementById('checkout-nome');
    const telInput      = document.getElementById('checkout-telefone');
    const moradaInput   = document.getElementById('checkout-morada');
    const notaInput     = document.getElementById('checkout-nota');

    const PHONE         = '244930793980';


    // ────────────────────────────────────────────────────────────
    //  RENDER PRINCIPAL
    // ────────────────────────────────────────────────────────────

    function render() {
        const carrinho = getCart();

        if (!carrinho.length) {
            mostrarVazio();
            renderSugestoes();
            return;
        }

        mostrarCarrinho(carrinho);
        actualizarResumo(carrinho);
    }

    function mostrarVazio() {
        listaEl.innerHTML = '';
        vazioEl?.removeAttribute('hidden');
        acoesEl?.setAttribute('hidden', '');
        resumoEl?.setAttribute('hidden', '');
        sugestoesEl?.removeAttribute('hidden');
    }

    function mostrarCarrinho(carrinho) {
        vazioEl?.setAttribute('hidden', '');
        acoesEl?.removeAttribute('hidden');
        resumoEl?.removeAttribute('hidden');

        listaEl.innerHTML = carrinho.map((item, i) => criarItemHTML(item, i)).join('');
    }


    // ────────────────────────────────────────────────────────────
    //  CRIAR HTML DE UM ITEM
    // ────────────────────────────────────────────────────────────

    function criarItemHTML(item, index) {
        const totalItem = item.price * item.quantity;

        return `
            <li class="item-carrinho" data-id="${item.id}" style="animation-delay:${index * 0.06}s">

                <div class="item-img">
                    <img src="${item.image || ''}"
                         alt="Capa de ${item.name}"
                         loading="lazy">
                </div>

                <div class="item-info">
                    <p class="item-titulo">${item.name}</p>
                    <p class="item-autor">${item.price.toLocaleString('pt-AO')} Kz / unidade</p>

                    <div class="item-qty">
                        <button class="qty-btn btn-menos"
                                data-id="${item.id}"
                                aria-label="Diminuir quantidade de ${item.name}">−</button>
                        <span class="qty-num" aria-label="Quantidade: ${item.quantity}">${item.quantity}</span>
                        <button class="qty-btn btn-mais"
                                data-id="${item.id}"
                                aria-label="Aumentar quantidade de ${item.name}">+</button>
                    </div>
                </div>

                <div class="item-direita">
                    <span class="item-preco">${totalItem.toLocaleString('pt-AO')} Kz</span>
                    <button class="btn-remover-item"
                            data-id="${item.id}"
                            aria-label="Remover ${item.name} do carrinho">
                        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                    </button>
                </div>

            </li>
        `;
    }


    // ────────────────────────────────────────────────────────────
    //  ACTUALIZAR RESUMO
    // ────────────────────────────────────────────────────────────

    function actualizarResumo(carrinho) {
        const subtotal = carrinho.reduce((s, i) => s + i.price * i.quantity, 0);
        descontoValor  = cupaoActivo ? Math.round(subtotal * cupaoActivo.percentagem / 100) : 0;
        const total    = subtotal - descontoValor;

        if (subtotalEl) subtotalEl.textContent = `${subtotal.toLocaleString('pt-AO')} Kz`;
        if (totalEl)    totalEl.textContent    = `${total.toLocaleString('pt-AO')} Kz`;

        if (cupaoActivo && descontoLinha) {
            descontoLinha.removeAttribute('hidden');
            if (descontoEl) descontoEl.textContent = `- ${descontoValor.toLocaleString('pt-AO')} Kz`;
        } else {
            descontoLinha?.setAttribute('hidden', '');
        }
    }


    // ────────────────────────────────────────────────────────────
    //  EVENTOS — LISTA DE ITENS (delegação)
    // ────────────────────────────────────────────────────────────

    listaEl?.addEventListener('click', e => {
        const id        = e.target.closest('[data-id]')?.dataset.id;
        const maisBt    = e.target.closest('.btn-mais');
        const menosBt   = e.target.closest('.btn-menos');
        const removeBt  = e.target.closest('.btn-remover-item');

        if (!id) return;

        if (maisBt) {
            alterarQuantidade(id, +1);
        }

        if (menosBt) {
            alterarQuantidade(id, -1);
        }

        if (removeBt) {
            removerItem(id, e.target.closest('.item-carrinho'));
        }
    });


    // ────────────────────────────────────────────────────────────
    //  QUANTIDADE
    // ────────────────────────────────────────────────────────────

    function alterarQuantidade(id, delta) {
        const carrinho = getCart();
        const item     = carrinho.find(i => i.id === id);
        if (!item) return;

        item.quantity += delta;

        if (item.quantity <= 0) {
            // Remove directamente sem animação
            const idx = carrinho.indexOf(item);
            carrinho.splice(idx, 1);
        }

        saveCartData(carrinho);
        render();
        actualizarGlobalCount();
    }

    function removerItem(id, el) {
        if (el) {
            el.classList.add('a-sair');
            setTimeout(() => {
                const carrinho = getCart().filter(i => i.id !== id);
                saveCartData(carrinho);
                render();
                actualizarGlobalCount();
            }, 300);
        } else {
            const carrinho = getCart().filter(i => i.id !== id);
            saveCartData(carrinho);
            render();
            actualizarGlobalCount();
        }
    }


    // ────────────────────────────────────────────────────────────
    //  LIMPAR CARRINHO
    // ────────────────────────────────────────────────────────────

    btnLimpar?.addEventListener('click', () => {
        if (!confirm('Tens a certeza que queres limpar o carrinho?')) return;
        saveCartData([]);
        cupaoActivo   = null;
        descontoValor = 0;
        render();
        actualizarGlobalCount();
    });


    // ────────────────────────────────────────────────────────────
    //  CUPÃO DE DESCONTO
    // ────────────────────────────────────────────────────────────

    btnAplicar?.addEventListener('click', aplicarCupao);

    cupaoInput?.addEventListener('keydown', e => {
        if (e.key === 'Enter') aplicarCupao();
    });

    btnRemoverCup?.addEventListener('click', () => {
        cupaoActivo   = null;
        descontoValor = 0;
        if (cupaoInput) cupaoInput.value = '';
        mostrarFeedback('', '');
        actualizarResumo(getCart());
    });

    function aplicarCupao() {
        const codigo = cupaoInput?.value.trim().toUpperCase();
        if (!codigo) {
            mostrarFeedback('Introduz um código primeiro.', 'erro');
            return;
        }

        const percentagem = CUPOES[codigo];

        if (percentagem) {
            cupaoActivo = { codigo, percentagem };
            mostrarFeedback(`✔ "${codigo}" aplicado — ${percentagem}% de desconto!`, 'sucesso');
            actualizarResumo(getCart());
        } else {
            cupaoActivo = null;
            mostrarFeedback('Código inválido ou expirado.', 'erro');
            actualizarResumo(getCart());
        }
    }

    function mostrarFeedback(msg, tipo) {
        if (!cupaoFeedback) return;
        cupaoFeedback.textContent  = msg;
        cupaoFeedback.className    = `cupao-feedback ${tipo}`;
    }


    // ────────────────────────────────────────────────────────────
    //  CHECKOUT — WHATSAPP
    // ────────────────────────────────────────────────────────────

    btnWhatsApp?.addEventListener('click', () => {
        const nome   = nomeInput?.value.trim();
        const tel    = telInput?.value.trim();
        const morada = moradaInput?.value.trim();
        const nota   = notaInput?.value.trim();

        // Validação básica
        let valido = true;

        if (!nome) {
            nomeInput?.classList.add('erro');
            valido = false;
        } else {
            nomeInput?.classList.remove('erro');
        }

        if (!tel) {
            telInput?.classList.add('erro');
            valido = false;
        } else {
            telInput?.classList.remove('erro');
        }

        if (!valido) {
            // Scroll suave para o formulário
            nomeInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const carrinho = getCart();
        if (!carrinho.length) return;

        const subtotal = carrinho.reduce((s, i) => s + i.price * i.quantity, 0);
        const total    = subtotal - descontoValor;

        // Monta a mensagem
        let msg = `Olá Leitura Viva! 👋\n\nGostaria de fazer um pedido:\n\n`;

        msg += `📚 *LIVROS:*\n`;
        carrinho.forEach(item => {
            msg += `• ${item.name} × ${item.quantity} — ${(item.price * item.quantity).toLocaleString('pt-AO')} Kz\n`;
        });

        msg += `\n💰 *SUBTOTAL:* ${subtotal.toLocaleString('pt-AO')} Kz`;

        if (cupaoActivo) {
            msg += `\n🏷️ *CUPÃO (${cupaoActivo.codigo} -${cupaoActivo.percentagem}%):* - ${descontoValor.toLocaleString('pt-AO')} Kz`;
        }

        msg += `\n✅ *TOTAL:* ${total.toLocaleString('pt-AO')} Kz`;

        msg += `\n\n👤 *DADOS:*\nNome: ${nome}\nTelefone: ${tel}`;
        if (morada) msg += `\nMorada: ${morada}`;
        if (nota)   msg += `\nNota: ${nota}`;

        msg += `\n\nAguardo confirmação. Obrigado! 🙏`;

        const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    });

    // Remove classe erro ao começar a escrever
    [nomeInput, telInput].forEach(input => {
        input?.addEventListener('input', () => input.classList.remove('erro'));
    });


    // ────────────────────────────────────────────────────────────
    //  SUGESTÕES (livros populares não no carrinho)
    // ────────────────────────────────────────────────────────────

    function renderSugestoes() {
        if (!sugestoesGrid || !window.LeituraViva) return;

        sugestoesEl?.removeAttribute('hidden');

        const idsNoCarrinho = getCart().map(i => i.id);
        const sugestoes = window.LeituraViva
            .getPorEstado('popular')
            .filter(l => !idsNoCarrinho.includes(l.id))
            .slice(0, 4);

        if (!sugestoes.length) {
            sugestoesEl?.setAttribute('hidden', '');
            return;
        }

        const BADGES = { popular: '🔥 Popular', novo: '🆕 Novo', esgotado: 'Esgotado', disponivel: '' };

        sugestoesGrid.innerHTML = sugestoes.map((livro, i) => {
            const badge   = BADGES[livro.estado] || '';
            const desconto = livro.precoOld > livro.preco
                ? Math.round((1 - livro.preco / livro.precoOld) * 100)
                : 0;

            return `
                <article class="book-card" style="animation-delay:${i * 0.06}s">
                    <div class="book-media">
                        ${badge ? `<span class="badge">${badge}</span>` : ''}
                        <div class="image-box">
                            <img src="${livro.imagem}" alt="Capa de ${livro.titulo}" loading="lazy">
                        </div>
                    </div>
                    <div class="card-info">
                        <h3 class="book-title">${livro.titulo}</h3>
                        <p class="book-author">${livro.autor}</p>
                        <div class="price-box">
                            <div class="price-group">
                                ${livro.precoOld > livro.preco ? `<span class="price-old">${livro.precoOld.toLocaleString('pt-AO')} Kz</span>` : ''}
                                <span class="price">${livro.preco.toLocaleString('pt-AO')} Kz</span>
                            </div>
                            ${desconto ? `<span class="discount-tag">-${desconto}%</span>` : ''}
                        </div>
                        <button class="add-to-cart"
                                data-id="${livro.id}"
                                data-name="${livro.titulo}"
                                data-price="${livro.preco}">
                            <span>🛒 Adicionar</span>
                        </button>
                    </div>
                </article>
            `;
        }).join('');
    }

    // Sugestões: delegação de clique para add-to-cart
    sugestoesGrid?.addEventListener('click', e => {
        const btn = e.target.closest('.add-to-cart');
        if (!btn) return;
        e.stopPropagation();

        const livro = window.LeituraViva?.getPorId(btn.dataset.id);
        if (!livro) return;

        const carrinho = getCart();
        const existe   = carrinho.find(i => i.id === livro.id);

        if (existe) {
            existe.quantity += 1;
        } else {
            carrinho.push({
                id      : livro.id,
                name    : livro.titulo,
                price   : livro.preco,
                image   : livro.imagem,
                quantity: 1,
            });
        }

        saveCartData(carrinho);
        actualizarGlobalCount();

        if (typeof animateButton === 'function') animateButton(btn);

        // Dá um momento para a animação e depois re-renderiza
        setTimeout(() => render(), 1400);
    });


    // ────────────────────────────────────────────────────────────
    //  HELPERS — acesso ao carrinho global (definido em main.js)
    // ────────────────────────────────────────────────────────────

    function getCart() {
        return JSON.parse(localStorage.getItem('leituraViva_cart') || '[]');
    }

    function saveCartData(data) {
        localStorage.setItem('leituraViva_cart', JSON.stringify(data));
        // Sincroniza com a variável global do main.js se existir
        if (typeof cart !== 'undefined') {
            cart.length = 0;
            data.forEach(i => cart.push(i));
        }
    }

    function actualizarGlobalCount() {
        if (typeof updateCartCount === 'function') {
            updateCartCount();
        }
    }


    // ────────────────────────────────────────────────────────────
    //  INIT
    // ────────────────────────────────────────────────────────────

    render();
    renderSugestoes();

});