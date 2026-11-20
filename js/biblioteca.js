// ===============================================
// BIBLIOTECA (cards, filtros e busca) — 👤 Pessoa 2
// ===============================================

let animes = [];            // lista de animes carregada
let filtroAtual = 'todos';  // aba selecionada

// Cores de cada status (para o "selo" no card)
const CORES_STATUS = {
  assistindo: 'bg-sky-500/20 text-sky-300',
  finalizado: 'bg-emerald-500/20 text-emerald-300',
  fila: 'bg-amber-500/20 text-amber-300',
};

// Mostra o nome do usuário no topo
document.getElementById('nomeUsuario').textContent = 'Olá, ' + localStorage.getItem('usuarioNome');

// Carrega os animes (o setTimeout simula a demora de um servidor)
function carregarAnimes() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '<p class="col-span-full text-center text-slate-400 py-10">Carregando...</p>';

  setTimeout(() => {
    try {
      animes = lerAnimes();
      mostrarAnimes();
    } catch (erro) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-10">
          <p class="text-red-400 mb-3">Não foi possível carregar seus animes.</p>
          <button onclick="carregarAnimes()" class="bg-slate-700 rounded px-4 py-2">Tentar de novo</button>
        </div>`;
    }
  }, 600);
}

// Desenha os cards na tela, aplicando filtro e busca
function mostrarAnimes() {
  const busca = document.getElementById('busca').value.toLowerCase();

  const lista = animes.filter((anime) => {
    const passaFiltro = filtroAtual === 'todos' || anime.status === filtroAtual;
    const passaBusca = anime.titulo.toLowerCase().includes(busca);
    return passaFiltro && passaBusca;
  });

  const grid = document.getElementById('grid');

  if (lista.length === 0) {
    grid.innerHTML = '<p class="col-span-full text-center text-slate-400 py-10">Nenhum anime encontrado.</p>';
  } else {
    grid.innerHTML = lista.map(criarCard).join('');
  }

  atualizarAbas();
}

// Monta o HTML de um card
function criarCard(anime) {
  const progresso = (anime.episodiosVistos / anime.totalEpisodios) * 100;

  // Se não tiver imagem, mostra um fundo colorido no lugar
  const capa = anime.imagem
    ? `<img src="${anime.imagem}" class="w-full aspect-[2/3] object-cover">`
    : `<div class="w-full aspect-[2/3] bg-gradient-to-br from-pink-500 to-purple-700 flex items-center justify-center text-4xl font-bold">${anime.titulo[0]}</div>`;

  return `
    <div class="bg-slate-800 rounded-xl overflow-hidden flex flex-col">
      ${capa}
      <div class="p-3 flex flex-col gap-2 flex-1">
        <h3 class="font-bold">${anime.titulo}</h3>
        <div class="flex justify-between items-center text-sm">
          <span class="text-yellow-400">★ ${anime.nota}</span>
          <span class="px-2 rounded-full text-xs ${CORES_STATUS[anime.status]}">${NOMES_STATUS[anime.status]}</span>
        </div>

        <div class="text-xs text-slate-400">Ep ${anime.episodiosVistos} / ${anime.totalEpisodios}</div>
        <div class="h-2 bg-slate-700 rounded-full">
          <div class="h-2 bg-pink-500 rounded-full" style="width: ${progresso}%"></div>
        </div>

        <div class="flex gap-2 mt-auto pt-2">
          <button onclick="maisUmEpisodio(${anime.id})" class="flex-1 bg-slate-700 hover:bg-slate-600 rounded py-1 text-sm">+1 Ep</button>
          <button onclick="abrirModal(${anime.id})" class="bg-slate-700 hover:bg-slate-600 rounded px-2 text-sm">Editar</button>
          <button onclick="removerAnime(${anime.id})" class="bg-slate-700 hover:bg-red-600 rounded px-2 text-sm">✕</button>
        </div>
      </div>
    </div>`;
}

// Troca a aba selecionada
function filtrar(status) {
  filtroAtual = status;
  mostrarAnimes();
}

// Pinta a aba ativa
function atualizarAbas() {
  document.querySelectorAll('.filtro').forEach((botao) => {
    if (botao.dataset.filtro === filtroAtual) {
      botao.className = 'filtro px-4 py-1 rounded-full bg-pink-500 text-white';
    } else {
      botao.className = 'filtro px-4 py-1 rounded-full text-slate-400 hover:text-white';
    }
  });
}

carregarAnimes();
