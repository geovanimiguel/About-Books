// ================================================================
//  LEITURA VIVA — Memória do site
//  Ficheiro: js/memoria.js
//
//  O que guarda:
//    - Nome, telefone e morada (dados de entrega)
//    - Carrinho (já tratado pelo main.js — aqui só sincroniza)
//
//  Adiciona em TODAS as páginas antes de </body>:
//  <script src="js/memoria.js"></script>
// ================================================================

(function () {

    var CHAVE = 'leituraViva_memoria';

    // ── LER / GUARDAR ────────────────────────────────────────────

    function lerMemoria() {
        try {
            return JSON.parse(localStorage.getItem(CHAVE) || '{}');
        } catch(e) {
            return {};
        }
    }

    function guardarMemoria(dados) {
        try {
            var actual = lerMemoria();
            var novo   = Object.assign({}, actual, dados);
            localStorage.setItem(CHAVE, JSON.stringify(novo));
        } catch(e) {}
    }


    // ── PREENCHE FORMULÁRIO AUTOMATICAMENTE ─────────────────────

    function preencherFormulario() {
        var mem = lerMemoria();
        if (!mem.nome && !mem.telefone && !mem.morada) return;

        var campos = {
            'checkout-nome'     : mem.nome,
            'checkout-telefone' : mem.telefone,
            'checkout-morada'   : mem.morada,
        };

        Object.keys(campos).forEach(function(id) {
            var el = document.getElementById(id);
            if (el && campos[id] && !el.value) {
                el.value = campos[id];
            }
        });

        // Mostra indicador discreto
        mostrarIndicador();
    }


    // ── GUARDA AO ESCREVER ───────────────────────────────────────

    function setupGuardar() {
        var mapa = {
            'checkout-nome'     : 'nome',
            'checkout-telefone' : 'telefone',
            'checkout-morada'   : 'morada',
        };

        Object.keys(mapa).forEach(function(id) {
            var el  = document.getElementById(id);
            var key = mapa[id];
            if (!el) return;

            el.addEventListener('blur', function() {
                var obj = {};
                obj[key] = el.value.trim();
                if (obj[key]) guardarMemoria(obj);
            });
        });
    }


    // ── INDICADOR DISCRETO ───────────────────────────────────────
    // Aparece uma vez para informar o utilizador

    function mostrarIndicador() {
        var jaViu = sessionStorage.getItem('lv_mem_aviso');
        if (jaViu) return;

        var nomeEl = document.getElementById('checkout-nome');
        if (!nomeEl) return;

        var aviso = document.createElement('p');
        aviso.className = 'lv-mem-aviso';
        aviso.innerHTML = '<i class="fa-solid fa-circle-check"></i> Dados preenchidos automaticamente. '
            + '<button type="button" id="lv-mem-limpar">Limpar</button>';

        nomeEl.parentElement.parentElement.insertBefore(aviso, nomeEl.parentElement);

        document.getElementById('lv-mem-limpar').addEventListener('click', function() {
            limparMemoria();
            aviso.remove();
            ['checkout-nome','checkout-telefone','checkout-morada'].forEach(function(id) {
                var el = document.getElementById(id);
                if (el) el.value = '';
            });
        });

        sessionStorage.setItem('lv_mem_aviso', '1');
    }


    // ── LIMPAR DADOS GUARDADOS ───────────────────────────────────

    function limparMemoria() {
        try { localStorage.removeItem(CHAVE); } catch(e) {}
    }


    // ── EXPÕE API ────────────────────────────────────────────────

    window.LeituraViva            = window.LeituraViva || {};
    window.LeituraViva.memoria    = {
        ler     : lerMemoria,
        guardar : guardarMemoria,
        limpar  : limparMemoria,
    };


    // ── INIT ─────────────────────────────────────────────────────

    function init() {
        preencherFormulario();
        setupGuardar();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
