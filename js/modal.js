// ================================================================
//  LEITURA VIVA — Modal do livro
//  Ficheiro: js/modal.js
//
//  Adiciona em todas as páginas que mostram livros, antes de </body>:
//  <script src="js/modal.js"></script>
// ================================================================

(function () {

    // ── TRECHOS DESCRITIVOS ──────────────────────────────────────
    // Copy apelativo para cada livro — focado em conversão

    var TRECHOS = {
        'todas-as-suas-imperfeicoes': {
            trecho: 'Dois adultos partidos a tentar construir algo inteiro. Colleen Hoover escreve sobre amor da forma mais honesta que existe — sem filtros, sem happy endings garantidos. Este livro vai ficar contigo.',
            genero: 'Romance contemporâneo'
        },
        'quarta-asa': {
            trecho: 'Numa academia onde os guerreiros andam a dorso de dragão, Violet descobre que o inimigo mais perigoso pode ser o único que a faz sentir viva. Fantasia épica com romance que prende do início ao fim.',
            genero: 'Fantasia romântica'
        },
        'a-empregada': {
            trecho: 'A família parece perfeita. A casa parece segura. Mas Millie, a nova empregada, começa a perceber que algo está muito errado — e que pode ser tarde demais para sair. Freida McFadden no seu melhor.',
            genero: 'Thriller psicológico'
        },
        'jantar-secreto': {
            trecho: 'Um jantar de gala. Uma lista de convidados escolhida a dedo. E um anfitrião com um plano perturbador que só se revela na última página. Raphael Montes é o mestre brasileiro do suspense.',
            genero: 'Suspense'
        },
        'imperfeitos': {
            trecho: 'Um acordo simples: fingir ser o casal perfeito. O problema é que ninguém avisou o coração. Christina Lauren entrega comédia romântica inteligente, quente e impossível de largar.',
            genero: 'Comédia romântica'
        },
        'a-metamorfose': {
            trecho: 'Gregor Samsa acorda transformado num insecto gigante. A família reage. O mundo continua. Kafka escreveu em 1915 a metáfora mais poderosa sobre alienação, trabalho e amor familiar que existe.',
            genero: 'Clássico / Ficção absurdista'
        },
        'morro-ventos-uivantes': {
            trecho: 'Heathcliff e Catherine. Um amor tão intenso que atravessa gerações, morte e vingança. Emily Brontë criou o romance mais sombrio e apaixonado da literatura inglesa — e não envelheceu um dia.',
            genero: 'Romance clássico'
        },
        'os-sete-maridos-evelyn-hugo': {
            trecho: 'A actriz mais famosa de Hollywood concede a sua única entrevista — e a verdade é maior, mais escandalosa e mais humana do que qualquer fã poderia imaginar. Impossível pousar antes da última página.',
            genero: 'Ficção histórica'
        },
        'culpa-das-estrelas': {
            trecho: 'Hazel e Augustus são adolescentes com cancro que se apaixonam numa sala de apoio. John Green escreve sobre a vida com uma crueldade e uma beleza que vai partir-te em dois — da melhor forma possível.',
            genero: 'Romance juvenil'
        },
        'pequeno-principe': {
            trecho: '"O essencial é invisível aos olhos." Lido por crianças, relido por adultos. O Pequeno Príncipe é o livro que te faz perceber que cresceste demais — e te convida a voltar atrás.',
            genero: 'Fábula / Clássico universal'
        },
        'arte-da-guerra': {
            trecho: 'Escrito há 2.500 anos por um general chinês, este livro ainda hoje é lido por CEOs, desportistas e estrategas. Porque as regras da vitória nunca mudaram — só o campo de batalha.',
            genero: 'Filosofia / Estratégia'
        },
        'a-republica': {
            trecho: 'O que é a justiça? Quem deve governar? Platão fez estas perguntas há 2.400 anos e ainda hoje não há respostas melhores. A obra que fundou o pensamento político ocidental.',
            genero: 'Filosofia clássica'
        },
        'amor-teoricamente': {
            trecho: 'Elsie é especialista em ser a namorada perfeita — para outros homens. Até conhecer alguém que não segue o guião. Ali Hazelwood mistura academia, humor e romance numa fórmula viciante.',
            genero: 'Romance / New adult'
        },
        'nao-e-como-nos-filmes': {
            trecho: 'A vida real não tem trilha sonora, nem luz perfeita, nem declarações no momento certo. Mas às vezes tem algo melhor — alguém que fica mesmo quando o guião acaba.',
            genero: 'Romance contemporâneo'
        },
        'eu-e-esse-meu-coracao': {
            trecho: 'Kylie tem um dom que ninguém pediu: consegue ouvir os pensamentos dos fantasmas. E o fantasma mais complicado que encontrou foi o do rapaz que mudou tudo antes de partir.',
            genero: 'Romance sobrenatural juvenil'
        },
        '48-leis-do-poder': {
            trecho: 'Lei nº 1: Nunca ofusques o teu mestre. Lei nº 15: Esmaga o inimigo por completo. Robert Greene estudou séculos de história para te dar o manual que os poderosos nunca publicaram.',
            genero: 'Não-ficção / Estratégia'
        },
        'filho-perfeito': {
            trecho: 'Nate é o filho que toda a mãe sonha ter. Educado, inteligente, atencioso. Mas Dawn começa a notar inconsistências pequenas demais para nomear — e grandes demais para ignorar.',
            genero: 'Thriller psicológico'
        },
        'pedra-papel-tesoura': {
            trecho: 'Um casal viaja para uma casa isolada nas Ilhas Escocesas. Cada um tem a sua versão do casamento. Nenhuma das versões é verdadeira. Alice Feeney entrega um twist que não vês vir.',
            genero: 'Thriller psicológico'
        },
        'o-vilarejo': {
            trecho: 'Uma estrada que não aparece no mapa. Um vilarejo que não existe nos registos. E dois turistas que percebem tarde demais que não são bem-vindos. Raphael Montes intensifica cada página.',
            genero: 'Terror / Suspense'
        },
        'uma-mulher-no-escuro': {
            trecho: 'Ela vive sozinha. Raramente sai. E jura que há alguém a observá-la. A polícia não acredita. O leitor não sabe em quem acreditar. Esse é exactamente o ponto.',
            genero: 'Suspense psicológico'
        },
        'a-paciente-silenciosa': {
            trecho: 'Alicia Berenson atirou cinco vezes no marido e nunca mais falou. O terapeuta Theo Faber está obcecado em descobrir porquê. O que encontra vai mudar tudo o que pensava saber.',
            genero: 'Thriller psicológico'
        },
        'lista-convidados': {
            trecho: 'Um casamento numa ilha remota. Nenhuma saída. Um corpo descoberto na manhã seguinte. E uma lista de convidados onde toda a gente tem um motivo. Lucy Foley no seu melhor.',
            genero: 'Mystery / Thriller'
        },
        '365-historias-biblicas': {
            trecho: 'Uma história por dia, 365 dias por ano. Ilustrações coloridas, linguagem simples, valores que ficam. O presente perfeito para crianças que crescem com fé e imaginação.',
            genero: 'Infantil / Religião'
        },
        'comece-pelo-porque': {
            trecho: 'Apple, Martin Luther King, os Irmãos Wright — o que têm em comum? Todos começaram pelo Porquê. Simon Sinek explica o único princípio que separa líderes que inspiram dos que apenas gerem.',
            genero: 'Liderança / Negócios'
        },
        'mostre-seu-trabalho': {
            trecho: 'Não esperes ser descoberto. Partilha o processo, não só o resultado. Austin Kleon dá-te 10 formas de te tornares visível sem precisares de ser um génio — só de ser generoso.',
            genero: 'Criatividade / Carreira'
        },
        'roube-como-artista': {
            trecho: 'Nada é original. Tudo é influência. A questão não é se roubas — é de quem roubas e como transformas. O livro que libertou uma geração de criativos do medo da cópia.',
            genero: 'Criatividade'
        },
        '3-palavrinhas-biblia': {
            trecho: 'Três palavras para cada versículo. Ilustrações vibrantes. Uma forma de apresentar a Bíblia aos mais pequenos que eles vão querer reler todos os dias.',
            genero: 'Infantil / Religião'
        },
        'o-principe': {
            trecho: 'Escrito em 1513, banido, temido e estudado até hoje. Maquiavel não te diz o que deves fazer — diz-te o que os poderosos fazem de facto. O livro mais honesto sobre poder que alguma vez foi escrito.',
            genero: 'Filosofia política'
        },
        'assim-falava-zaratustra': {
            trecho: '"Deus está morto." Nietzsche não disse isto como vitória — disse como aviso. Zaratustra desce da montanha para nos dizer que somos nós agora responsáveis pelo sentido da vida. Estás preparado?',
            genero: 'Filosofia'
        },
        'o-anticristo': {
            trecho: 'Nietzsche a nu. Sem metáforas, sem parábolas. Uma crítica directa ao Cristianismo que ainda hoje provoca, desafia e obriga a pensar. Não é para todos — é exactamente por isso que deves ler.',
            genero: 'Filosofia'
        },
        'lideres-servem-por-ultimo': {
            trecho: 'As melhores equipas não têm os melhores jogadores — têm os melhores líderes. Simon Sinek explica por que razão os líderes que colocam a equipa à frente de si próprios são os que ganham a longo prazo.',
            genero: 'Liderança'
        },
        'como-fazer-amigos': {
            trecho: 'Publicado em 1936. Mais de 30 milhões de cópias vendidas. Dale Carnegie escreveu o manual de relações humanas que ainda hoje é o mais eficaz — porque as pessoas não mudaram.',
            genero: 'Autoajuda / Comunicação'
        }
    };

    // ── CRIAR MODAL ──────────────────────────────────────────────

    function criarModal() {
        if (document.getElementById('lv-modal-livro')) return;

        var modal = document.createElement('div');
        modal.id  = 'lv-modal-livro';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'lv-modal-livro-titulo');
        modal.setAttribute('hidden', '');

        modal.innerHTML = ''
            + '<div class="lv-ml-backdrop"></div>'
            + '<div class="lv-ml-box">'
            +   '<button class="lv-ml-fechar" aria-label="Fechar">'
            +     '<i class="fa-solid fa-xmark"></i>'
            +   '</button>'
            +   '<div class="lv-ml-conteudo">'
            +     '<div class="lv-ml-capa">'
            +       '<img id="lv-ml-img" src="" alt="" loading="lazy">'
            +     '</div>'
            +     '<div class="lv-ml-info">'
            +       '<span class="lv-ml-genero" id="lv-ml-genero"></span>'
            +       '<h2 class="lv-ml-titulo" id="lv-modal-livro-titulo"></h2>'
            +       '<p class="lv-ml-autor" id="lv-ml-autor"></p>'
            +       '<blockquote class="lv-ml-trecho" id="lv-ml-trecho"></blockquote>'
            +       '<div class="lv-ml-preco-box">'
            +         '<div class="lv-ml-precos">'
            +           '<span class="lv-ml-preco-old" id="lv-ml-preco-old"></span>'
            +           '<span class="lv-ml-preco" id="lv-ml-preco"></span>'
            +         '</div>'
            +         '<span class="lv-ml-desconto" id="lv-ml-desconto"></span>'
            +       '</div>'
            +       '<div class="lv-ml-acoes">'
            +         '<button class="lv-ml-btn-carrinho" id="lv-ml-btn-carrinho">'
            +           '<i class="fa-solid fa-cart-shopping"></i> Adicionar ao carrinho'
            +         '</button>'
            +         '<button class="lv-ml-btn-comprar" id="lv-ml-btn-comprar">'
            +           '<i class="fa-brands fa-whatsapp"></i> Comprar agora'
            +         '</button>'
            +       '</div>'
            +       '<p class="lv-ml-nota">Comprar agora envia apenas este livro para o WhatsApp.</p>'
            +     '</div>'
            +   '</div>'
            + '</div>';

        document.body.appendChild(modal);

        // Fechar ao clicar no backdrop ou botão
        modal.querySelector('.lv-ml-backdrop').addEventListener('click', fecharModal);
        modal.querySelector('.lv-ml-fechar').addEventListener('click', fecharModal);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') fecharModal();
        });
    }


    // ── ABRIR MODAL ──────────────────────────────────────────────

    function abrirModal(livro) {
        var modal = document.getElementById('lv-modal-livro');
        if (!modal) return;

        var dados  = TRECHOS[livro.id] || {};
        var trecho = dados.trecho || livro.descricao || 'Um livro que não podes deixar de ler.';
        var genero = dados.genero || livro.categoria || '';

        var desconto = livro.precoOld > livro.preco
            ? Math.round((1 - livro.preco / livro.precoOld) * 100) : 0;

        // Preenche conteúdo
        modal.querySelector('#lv-ml-img').src          = livro.imagem;
        modal.querySelector('#lv-ml-img').alt          = 'Capa de ' + livro.titulo;
        modal.querySelector('#lv-modal-livro-titulo').textContent = livro.titulo;
        modal.querySelector('#lv-ml-autor').textContent            = livro.autor;
        modal.querySelector('#lv-ml-trecho').textContent           = trecho;
        modal.querySelector('#lv-ml-genero').textContent           = genero;
        modal.querySelector('#lv-ml-preco').textContent            = livro.preco.toLocaleString('pt-AO') + ' Kz';

        var precoOldEl = modal.querySelector('#lv-ml-preco-old');
        if (livro.precoOld > livro.preco) {
            precoOldEl.textContent = livro.precoOld.toLocaleString('pt-AO') + ' Kz';
            precoOldEl.style.display = 'inline';
        } else {
            precoOldEl.style.display = 'none';
        }

        var descontoEl = modal.querySelector('#lv-ml-desconto');
        if (desconto) {
            descontoEl.textContent   = '-' + desconto + '%';
            descontoEl.style.display = 'inline';
        } else {
            descontoEl.style.display = 'none';
        }

        // Botão carrinho
        var btnCarrinho = modal.querySelector('#lv-ml-btn-carrinho');
        btnCarrinho.onclick = function() {
            if (typeof addToCart === 'function') {
                addToCart({ id: livro.id, name: livro.titulo, price: livro.preco, image: livro.imagem, quantity: 1 });
            }
            // Feedback visual
            btnCarrinho.textContent = '✔ Adicionado!';
            btnCarrinho.style.background = '#1f7a3a';
            setTimeout(function() {
                btnCarrinho.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Adicionar ao carrinho';
                btnCarrinho.style.background = '';
            }, 1500);
        };

        // Botão comprar agora — finaliza só este livro
        var btnComprar = modal.querySelector('#lv-ml-btn-comprar');
        btnComprar.onclick = function() {
            fecharModal();
            abrirCheckoutRapido(livro);
        };

        // Abre modal
        modal.removeAttribute('hidden');
        requestAnimationFrame(function() {
            modal.classList.add('lv-ml-open');
        });

        // Bloqueia scroll
        document.body.style.overflow = 'hidden';

        // Foco no botão fechar
        setTimeout(function() {
            modal.querySelector('.lv-ml-fechar').focus();
        }, 50);
    }


    // ── FECHAR MODAL ─────────────────────────────────────────────

    function fecharModal() {
        var modal = document.getElementById('lv-modal-livro');
        if (!modal) return;
        modal.classList.remove('lv-ml-open');
        document.body.style.overflow = '';
        setTimeout(function() {
            modal.setAttribute('hidden', '');
        }, 280);
    }


    // ── CHECKOUT RÁPIDO ──────────────────────────────────────────
    // Abre o carrinho com apenas este livro, preserva o carrinho actual

    function abrirCheckoutRapido(livro) {
        // Guarda carrinho actual numa chave separada
        var carrinhoActual = localStorage.getItem('leituraViva_cart') || '[]';
        localStorage.setItem('leituraViva_cart_backup', carrinhoActual);

        // Coloca apenas este livro no carrinho
        var itemRapido = [{ id: livro.id, name: livro.titulo, price: livro.preco, image: livro.imagem, quantity: 1 }];
        localStorage.setItem('leituraViva_cart', JSON.stringify(itemRapido));
        localStorage.setItem('leituraViva_checkout_rapido', '1');

        // Vai para o carrinho
        window.location.href = 'carrinho.html';
    }


    // ── MODAL DE AGRADECIMENTO ───────────────────────────────────

    function criarModalObrigado() {
        if (document.getElementById('lv-modal-obrigado')) return;

        var modal = document.createElement('div');
        modal.id  = 'lv-modal-obrigado';
        modal.setAttribute('hidden', '');
        modal.innerHTML = ''
            + '<div class="lv-mo-backdrop"></div>'
            + '<div class="lv-mo-box">'
            +   '<div class="lv-mo-icone">🎉</div>'
            +   '<h2 class="lv-mo-titulo">Pedido enviado!</h2>'
            +   '<p class="lv-mo-texto">O teu pedido foi enviado para o WhatsApp. Vamos confirmar em minutos e tratar de tudo para a entrega.</p>'
            +   '<div class="lv-mo-acoes">'
            +     '<button class="lv-mo-btn" id="lv-mo-btn-ok">Fechar</button>'
            +     '<a href="catalogo.html" class="lv-mo-btn lv-mo-btn-outline">Continuar a explorar</a>'
            +   '</div>'
            + '</div>';

        document.body.appendChild(modal);

        modal.querySelector('#lv-mo-btn-ok').addEventListener('click', function() {
            fecharModalObrigado();
        });
        modal.querySelector('.lv-mo-backdrop').addEventListener('click', fecharModalObrigado);
    }

    function abrirModalObrigado() {
        var modal = document.getElementById('lv-modal-obrigado');
        if (!modal) return;
        modal.removeAttribute('hidden');
        requestAnimationFrame(function() {
            modal.classList.add('lv-mo-open');
        });
        document.body.style.overflow = 'hidden';
    }

    function fecharModalObrigado() {
        var modal = document.getElementById('lv-modal-obrigado');
        if (!modal) return;
        modal.classList.remove('lv-mo-open');
        document.body.style.overflow = '';
        setTimeout(function() { modal.setAttribute('hidden', ''); }, 280);

        // Restaura carrinho original se era checkout rápido
        var backup = localStorage.getItem('leituraViva_cart_backup');
        if (backup && localStorage.getItem('leituraViva_checkout_rapido')) {
            localStorage.setItem('leituraViva_cart', backup);
            localStorage.removeItem('leituraViva_cart_backup');
            localStorage.removeItem('leituraViva_checkout_rapido');
            if (typeof updateCartCount === 'function') updateCartCount();
        }
    }


    // ── EXPÕE FUNÇÕES GLOBALMENTE ────────────────────────────────

    window.LeituraViva            = window.LeituraViva || {};
    window.LeituraViva.abrirModal = abrirModal;
    window.LeituraViva.abrirModalObrigado  = abrirModalObrigado;
    window.LeituraViva.fecharModalObrigado = fecharModalObrigado;


    // ── INTERCEPTA CLIQUES NOS CARDS ────────────────────────────

    function setupCliquesCards() {
        document.body.addEventListener('click', function(e) {
            // Ignora cliques em botões de carrinho/notify
            if (e.target.closest('.add-to-cart') || e.target.closest('.notify-btn')) return;
            if (e.target.closest('.destaque-btn') || e.target.closest('.destaque-btn-mobile')) return;
            if (e.target.closest('.lv-ml-box') || e.target.closest('#lv-modal-obrigado')) return;

            var card = e.target.closest('.book-card, .card-destaque');
            if (!card) return;

            var id = card.dataset.id
                || card.querySelector('[data-id]') && card.querySelector('[data-id]').dataset.id
                || (card.querySelector('.add-to-cart') && card.querySelector('.add-to-cart').dataset.id)
                || (card.querySelector('.notify-btn') && card.querySelector('.notify-btn').dataset.id);

            if (!id || !window.LeituraViva || !window.LeituraViva.getPorId) return;

            var livro = window.LeituraViva.getPorId(id);
            if (livro) abrirModal(livro);
        });
    }


    // ── INTEGRAÇÃO COM WHATSAPP DO CARRINHO ──────────────────────
    // Após o envio para WhatsApp, abre modal de agradecimento

    function hookWhatsApp() {
        document.body.addEventListener('click', function(e) {
            if (e.target.closest('#btn-whatsapp')) {
                // Aguarda o carrinho.js tratar a validação
                setTimeout(function() {
                    var nome = document.getElementById('checkout-nome');
                    var tel  = document.getElementById('checkout-telefone');
                    if (nome && tel && nome.value.trim() && tel.value.trim()) {
                        abrirModalObrigado();
                    }
                }, 600);
            }
        });
    }


    // ── CHECKOUT RÁPIDO — avisa o carrinho.js ────────────────────

    function verificarCheckoutRapido() {
        if (localStorage.getItem('leituraViva_checkout_rapido')) {
            // Mostra banner de aviso no topo do carrinho
            var hero = document.querySelector('.carrinho-hero .container');
            if (hero && !document.getElementById('lv-banner-rapido')) {
                var banner = document.createElement('div');
                banner.id  = 'lv-banner-rapido';
                banner.className = 'lv-banner-rapido';
                banner.innerHTML = ''
                    + '<i class="fa-solid fa-circle-info"></i>'
                    + ' A finalizar apenas o livro seleccionado. '
                    + '<button id="lv-banner-restaurar">Restaurar carrinho completo</button>';
                hero.appendChild(banner);

                document.getElementById('lv-banner-restaurar').addEventListener('click', function() {
                    var backup = localStorage.getItem('leituraViva_cart_backup');
                    if (backup) {
                        localStorage.setItem('leituraViva_cart', backup);
                        localStorage.removeItem('leituraViva_cart_backup');
                    }
                    localStorage.removeItem('leituraViva_checkout_rapido');
                    window.location.reload();
                });
            }
        }
    }


    // ── INIT ─────────────────────────────────────────────────────

    function init() {
        criarModal();
        criarModalObrigado();
        setupCliquesCards();
        hookWhatsApp();

        if (window.location.pathname.indexOf('carrinho') !== -1) {
            verificarCheckoutRapido();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
