/*
 * ============================================================
 *  BIBLIOTECA — "COLA" DA HOME (arquivo base — dono: Pessoa 1)
 * ============================================================
 *  Este arquivo só LIGA as peças de cada pessoa. Ele não tem visual.
 *    - carrega os animes da API para o store
 *    - redesenha filtros + grid quando o store muda
 *    - recebe TODOS os cliques via data-acao e chama a função certa
 *
 *  Precisa de uma ação nova? Adicione um "case" no switch abaixo
 *  e avise no grupo (é o único ponto onde as partes se encontram).
 * ============================================================
 */

import { api } from '../services/api.js';
import { sair, usuarioAtual } from '../services/auth.js';
import { store, animesVisiveis } from '../store.js';

import { renderizarNavbar } from '../components/navbar.js'; // Pessoa 1
import { renderizarFiltros, configurarBusca } from '../components/filtros.js'; // Pessoa 2
import { renderizarCard, renderizarVazio } from '../components/anime-card.js'; // Pessoa 2
import { abrirFormularioAnime } from '../components/anime-form.js'; // Pessoa 3
import { renderizarCarregando, renderizarErro, tratarErroApi } from '../components/estados.js'; // Pessoa 4
import { maisUmEpisodio, confirmarRemocao } from '../acoes/anime-acoes.js'; // Pessoa 4

const el = {
  navbar: document.querySelector('#navbar'),
  filtros: document.querySelector('#filtros'),
  busca: document.querySelector('#busca'),
  grid: document.querySelector('#grid'),
};

/* ---------- dados ---------- */

async function carregarAnimes() {
  store.set({ carregando: true, erro: null });
  try {
    store.set({ animes: await api.animes.listar(), carregando: false });
  } catch (erro) {
    store.set({ carregando: false, erro });
    tratarErroApi(erro);
  }
}

/* ---------- desenho ---------- */

function renderizar(estado) {
  renderizarFiltros(el.filtros, estado);

  if (estado.carregando) {
    el.grid.innerHTML = renderizarCarregando();
  } else if (estado.erro) {
    el.grid.innerHTML = renderizarErro(estado.erro);
  } else {
    const lista = animesVisiveis(estado);
    el.grid.innerHTML = lista.length
      ? lista.map(renderizarCard).join('')
      : renderizarVazio({ temBusca: estado.busca.trim() !== '' });
  }
}

/* ---------- cliques (delegação de eventos) ---------- */

document.addEventListener('click', (e) => {
  const alvo = e.target.closest('[data-acao]');
  if (!alvo) return;
  const { acao, id, valor } = alvo.dataset;

  switch (acao) {
    case 'novo-anime':
      return abrirFormularioAnime();
    case 'editar':
      return abrirFormularioAnime(store.buscarPorId(id));
    case 'mais-episodio':
      return maisUmEpisodio(id);
    case 'remover':
      return confirmarRemocao(id);
    case 'filtrar':
      return store.set({ filtroStatus: valor });
    case 'tentar-novamente':
      return carregarAnimes();
    case 'sair':
      return sair();
  }
});

/* ---------- início ---------- */

renderizarNavbar(el.navbar, usuarioAtual());
configurarBusca(el.busca, (texto) => store.set({ busca: texto }));
store.inscrever(renderizar);
renderizar(store.get());
carregarAnimes();
