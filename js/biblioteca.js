function criarCard(anime) {
  const progresso = Math.round(
    (anime.episodiosVistos / anime.totalEpisodios) * 100,
  );
  //funçao para criar o card do do anime e pora por  porcentagem de quantos ep ja foram vistos

  return `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-sm shadow-sm overflow-hidden transition-colors">
    <!-- Se o anime não tem imagem, usa a padrão. Se o link falhar (onerror), troca pela padrão. -->
    <img src="${anime.imagem || IMAGEM_PADRAO}" alt="${anime.titulo}" referrerpolicy="no-referrer"
      onerror="this.onerror = null; this.src = IMAGEM_PADRAO;"
      class="w-full aspect-2/3 object-cover" >


<div class="p-3">
<h2 class="font-bold truncate text-slate-800 dark:text-slate-100">${anime.titulo}</h2>
<p class="text-sm text-amber-500">${anime.nota === null ? "Sem nota" : "Nota: " + anime.nota}</p>
<!-- corta titulos grandes com o truncate e mostra a nota e se n tiver vai aparecer sem nota -->
<p class="text-xs text-slate-500 dark:text-slate-400 mt-2">${anime.episodiosVistos} / ${anime.totalEpisodios} episódios</p>
<div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
<div class="bg-indigo-500 h-1.5 rounded-full" style="width: ${progresso}%"></div>
</div>

<!-- Botão de editar (abre o modal de edição, que fica no js/cadastro.js) -->
<button onclick="abrirModalEdicao(${anime.id})"
  class="mt-3 w-full rounded-sm border border-slate-300 py-1 text-xs text-slate-600 transition-colors hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400">
  Editar
</button>
</div>
</div>
`;
}

function mostrarAnimes(lista) {
  const grid = document.getElementById("grid-animes");
  grid.innerHTML = ""; // esvazia o grid antes de colocar os cards

  // Se nenhum anime passou no filtro/pesquisa, avisa em vez de deixar a tela vazia
  if (lista.length === 0) {
    grid.innerHTML = `<p class="col-span-full text-center text-slate-500 dark:text-slate-400 py-10">Nenhum anime encontrado.</p>`;
    return;
  }

  for (const anime of lista) {
    grid.innerHTML += criarCard(anime);
  }
}

let filtroAtual = "todos";

// Chamada quando alguém clica numa aba
function filtrarPorStatus(status) {
  filtroAtual = status; // anota a aba escolhida
  atualizarTela(); // redesenha considerando aba + pesquisa
}

// Cores da aba selecionada e das outras abas (iguais às do biblioteca.html)
const CORES_ABA_ATIVA = ["bg-indigo-600", "text-white", "border-indigo-600"];
const CORES_ABA_NORMAL = [
  "bg-white", "text-slate-600", "border-slate-300",
  "dark:bg-slate-900", "dark:text-slate-300", "dark:border-slate-700",
];

function marcarAbaAtiva() {
  const abas = document.querySelectorAll(".aba");
   // pega todos os botões de aba

  for (const aba of abas) {
    // os "..." espalham a lista: é como escrever cada classe separada por vírgula
    if (aba.dataset.status === filtroAtual) {
      aba.classList.remove(...CORES_ABA_NORMAL);
      aba.classList.add(...CORES_ABA_ATIVA);
    } else {
      aba.classList.remove(...CORES_ABA_ATIVA);
      aba.classList.add(...CORES_ABA_NORMAL);
    }
  }
}

// Chamada a cada letra digitada no campo de pesquisa
function pesquisar() {
  atualizarTela(); // o texto já está no campo; só redesenha
}

// Aplica a aba selecionada E a pesquisa ao mesmo tempo
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

// ---------- Modo escuro ----------

// Liga ou desliga o modo escuro (chamada pelo botão do cabeçalho)
function alternarTema() {
  // toggle: se o <html> tem a classe "dark", tira; se não tem, coloca
  document.documentElement.classList.toggle("dark");

  const escuro = document.documentElement.classList.contains("dark");
  localStorage.setItem("tema", escuro ? "escuro" : "claro"); // lembra a escolha

  atualizarBotaoTema();
}

// Troca o texto do botão conforme o tema atual
function atualizarBotaoTema() {
  const escuro = document.documentElement.classList.contains("dark");
  document.getElementById("botao-tema").textContent = escuro ? "Modo claro" : "Modo escuro";
}

// Quando a página abre: se a pessoa tinha escolhido o modo escuro, já começa escuro
if (localStorage.getItem("tema") === "escuro") {
  document.documentElement.classList.add("dark");
}
atualizarBotaoTema();

// Quando a página abre: pega os animes e mostra na tela
mostrarAnimes(pegarAnimes());
