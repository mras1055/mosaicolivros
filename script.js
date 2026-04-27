// Base de dados dos livros (expandida)
const livros = [
  {
    id: "o-hobbit",
    titulo: "O Hobbit",
    autor: "J.R.R. Tolkien",
    capa: "imagens/hobbit.jpg",
    descricao: "Bilbo Bolseiro é um hobbit que vive pacificamente no Condado até que o mago Gandalf e treze anões batem à sua porta. Uma aventura inesquecível atrás de um tesouro guardado pelo dragão Smaug. Uma obra prima da literatura fantástica.",
  },
  {
    id: "dom-casmurro",
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    capa: "imagens/dom-casmurro.jpg",
    descricao: "Bento Santiago, o Dom Casmurro, narra sua vida e o amor por Capitu. A dúvida sobre uma possível traição marcou a literatura brasileira e gerou uma das maiores discussões literárias de todos os tempos.",
  },
  {
    id: "1984",
    titulo: "1984",
    autor: "George Orwell",
    capa: "imagens/1984.jpg",
    descricao: "Em um regime totalitário, Winston Smith tenta manter sua individualidade contra o Grande Irmão, que tudo vê. Uma distopia clássica que alerta sobre vigilância e manipulação da verdade.",
  },
  {
    id: "o-pequeno-principe",
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    capa: "imagens/pequeno-principe.jpg",
    descricao: "Um piloto cai no deserto e conhece um pequeno príncipe vindo de outro planeta. Uma obra profunda sobre amizade, amor e o sentido da vida, que encanta crianças e adultos.",
  }
];

let filtroAtual = "todos";

// Função para renderizar catálogo conforme filtro
function carregarCatalogo() {
  const grid = document.getElementById("catalogo-grid");
  if (!grid) return;

  const livrosFiltrados = filtroAtual === "todos" 
    ? livros 
    : livros.filter(livro => livro.autor === filtroAtual);

  grid.innerHTML = "";

  if (livrosFiltrados.length === 0) {
    grid.innerHTML = "<p style='text-align:center; grid-column:1/-1;'>Nenhum livro encontrado.</p>";
    return;
  }

  livrosFiltrados.forEach(livro => {
    const card = document.createElement("div");
    card.className = "card-livro";

    card.innerHTML = `
      <img class="card-imagem" src="${livro.capa}" alt="${livro.titulo}" onerror="this.src='imagens/placeholder.jpg'">
      <div class="card-conteudo">
        <h3 class="card-titulo">${livro.titulo}</h3>
        <p class="card-autor">${livro.autor}</p>
        <a href="livro.html?id=${livro.id}" class="btn-detalhes">🔍 Ver detalhes</a>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Configurar botões de filtro
function configurarFiltros() {
  const botoes = document.querySelectorAll(".filtro-btn");
  if (!botoes.length) return;

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      botoes.forEach(b => b.classList.remove("ativo"));
      btn.classList.add("ativo");
      filtroAtual = btn.getAttribute("data-filtro");
      carregarCatalogo();
    });
  });
}

// Inicializar catálogo e filtros
if (document.getElementById("catalogo-grid")) {
  carregarCatalogo();
  configurarFiltros();
}

// Página de detalhes do livro
function carregarDetalhesLivro() {
  const params = new URLSearchParams(window.location.search);
  const livroId = params.get("id");

  const livro = livros.find(l => l.id === livroId);

  if (!livro) {
    document.body.innerHTML = "<div class='container' style='text-align:center; margin-top:3rem'><h1>📕 Livro não encontrado</h1><a href='index.html' class='btn-voltar'>Voltar ao catálogo</a></div>";
    return;
  }

  document.getElementById("livro-titulo").textContent = livro.titulo;
  document.getElementById("livro-autor").textContent = livro.autor;
  document.getElementById("livro-descricao").textContent = livro.descricao;
  const imgElement = document.getElementById("livro-capa");
  imgElement.src = livro.capa;
  imgElement.alt = livro.titulo;
  imgElement.onerror = () => { imgElement.src = "imagens/placeholder.jpg"; };
}

if (document.getElementById("livro-titulo")) {
  carregarDetalhesLivro();
}