// ================================================================
//  LEITURA VIVA — Lista de livros
//  Ficheiro: data/livros.js
//
//  COMO ADICIONAR UM LIVRO:
//    1. Copia um bloco { ... } existente
//    2. Preenche os campos
//    3. Certifica-te que há vírgula no fim do bloco anterior
//
//  COMO ESGOTAR UM LIVRO:
//    Muda  estado: 'disponivel'  para  estado: 'esgotado'
//
//  COMO REMOVER UM LIVRO:
//    Apaga o bloco inteiro { ... } incluindo a vírgula no fim
//
//  ESTADOS POSSÍVEIS:
//    'disponivel' — aparece normal com botão de comprar
//    'popular'    — mostra badge 🔥 Popular
//    'novo'       — mostra badge 🆕 Novo
//    'esgotado'   — aparece acinzentado com botão "Avisar-me"
//
//  CATEGORIAS POSSÍVEIS:
//    'romance'              'ficcao'
//    'terror-suspense'      'infantil'
//    'filosofia'            'negocios'
//    'desenvolvimento'      'autoajuda'
//    'religiao'             'classicos'
// ================================================================

(function () {

    const livros = [

        // ── ROMANCE ─────────────────────────────────────────────

        {
            id        : 'todas-as-suas-imperfeicoes',
            titulo    : 'Todas as Suas Imperfeições',
            autor     : 'Colleen Hoover',
            preco     : 6500,
            precoOld  : 8500,
            imagem    : 'img/todasassuasimpoerfeicoes.webp',
            categoria : 'romance',
            estado    : 'popular',
            descricao : 'Uma história de amor intensa e crua — dois adultos com cicatrizes tentam construir algo real.',
            destaque  : true,
        },
        {
            id        : 'quarta-asa',
            titulo    : 'Quarta Asa',
            autor     : 'Rebecca Yarros',
            preco     : 7200,
            precoOld  : 9200,
            imagem    : 'img/quartaasa.webp',
            categoria : 'romance',
            estado    : 'popular',
            descricao : 'Uma academia de guerreiros, dragões e um romance proibido num mundo de fantasia épica.',
            destaque  : true,
        },
        {
            id        : 'os-sete-maridos-evelyn-hugo',
            titulo    : 'Os Sete Maridos de Evelyn Hugo',
            autor     : 'Taylor Jenkins Reid',
            preco     : 6800,
            precoOld  : 8800,
            imagem    : 'img/evelyn-hugo.webp',
            categoria : 'romance',
            estado    : 'popular',
            descricao : 'A actriz mais famosa de Hollywood revela finalmente toda a verdade da sua vida escandalosa.',
            destaque  : true,
        },
        {
            id        : 'culpa-das-estrelas',
            titulo    : 'A Culpa é das Estrelas',
            autor     : 'John Green',
            preco     : 5800,
            precoOld  : 7500,
            imagem    : 'img/culpa-estrelas.webp',
            categoria : 'romance',
            estado    : 'disponivel',
            descricao : 'Uma história de amor entre dois adolescentes com cancro — emocionante e inesquecível.',
            destaque  : false,
        },
        {
            id        : 'imperfeitos',
            titulo    : 'Imperfeitos',
            autor     : 'Christina Lauren',
            preco     : 6200,
            precoOld  : 8000,
            imagem    : 'img/imperfeitos.webp',
            categoria : 'romance',
            estado    : 'novo',
            descricao : 'Dois estranhos, um acordo e sentimentos que ninguém planeou — comédia romântica irresistível.',
            destaque  : false,
        },
        {
            id        : 'amor-teoricamente',
            titulo    : 'Amor, Teoricamente',
            autor     : 'Ali Hazelwood',
            preco     : 6200,
            precoOld  : 8000,
            imagem    : 'img/amor-teoricamente.webp',
            categoria : 'romance',
            estado    : 'novo',
            descricao : 'Uma académica que finge ser a namorada perfeita enamora-se do homem errado.',
            destaque  : false,
        },
        {
            id        : 'nao-e-como-nos-filmes',
            titulo    : 'Não é Como nos Filmes',
            autor     : 'Desconhecido',
            preco     : 5900,
            precoOld  : 7800,
            imagem    : 'img/nao-e-como-nos-filmes.webp',
            categoria : 'romance',
            estado    : 'disponivel',
            descricao : 'Uma história de amor que quebra todas as expectativas criadas pelos filmes românticos.',
            destaque  : false,
        },
        {
            id        : 'eu-e-esse-meu-coracao',
            titulo    : 'Eu e Esse Meu Coração',
            autor     : 'C. C. Hunter',
            preco     : 5800,
            precoOld  : 7500,
            imagem    : 'img/eu-esse-coracao.webp',
            categoria : 'romance',
            estado    : 'disponivel',
            descricao : 'Um romance juvenil com sobrenatural, humor e sentimentos que não pedem licença.',
            destaque  : false,
        },
        {
            id        : 'morro-ventos-uivantes',
            titulo    : 'O Morro dos Ventos Uivantes',
            autor     : 'Emily Brontë',
            preco     : 5500,
            precoOld  : 7200,
            imagem    : 'img/morro-ventos.webp',
            categoria : 'romance',
            estado    : 'disponivel',
            descricao : 'O romance gótico mais apaixonado da literatura inglesa — amor obsessivo e vingança nas charnecas.',
            destaque  : false,
        },

        // ── TERROR / SUSPENSE ────────────────────────────────────

        {
            id        : 'a-empregada',
            titulo    : 'A Empregada',
            autor     : 'Freida McFadden',
            preco     : 6500,
            precoOld  : 8500,
            imagem    : 'img/a-empregada.webp',
            categoria : 'terror-suspense',
            estado    : 'popular',
            descricao : 'Uma empregada doméstica, uma família perfeita e segredos que ninguém deveria descobrir.',
            destaque  : true,
        },
        {
            id        : 'jantar-secreto',
            titulo    : 'Jantar Secreto',
            autor     : 'Raphael Montes',
            preco     : 6200,
            precoOld  : 8000,
            imagem    : 'img/jantar-secreto.webp',
            categoria : 'terror-suspense',
            estado    : 'disponivel',
            descricao : 'Um thriller psicológico perturbador do mestre brasileiro do suspense.',
            destaque  : false,
        },
        {
            id        : 'pedra-papel-tesoura',
            titulo    : 'Pedra, Papel, Tesoura',
            autor     : 'Alice Feeney',
            preco     : 6500,
            precoOld  : 8500,
            imagem    : 'img/pedra-papel-tesoura.webp',
            categoria : 'terror-suspense',
            estado    : 'novo',
            descricao : 'Um casal numa casa isolada, memórias em conflito e uma verdade que vai partir-te em dois.',
            destaque  : false,
        },
        {
            id        : 'o-vilarejo',
            titulo    : 'O Vilarejo',
            autor     : 'Raphael Montes',
            preco     : 6200,
            precoOld  : 8000,
            imagem    : 'img/vilarejo.webp',
            categoria : 'terror-suspense',
            estado    : 'disponivel',
            descricao : 'Uma viagem que começa normal e termina num pesadelo sem saída.',
            destaque  : false,
        },
        {
            id        : 'uma-mulher-no-escuro',
            titulo    : 'Uma Mulher no Escuro',
            autor     : 'Raphael Montes',
            preco     : 6200,
            precoOld  : 8000,
            imagem    : 'img/mulher-escuro.webp',
            categoria : 'terror-suspense',
            estado    : 'disponivel',
            descricao : 'Solidão, paranóia e uma presença que pode ser real ou imaginada.',
            destaque  : false,
        },
        {
            id        : 'a-paciente-silenciosa',
            titulo    : 'A Paciente Silenciosa',
            autor     : 'Alex Michaelides',
            preco     : 6800,
            precoOld  : 8800,
            imagem    : 'img/paciente-silenciosa.webp',
            categoria : 'terror-suspense',
            estado    : 'popular',
            descricao : 'Uma pintora que atirou no marido e nunca mais falou — o thriller psicológico do ano.',
            destaque  : true,
        },
        {
            id        : 'lista-convidados',
            titulo    : 'A Lista dos Convidados',
            autor     : 'Lucy Foley',
            preco     : 6500,
            precoOld  : 8500,
            imagem    : 'img/lista-convidados.webp',
            categoria : 'terror-suspense',
            estado    : 'disponivel',
            descricao : 'Um casamento numa ilha remota, um corpo e todos os convidados têm motivo.',
            destaque  : false,
        },
        {
            id        : 'filho-perfeito',
            titulo    : 'O Filho Perfeito',
            autor     : 'Freida McFadden',
            preco     : 6500,
            precoOld  : 8500,
            imagem    : 'img/filho-perfeito.webp',
            categoria : 'terror-suspense',
            estado    : 'novo',
            descricao : 'O filho parece perfeito — mas a mãe sente que algo está muito errado.',
            destaque  : false,
        },
        {
            id        : 'a-metamorfose',
            titulo    : 'A Metamorfose',
            autor     : 'Franz Kafka',
            preco     : 4500,
            precoOld  : 6000,
            imagem    : 'img/metamorfose.webp',
            categoria : 'classicos',
            estado    : 'disponivel',
            descricao : 'Gregor Samsa acorda transformado num insecto gigante — o clássico absurdista de Kafka.',
            destaque  : false,
        },

        // ── CLÁSSICOS ────────────────────────────────────────────

        {
            id        : 'pequeno-principe',
            titulo    : 'O Pequeno Príncipe',
            autor     : 'Antoine de Saint-Exupéry',
            preco     : 4500,
            precoOld  : 6000,
            imagem    : 'img/pequeno-principe.webp',
            categoria : 'classicos',
            estado    : 'popular',
            descricao : 'O clássico universal sobre amizade, amor e o que os olhos não conseguem ver.',
            destaque  : false,
        },

        // ── FILOSOFIA ────────────────────────────────────────────

        {
            id        : 'arte-da-guerra',
            titulo    : 'A Arte da Guerra',
            autor     : 'Sun Tzu',
            preco     : 4500,
            precoOld  : 6000,
            imagem    : 'img/arte-guerra.webp',
            categoria : 'filosofia',
            estado    : 'disponivel',
            descricao : 'O tratado mais antigo sobre estratégia — aplicado hoje em negócios, desporto e vida.',
            destaque  : false,
        },
        {
            id        : 'a-republica',
            titulo    : 'A República',
            autor     : 'Platão',
            preco     : 5500,
            precoOld  : 7200,
            imagem    : 'img/a-republica.webp',
            categoria : 'filosofia',
            estado    : 'disponivel',
            descricao : 'O diálogo filosófico mais influente da história — justiça, política e a natureza do conhecimento.',
            destaque  : false,
        },
        {
            id        : 'assim-falava-zaratustra',
            titulo    : 'Assim Falava Zaratustra',
            autor     : 'Friedrich Nietzsche',
            preco     : 6500,
            precoOld  : 8500,
            imagem    : 'img/zaratustra.webp',
            categoria : 'filosofia',
            estado    : 'disponivel',
            descricao : 'O eterno retorno, o super-homem e a vontade de poder — Nietzsche na sua obra máxima.',
            destaque  : false,
        },
        {
            id        : 'o-anticristo',
            titulo    : 'O Anticristo',
            autor     : 'Friedrich Nietzsche',
            preco     : 5800,
            precoOld  : 7500,
            imagem    : 'img/anticristo.webp',
            categoria : 'filosofia',
            estado    : 'disponivel',
            descricao : 'A crítica mais provocadora de Nietzsche ao cristianismo e à moral ocidental.',
            destaque  : false,
        },
        {
            id        : 'o-principe',
            titulo    : 'O Príncipe',
            autor     : 'Nicolau Maquiavel',
            preco     : 4800,
            precoOld  : 6500,
            imagem    : 'img/o-principe.webp',
            categoria : 'filosofia',
            estado    : 'disponivel',
            descricao : 'O manual de poder mais lido e controverso de todos os tempos — escrito em 1513, atual hoje.',
            destaque  : false,
        },

        // ── NEGÓCIOS / LIDERANÇA ─────────────────────────────────

        {
            id        : '48-leis-do-poder',
            titulo    : 'As 48 Leis do Poder',
            autor     : 'Robert Greene',
            preco     : 7500,
            precoOld  : 9500,
            imagem    : 'img/48-leis-poder.webp',
            categoria : 'negocios',
            estado    : 'popular',
            descricao : 'As leis que governam o poder — estuda-as para as usar ou para te defenderes delas.',
            destaque  : true,
        },
        {
            id        : 'comece-pelo-porque',
            titulo    : 'Comece pelo Porquê',
            autor     : 'Simon Sinek',
            preco     : 6200,
            precoOld  : 8200,
            imagem    : 'img/comece-pelo-porque.webp',
            categoria : 'negocios',
            estado    : 'disponivel',
            descricao : 'Por que alguns líderes e empresas inspiram e outros não — começa sempre pelo propósito.',
            destaque  : false,
        },
        {
            id        : 'lideres-servem-por-ultimo',
            titulo    : 'Os Líderes se Servem por Último',
            autor     : 'Simon Sinek',
            preco     : 6500,
            precoOld  : 8500,
            imagem    : 'img/lideres-servem-por-ultimo.webp',
            categoria : 'negocios',
            estado    : 'disponivel',
            descricao : 'Por que algumas equipas são unidas e outras não — e o papel do líder em tudo isso.',
            destaque  : false,
        },
        {
            id        : 'como-fazer-amigos',
            titulo    : 'Como Fazer Amigos e Influenciar Pessoas',
            autor     : 'Dale Carnegie',
            preco     : 6200,
            precoOld  : 8000,
            imagem    : 'img/como-fazer-amigos.webp',
            categoria : 'negocios',
            estado    : 'popular',
            descricao : 'O livro de relações humanas mais vendido de todos os tempos — ainda funciona 80 anos depois.',
            destaque  : true,
        },

        // ── DESENVOLVIMENTO / CRIATIVIDADE ───────────────────────

        {
            id        : 'mostre-seu-trabalho',
            titulo    : 'Mostre o Seu Trabalho',
            autor     : 'Austin Kleon',
            preco     : 5500,
            precoOld  : 7200,
            imagem    : 'img/mostre-trabalho.webp',
            categoria : 'desenvolvimento',
            estado    : 'novo',
            descricao : 'Como partilhar o teu processo criativo e construir uma audiência sem ser chato.',
            destaque  : false,
        },
        {
            id        : 'roube-como-artista',
            titulo    : 'Roube Como um Artista',
            autor     : 'Austin Kleon',
            preco     : 5500,
            precoOld  : 7200,
            imagem    : 'img/roube-artista.webp',
            categoria : 'desenvolvimento',
            estado    : 'novo',
            descricao : 'Dez coisas que ninguém te disse sobre criatividade — e como encontrar a tua voz.',
            destaque  : false,
        },

        // ── RELIGIÃO / INFANTIL ──────────────────────────────────

        {
            id        : '365-historias-biblicas',
            titulo    : '365 Histórias Bíblicas para Ler e Ouvir',
            autor     : 'Vários Autores',
            preco     : 7500,
            precoOld  : 9500,
            imagem    : 'img/365-historias-biblicas.webp',
            categoria : 'religiao',
            estado    : 'disponivel',
            descricao : 'Uma história bíblica por dia para crianças — ilustrada, simples e envolvente.',
            destaque  : false,
        },
        {
            id        : '3-palavrinhas-biblia',
            titulo    : '3 Palavrinhas — Bíblia para Crianças',
            autor     : 'Vários Autores',
            preco     : 5500,
            precoOld  : 7200,
            imagem    : 'img/3-palavrinhas.webp',
            categoria : 'infantil',
            estado    : 'disponivel',
            descricao : 'Versículos bíblicos apresentados de forma simples e colorida para os mais pequenos.',
            destaque  : false,
        },
        
        // ___ Desesnvolvimento Pessoal  _____________

        {
            id        : 'startup-enxuta',
            titulo    : 'A Startup Enxuta',
            autor     : 'Eric Ries',
            preco     : 12500,
            precoOld  : 9200,
            imagem    : 'img/A startup enxuta.webp',
            categoria : 'desenvolvimento',
            estado    : 'disponivel',
            descricao : ' Foca em metodologias ágeis e criação de novos modelos de negócios sob condições de incerteza extremas',
            destaque  : false,
        },

        {
            id        : 'poder-habito',
            titulo    : 'O Poder do Hábito',
            autor     : 'James Clear',
            preco     : 13990,
            precoOld  : 11990,
            imagem    : 'img/O poder do hábito.webp',
            categoria : 'desenvolvimento',
            estado    : 'disponivel',
            descricao : 'Como criar bons hábitos e eliminar os ruins — com base na ciência do comportamento humano.',
            destaque  : false,
        },

        {
            id        : 'mindset',
            titulo    : 'Mindset: A Nova Psicologia do Sucesso',
            autor     : 'Carol S. Dweck',
            preco     : 5500,
            precoOld  : 7200,
            imagem    : 'img/Mindset.webp',
            categoria : 'desenvolvimento',
            estado    : 'esgotado',
            descricao : 'Explora o impacto das crenças fixas versus progressivas no potencial de crescimento humano.',
            destaque  : false,
        },
    ];

    


    // ── UTILITÁRIOS ──────────────────────────────────────────────

    function getTodos()               { return livros; }
    function getDestaques()           { return livros.filter(l => l.destaque); }
    function getPorCategoria(cat)     { return livros.filter(l => l.categoria === cat); }
    function getPorEstado(estado)     { return livros.filter(l => l.estado === estado); }
    function getPorId(id)             { return livros.find(l => l.id === id) || null; }
    function getCategorias()          { return [...new Set(livros.map(l => l.categoria))]; }

    function pesquisar(query) {
        const q = query.toLowerCase().trim();
        if (!q) return livros;
        return livros.filter(l =>
            l.titulo.toLowerCase().includes(q) ||
            l.autor.toLowerCase().includes(q)
        );
    }


    // ── EXPORTAÇÃO ───────────────────────────────────────────────

    window.LeituraViva = {
        livros,
        getTodos,
        getDestaques,
        getPorCategoria,
        getPorEstado,
        getPorId,
        getCategorias,
        pesquisar,
    };

})();
