// ================================================================
//  LEITURA VIVA — Placeholder de capas
//  Ficheiro: js/placeholder.js
//
//  O que faz:
//    Quando uma imagem de livro não é encontrada (erro 404),
//    substitui automaticamente por uma capa gerada com o título
//    e autor do livro. O site nunca mostra uma imagem quebrada.
//
//  Como usar:
//    Inclui este script em qualquer página que mostre livros:
//    <script src="js/placeholder.js"></script>
//
//  Não precisas de configurar nada — funciona sozinho.
// ================================================================

(function () {

    // Cores de fundo por categoria
    const CORES = {
        'romance'          : { bg: '#1a0a12', texto: '#f2c4d0', detalhe: '#8b2246' },
        'terror-suspense'  : { bg: '#0d0d0d', texto: '#c0b9b0', detalhe: '#4a3728' },
        'filosofia'        : { bg: '#0f1420', texto: '#c8d4e8', detalhe: '#2c3e6b' },
        'negocios'         : { bg: '#0a1a12', texto: '#b8d4c0', detalhe: '#1a5c32' },
        'desenvolvimento'  : { bg: '#1a1200', texto: '#f0d88a', detalhe: '#7a5c00' },
        'autoajuda'        : { bg: '#1a0f00', texto: '#f0c890', detalhe: '#8b5a00' },
        'classicos'        : { bg: '#1a1410', texto: '#e8d8c0', detalhe: '#6b5040' },
        'ficcao'           : { bg: '#0f0a1a', texto: '#c8b8f0', detalhe: '#4a2c8b' },
        'infantil'         : { bg: '#0a1a1a', texto: '#90e0d0', detalhe: '#005050' },
        'religiao'         : { bg: '#1a1600', texto: '#f0e8c0', detalhe: '#7a6800' },
        'historia'         : { bg: '#140a00', texto: '#e0c890', detalhe: '#6b4400' },
        'ciencia'          : { bg: '#001420', texto: '#90c8f0', detalhe: '#005080' },
        'default'          : { bg: '#121212', texto: '#e0d8d0', detalhe: '#3a3530' },
    };

    /**
     * Cria uma imagem placeholder via Canvas.
     * Devolve um data URL (base64) com a capa gerada.
     */
    function criarPlaceholder(titulo, autor, categoria) {
        const canvas  = document.createElement('canvas');
        canvas.width  = 300;
        canvas.height = 450;

        const ctx    = canvas.getContext('2d');
        const cor    = CORES[categoria] || CORES['default'];

        // Fundo
        ctx.fillStyle = cor.bg;
        ctx.fillRect(0, 0, 300, 450);

        // Barra lateral esquerda
        ctx.fillStyle = cor.detalhe;
        ctx.fillRect(0, 0, 6, 450);

        // Linha decorativa topo
        ctx.fillStyle = cor.detalhe;
        ctx.fillRect(0, 0, 300, 2);

        // Linha decorativa fundo
        ctx.fillRect(0, 448, 300, 2);

        // Nome da loja
        ctx.fillStyle = cor.detalhe;
        ctx.font      = '500 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('LEITURA VIVA', 150, 35);

        // Separador
        ctx.fillStyle = cor.detalhe;
        ctx.fillRect(40, 45, 220, 1);

        // Título — quebra automática de linha
        ctx.fillStyle  = cor.texto;
        ctx.font       = 'bold 22px "Playfair Display", Georgia, serif';
        ctx.textAlign  = 'center';
        const linhas   = quebrarTexto(ctx, titulo.toUpperCase(), 240);
        const inicioY  = 200 - (linhas.length * 28) / 2;
        linhas.forEach((linha, i) => {
            ctx.fillText(linha, 150, inicioY + i * 30);
        });

        // Separador central
        ctx.fillStyle = cor.detalhe;
        ctx.fillRect(80, inicioY + linhas.length * 30 + 10, 140, 1);

        // Autor
        ctx.fillStyle = cor.detalhe;
        ctx.font      = '400 13px Inter, sans-serif';
        ctx.fillText(autor, 150, inicioY + linhas.length * 30 + 28);

        return canvas.toDataURL('image/png');
    }

    /**
     * Quebra um texto em várias linhas para caber numa largura máxima.
     */
    function quebrarTexto(ctx, texto, larguraMax) {
        const palavras = texto.split(' ');
        const linhas   = [];
        let linhaActual = '';

        palavras.forEach(palavra => {
            const teste = linhaActual ? `${linhaActual} ${palavra}` : palavra;
            if (ctx.measureText(teste).width > larguraMax && linhaActual) {
                linhas.push(linhaActual);
                linhaActual = palavra;
            } else {
                linhaActual = teste;
            }
        });

        if (linhaActual) linhas.push(linhaActual);
        return linhas;
    }

    /**
     * Aplica placeholder a todas as imagens de livro que falharem.
     * Corre automaticamente — não precisas de chamar nada.
     */
    function setupPlaceholders() {
        document.querySelectorAll('.image-box img, .book-img').forEach(img => {
            if (img.complete && img.naturalWidth === 0) {
                aplicarPlaceholder(img);
            }
            img.addEventListener('error', () => aplicarPlaceholder(img));
        });
    }

    function aplicarPlaceholder(img) {
        // Tenta obter título e autor do card pai
        const card     = img.closest('.book-card, [data-id]');
        const titulo   = card?.querySelector('.book-title')?.textContent?.trim()
                      || img.alt
                      || 'Título';
        const autor    = card?.querySelector('.book-author')?.textContent?.trim()
                      || '';
        const categoria = card?.dataset?.categoria || 'default';

        img.src = criarPlaceholder(titulo, autor, categoria);
        img.style.objectFit = 'cover';
    }

    // Corre quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupPlaceholders);
    } else {
        setupPlaceholders();
    }

    // Observa novos cards adicionados dinamicamente (para o catálogo)
    const observer = new MutationObserver(() => setupPlaceholders());
    observer.observe(document.body, { childList: true, subtree: true });

    // Expõe a função para uso manual se necessário
    window.LeituraViva = window.LeituraViva || {};
    window.LeituraViva.criarPlaceholder = criarPlaceholder;

})();
