// ================================================================
//  LEITURA VIVA — Pixel de rastreamento
//  Ficheiro: js/pixel.js
//
//  CONFIGURAÇÃO:
//  Substitui os valores abaixo quando tiveres os IDs:
//
//    FACEBOOK_PIXEL_ID  → encontras em Meta Business > Eventos > Pixel
//    TIKTOK_PIXEL_ID    → encontras em TikTok Ads > Assets > Events
//
//  Adiciona em TODAS as páginas, antes de </body>:
//  <script src="js/pixel.js"></script>
// ================================================================

(function () {

    // ── CONFIGURAÇÃO — substitui aqui os teus IDs ────────────────
    var FACEBOOK_PIXEL_ID = 'SEU_FACEBOOK_PIXEL_ID';
    var TIKTOK_PIXEL_ID   = 'SEU_TIKTOK_PIXEL_ID';
    // ─────────────────────────────────────────────────────────────

    var fbActivo  = FACEBOOK_PIXEL_ID !== 'SEU_FACEBOOK_PIXEL_ID';
    var ttActivo  = TIKTOK_PIXEL_ID   !== 'SEU_TIKTOK_PIXEL_ID';


    // ════════════════════════════════════════════════════════════
    //  FACEBOOK PIXEL
    // ════════════════════════════════════════════════════════════

    function initFacebook() {
        if (!fbActivo) return;

        !function(f,b,e,v,n,t,s){
            if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
        }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

        fbq('init', FACEBOOK_PIXEL_ID);
        fbq('track', 'PageView');
    }

    // Eventos Facebook
    var FB = {
        // Visualizou um livro (modal aberto)
        verLivro: function(livro) {
            if (!fbActivo || !window.fbq) return;
            fbq('track', 'ViewContent', {
                content_name    : livro.titulo,
                content_ids     : [livro.id],
                content_type    : 'product',
                value           : livro.preco,
                currency        : 'AOA'
            });
        },
        // Adicionou ao carrinho
        addCarrinho: function(livro) {
            if (!fbActivo || !window.fbq) return;
            fbq('track', 'AddToCart', {
                content_name    : livro.titulo,
                content_ids     : [livro.id],
                content_type    : 'product',
                value           : livro.preco,
                currency        : 'AOA'
            });
        },
        // Iniciou checkout
        iniciarCheckout: function(total, itens) {
            if (!fbActivo || !window.fbq) return;
            fbq('track', 'InitiateCheckout', {
                value           : total,
                currency        : 'AOA',
                num_items       : itens
            });
        },
        // Compra concluída (WhatsApp enviado)
        compra: function(total, ids) {
            if (!fbActivo || !window.fbq) return;
            fbq('track', 'Purchase', {
                value           : total,
                currency        : 'AOA',
                content_ids     : ids,
                content_type    : 'product'
            });
        },
        // Pesquisou um livro
        pesquisar: function(query) {
            if (!fbActivo || !window.fbq) return;
            fbq('track', 'Search', { search_string: query });
        }
    };


    // ════════════════════════════════════════════════════════════
    //  TIKTOK PIXEL
    // ════════════════════════════════════════════════════════════

    function initTikTok() {
        if (!ttActivo) return;

        !function(w,d,t){
            w.TiktokAnalyticsObject=t;
            var ttq=w[t]=w[t]||[];
            ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];
            ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
            for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
            ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
            ttq.load=function(e,n){var i='https://analytics.tiktok.com/i18n/pixel/events.js';ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._r=ttq._r||{};ttq._r[e]=n||{};var o=document.createElement('script');o.type='text/javascript';o.async=!0;o.src=i+'?sdkid='+e+'&lib='+t;var a=document.getElementsByTagName('script')[0];a.parentNode.insertBefore(o,a)};
            ttq.load(TIKTOK_PIXEL_ID);
            ttq.page();
        }(window,document,'ttq');
    }

    // Eventos TikTok
    var TT = {
        verLivro: function(livro) {
            if (!ttActivo || !window.ttq) return;
            ttq.track('ViewContent', {
                content_name : livro.titulo,
                content_id   : livro.id,
                content_type : 'product',
                value        : livro.preco,
                currency     : 'AOA'
            });
        },
        addCarrinho: function(livro) {
            if (!ttActivo || !window.ttq) return;
            ttq.track('AddToCart', {
                content_name : livro.titulo,
                content_id   : livro.id,
                content_type : 'product',
                value        : livro.preco,
                currency     : 'AOA'
            });
        },
        iniciarCheckout: function(total) {
            if (!ttActivo || !window.ttq) return;
            ttq.track('InitiateCheckout', { value: total, currency: 'AOA' });
        },
        compra: function(total) {
            if (!ttActivo || !window.ttq) return;
            ttq.track('CompletePayment', { value: total, currency: 'AOA' });
        },
        pesquisar: function(query) {
            if (!ttActivo || !window.ttq) return;
            ttq.track('Search', { query: query });
        }
    };


    // ════════════════════════════════════════════════════════════
    //  API UNIFICADA — usa FB e TT em simultâneo
    // ════════════════════════════════════════════════════════════

    var Pixel = {
        verLivro: function(livro) {
            FB.verLivro(livro);
            TT.verLivro(livro);
        },
        addCarrinho: function(livro) {
            FB.addCarrinho(livro);
            TT.addCarrinho(livro);
        },
        iniciarCheckout: function(total, itens) {
            FB.iniciarCheckout(total, itens);
            TT.iniciarCheckout(total);
        },
        compra: function(total, ids) {
            FB.compra(total, ids);
            TT.compra(total);
        },
        pesquisar: function(query) {
            FB.pesquisar(query);
            TT.pesquisar(query);
        }
    };

    window.LeituraViva        = window.LeituraViva || {};
    window.LeituraViva.Pixel  = Pixel;


    // ════════════════════════════════════════════════════════════
    //  RASTREAMENTO AUTOMÁTICO
    // ════════════════════════════════════════════════════════════

    function setupRastreamento() {

        // Modal do livro aberto → ViewContent
        document.body.addEventListener('click', function(e) {
            var card = e.target.closest('.book-card, .card-destaque');
            if (!card) return;
            if (e.target.closest('.add-to-cart, .notify-btn, .destaque-btn, .destaque-btn-mobile')) return;

            var id = card.querySelector('[data-id]') && card.querySelector('[data-id]').dataset.id;
            if (!id || !window.LeituraViva || !window.LeituraViva.getPorId) return;

            var livro = window.LeituraViva.getPorId(id);
            if (livro) {
                setTimeout(function() { Pixel.verLivro(livro); }, 100);
            }
        });

        // Adicionar ao carrinho → AddToCart
        document.body.addEventListener('click', function(e) {
            var btn = e.target.closest('.add-to-cart');
            if (!btn) return;
            var id = btn.dataset.id;
            if (!id || !window.LeituraViva || !window.LeituraViva.getPorId) return;
            var livro = window.LeituraViva.getPorId(id);
            if (livro) Pixel.addCarrinho(livro);
        });

        // Pesquisa → Search
        var searchInput = document.getElementById('search-input');
        if (searchInput) {
            var searchTimer;
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimer);
                searchTimer = setTimeout(function() {
                    var q = searchInput.value.trim();
                    if (q.length > 2) Pixel.pesquisar(q);
                }, 1500);
            });
        }

        // Botão WhatsApp → InitiateCheckout + Purchase
        var btnWA = document.getElementById('btn-whatsapp');
        if (btnWA) {
            btnWA.addEventListener('click', function() {
                var carrinho = JSON.parse(localStorage.getItem('leituraViva_cart') || '[]');
                var total    = carrinho.reduce(function(s, i) { return s + i.price * i.quantity; }, 0);
                var ids      = carrinho.map(function(i) { return i.id; });
                var nome     = document.getElementById('checkout-nome');
                var tel      = document.getElementById('checkout-telefone');

                if (nome && tel && nome.value.trim() && tel.value.trim()) {
                    Pixel.iniciarCheckout(total, carrinho.length);
                    setTimeout(function() { Pixel.compra(total, ids); }, 500);
                }
            });
        }
    }


    // ── INIT ─────────────────────────────────────────────────────

    function init() {
        initFacebook();
        initTikTok();
        setupRastreamento();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
