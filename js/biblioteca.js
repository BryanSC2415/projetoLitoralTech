function criarCard(anime) {
  const progresso = Math.round(
    (anime.episodiosVistos / anime.totalEpisodios) * 100,
  );

  return `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-sm shadow-sm overflow-hidden transition-colors">
    <img src="${anime.imagem}" alt="${anime.titulo}" class="w-full aspect-2/3 object-cover" >

<div class="p-3">
<h2 class="font-bold truncate text-slate-800 dark:text-slate-100">${anime.titulo}</h2>
<p class="text-sm text-amber-500">Nota: ${anime.nota}</p>

<p class="text-xs text-slate-500 dark:text-slate-400 mt-2">${anime.episodiosVistos} / ${anime.totalEpisodios} episódios</p>
<div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
<div class="bg-indigo-500 h-1.5 rounded-full" style="width: ${progresso}%"></div>
</div>
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
