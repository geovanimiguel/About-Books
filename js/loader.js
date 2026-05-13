// ================================================================
//  LEITURA VIVA — Loader de navegação
//  Ficheiro: js/loader.js
//
//  Adiciona esta linha em TODAS as páginas HTML, antes de fechar </body>:
//  <script src="js/loader.js"></script>
//
//  Não precisa de mais nenhuma configuração.
//  Funciona automaticamente em todos os links internos.
// ================================================================

(function () {

    // ── CRIAR ELEMENTOS ─────────────────────────────────────────

    function criarElementos() {
        // Barra de progresso no topo
        if (!document.getElementById('lv-loader-bar')) {
            var bar = document.createElement('div');
            bar.id  = 'lv-loader-bar';
            document.body.appendChild(bar);
        }

        // Overlay de saída
        if (!document.getElementById('lv-loader-overlay')) {
            var overlay = document.createElement('div');
            overlay.id  = 'lv-loader-overlay';
            document.body.appendChild(overlay);
        }

        // Spinner central (para conexões lentas)
        if (!document.getElementById('lv-loader-spinner')) {
            var spinner = document.createElement('div');
            spinner.id  = 'lv-loader-spinner';
            spinner.innerHTML =
                '<div class="lv-spinner-ring"></div>'
              + '<span class="lv-spinner-logo">LeituraViva</span>';
            document.body.appendChild(spinner);
        }
    }


    // ── ESTADO ──────────────────────────────────────────────────

    var bar        = null;
    var overlay    = null;
    var spinner    = null;
    var spinTimer  = null;
    var hideTimer  = null;
    var carregando = false;


    // ── INICIAR LOADER ───────────────────────────────────────────

    function iniciarLoader() {
        if (carregando) return;
        carregando = true;

        bar     = document.getElementById('lv-loader-bar');
        overlay = document.getElementById('lv-loader-overlay');
        spinner = document.getElementById('lv-loader-spinner');

        if (!bar) return;

        // Reset
        bar.classList.remove('done', 'hide');
        bar.style.width = '0%';

        // Força reflow para a transição funcionar
        bar.offsetWidth;

        // Inicia barra
        bar.classList.add('active');

        // Fade suave na página actual
        if (overlay) overlay.classList.add('fade-out');

        // Spinner aparece se demorar mais de 800ms (conexão lenta)
        spinTimer = setTimeout(function () {
            if (carregando && spinner) {
                spinner.classList.add('visible');
            }
        }, 800);
    }


    // ── TERMINAR LOADER ─────────────────────────────────────────

    function terminarLoader() {
        carregando = false;

        if (spinTimer) clearTimeout(spinTimer);
        if (hideTimer) clearTimeout(hideTimer);

        bar     = document.getElementById('lv-loader-bar');
        overlay = document.getElementById('lv-loader-overlay');
        spinner = document.getElementById('lv-loader-spinner');

        if (bar) {
            bar.classList.remove('active');
            bar.classList.add('done');

            hideTimer = setTimeout(function () {
                if (bar) bar.classList.add('hide');
                setTimeout(function () {
                    if (bar) {
                        bar.classList.remove('done', 'hide', 'active');
                        bar.style.width = '0%';
                    }
                }, 400);
            }, 200);
        }

        if (overlay) overlay.classList.remove('fade-out');
        if (spinner) spinner.classList.remove('visible');
    }


    // ── DETECTAR LINKS INTERNOS ─────────────────────────────────

    function isLinkInterno(href) {
        if (!href) return false;
        // Ignora âncoras, mailto, tel, javascript e links externos
        if (href.startsWith('#'))           return false;
        if (href.startsWith('mailto:'))     return false;
        if (href.startsWith('tel:'))        return false;
        if (href.startsWith('javascript:')) return false;
        if (href.startsWith('https://wa.me')) return false;

        // Link externo
        try {
            var url = new URL(href, window.location.href);
            if (url.hostname !== window.location.hostname) return false;
            // Mesma página, só âncora diferente
            if (url.pathname === window.location.pathname && url.hash) return false;
        } catch (e) {
            return false;
        }

        return true;
    }


    // ── INTERCEPTAR CLIQUES ─────────────────────────────────────

    document.addEventListener('click', function (e) {
        var link = e.target.closest('a');
        if (!link) return;

        var href = link.getAttribute('href');
        if (!isLinkInterno(href)) return;

        // Não intercepta se Ctrl/Cmd/Shift (abrir em novo tab)
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;

        iniciarLoader();
    });


    // ── ENTRADA NA PÁGINA ────────────────────────────────────────
    /*
       Quando a página nova carrega, faz a barra completar
       e desaparece suavemente.
    */

    function aoCarregar() {
        criarElementos();

        bar     = document.getElementById('lv-loader-bar');
        overlay = document.getElementById('lv-loader-overlay');
        spinner = document.getElementById('lv-loader-spinner');

        // Página carregou — completa a barra
        terminarLoader();

        // Fade de entrada suave na página
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.25s ease';

        // Pequeno delay para o browser pintar primeiro
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                document.body.style.opacity = '1';
            });
        });
    }


    // ── NAVEGAÇÃO COM O BOTÃO BACK/FORWARD ──────────────────────

    window.addEventListener('pageshow', function (e) {
        // pageshow dispara ao voltar da cache do browser (bfcache)
        if (e.persisted) {
            terminarLoader();
            document.body.style.opacity = '1';
        }
    });

    // Cancela o loader se o utilizador carregar em ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && carregando) {
            terminarLoader();
        }
    });


    // ── INIT ────────────────────────────────────────────────────

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', aoCarregar);
    } else {
        aoCarregar();
    }

})();