// Texto e cor do selo de cada status
const SELOS_STATUS = {
  assistindo: { texto: "Assistindo", cores: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300" },
  finalizado: { texto: "Finalizado", cores: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300" },
  "na-fila": { texto: "Na Fila", cores: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300" },
};

// Botões −1 / +1 ep
const BOTAO_EPISODIO =
  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white transition hover:bg-indigo-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-indigo-600 disabled:active:scale-100";
const ICONE_MENOS = `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M5 12h14"/></svg>`;
const ICONE_MAIS = `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M12 5v14M5 12h14"/></svg>`;

function criarCard(anime) {
  const progresso = Math.round(
    (anime.episodiosVistos / anime.totalEpisodios) * 100,
  );
  // Porcentagem de eps vistos
  const selo = SELOS_STATUS[anime.status] || SELOS_STATUS["na-fila"];

  // Quem adicionou (animes antigos não têm, então mostra o site)
  const autor = anime.adicionadoPor || "AnimeTeca";

  return `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-sm shadow-sm overflow-hidden transition-colors">
    <!-- Sem capa ou link quebrado: usa a imagem padrão -->
    <img src="${anime.imagem || IMAGEM_PADRAO}" alt="${anime.titulo}" referrerpolicy="no-referrer"
      onerror="this.onerror = null; this.src = IMAGEM_PADRAO;"
      class="w-full aspect-2/3 object-cover" >


<div class="p-3">
<h2 class="font-bold truncate text-slate-800 dark:text-slate-100">${anime.titulo}</h2>
<p class="truncate text-[11px] text-slate-500 dark:text-slate-400">
  Adicionado por <span class="font-semibold text-indigo-600 dark:text-indigo-400">${autor}</span>
</p>
<!-- Nota (ou "Sem nota") e status -->
<div class="flex items-center justify-between gap-2">
  <p class="text-sm text-amber-500">${anime.nota === null ? "Sem nota" : "Nota: " + anime.nota}</p>
  <span class="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${selo.cores}">${selo.texto}</span>
</div>

<!-- Progresso com −1 / +1 (acoes.js) -->
<div class="mt-2 flex items-center gap-2">
  <button onclick="mudarEpisodio(${anime.id}, -1)" aria-label="Remover um episódio"
    class="${BOTAO_EPISODIO}" ${anime.episodiosVistos <= 0 ? "disabled" : ""}>${ICONE_MENOS}</button>

  <div class="min-w-0 flex-1">
    <p class="text-xs text-slate-500 dark:text-slate-400">${anime.episodiosVistos} / ${anime.totalEpisodios} eps · ${progresso}%</p>
    <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
      <div class="bg-indigo-500 h-1.5 rounded-full transition-all duration-300" style="width: ${progresso}%"></div>
    </div>
  </div>

  <button onclick="mudarEpisodio(${anime.id}, 1)" aria-label="Adicionar um episódio"
    class="${BOTAO_EPISODIO}" ${anime.episodiosVistos >= anime.totalEpisodios ? "disabled" : ""}>${ICONE_MAIS}</button>
</div>

<!-- Editar (cadastro.js) e Remover (acoes.js) -->
<div class="mt-3 flex gap-2">
  <button onclick="abrirModalEdicao(${anime.id})"
    class="flex-1 rounded-sm border border-slate-300 py-1 text-xs text-slate-600 transition-colors hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400">
    Editar
  </button>
  <button onclick="removerAnime(${anime.id})"
    class="flex-1 rounded-sm border border-slate-300 py-1 text-xs text-slate-600 transition-colors hover:border-red-500 hover:text-red-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-red-500 dark:hover:text-red-400">
    Remover
  </button>
</div>
</div>
</div>
`;
}

function mostrarAnimes(lista) {
  const grid = document.getElementById("grid-animes");
  grid.innerHTML = ""; // limpa o grid

  // Nenhum anime? Mostra o aviso
  if (lista.length === 0) {
    grid.innerHTML = `<p class="col-span-full text-center text-slate-500 dark:text-slate-400 py-10">Nenhum anime encontrado.</p>`;
    return;
  }

  for (const anime of lista) {
    grid.innerHTML += criarCard(anime);
  }
}

let filtroAtual = "todos";

// Clique numa aba
function filtrarPorStatus(status) {
  filtroAtual = status; // anota a aba escolhida
  atualizarTela(); // redesenha com aba + pesquisa
}

// Cores da aba ativa e das outras
const CORES_ABA_ATIVA = ["bg-indigo-600", "text-white", "border-indigo-600"];
const CORES_ABA_NORMAL = [
  "bg-white", "text-slate-600", "border-slate-300",
  "dark:bg-slate-900", "dark:text-slate-300", "dark:border-slate-700",
];

function marcarAbaAtiva() {
  const abas = document.querySelectorAll(".aba");
  // pega todos os botões de aba

  for (const aba of abas) {
    // "..." espalha a lista de classes
    if (aba.dataset.status === filtroAtual) {
      aba.classList.remove(...CORES_ABA_NORMAL);
      aba.classList.add(...CORES_ABA_ATIVA);
    } else {
      aba.classList.remove(...CORES_ABA_ATIVA);
      aba.classList.add(...CORES_ABA_NORMAL);
    }
  }
}

// A cada letra digitada na pesquisa
function pesquisar() {
  atualizarTela(); // só redesenha
}

// Aplica aba e pesquisa juntas
function atualizarTela() {
  const texto = document.getElementById("busca").value.toLowerCase();

  const lista = pegarAnimes().filter((anime) => {
    const passaNoFiltro = filtroAtual === "todos" || anime.status === filtroAtual;
    const passaNaBusca = anime.titulo.toLowerCase().includes(texto);

    return passaNoFiltro && passaNaBusca;
  });

  mostrarAnimes(lista);
  marcarAbaAtiva();
}

// Modo escuro

// Liga/desliga o modo escuro
function alternarTema() {
  // coloca ou tira a classe "dark" do <html>
  document.documentElement.classList.toggle("dark");

  const escuro = document.documentElement.classList.contains("dark");
  localStorage.setItem("tema", escuro ? "escuro" : "claro"); // lembra a escolha

  atualizarBotaoTema();
}

// Texto do botão conforme o tema
function atualizarBotaoTema() {
  const escuro = document.documentElement.classList.contains("dark");
  document.getElementById("botao-tema").textContent = escuro ? "Modo claro" : "Modo escuro";
}

// Se escolheu escuro antes, já abre escuro
if (localStorage.getItem("tema") === "escuro") {
  document.documentElement.classList.add("dark");
}
atualizarBotaoTema();

// Carregamento e erro

// Cards cinzas piscando enquanto carrega
function mostrarCarregando() {
  const grid = document.getElementById("grid-animes");
  grid.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    grid.innerHTML += `
      <div class="animate-pulse rounded-sm border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div class="aspect-2/3 bg-slate-200 dark:bg-slate-800"></div>
        <div class="space-y-2 p-3">
          <div class="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800"></div>
          <div class="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800"></div>
          <div class="h-1.5 rounded bg-slate-200 dark:bg-slate-800"></div>
        </div>
      </div>`;
  }
}

// Tela de erro com "Tentar novamente"
function mostrarErro() {
  document.getElementById("grid-animes").innerHTML = `
    <div class="col-span-full rounded-sm border border-red-300 bg-red-50 p-8 text-center dark:border-red-500/50 dark:bg-slate-900">
      <p class="font-semibold text-red-700 dark:text-red-400">Não foi possível carregar sua biblioteca.</p>
      <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">Os dados salvos podem estar com problema.</p>
      <button onclick="carregarBiblioteca()"
        class="mt-4 rounded-sm bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500">Tentar novamente</button>
    </div>`;
}

// Mostra o carregando, espera um pouco e desenha os cards
function carregarBiblioteca() {
  mostrarCarregando();

  setTimeout(() => {
    try {
      atualizarTela(); // lê os animes e desenha
    } catch (erro) {
      console.error(erro);
      mostrarErro();
      handleApiError(500);
    }
  }, 600); // 0,6 s
}

// Nome de quem está logado no cabeçalho
document.getElementById("usuario-logado").textContent = pegarUsuarioLogado();

// Carrega os animes ao abrir a página
carregarBiblioteca();
