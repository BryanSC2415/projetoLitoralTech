/*
 * ESTADO DA BIBLIOTECA (arquivo base — dono: Pessoa 1)
 *
 * Um único objeto guarda tudo que a Home mostra. Ninguém guarda
 * lista de animes em variável própria: lê daqui e altera por aqui.
 * Toda vez que o estado muda, a página redesenha sozinha.
 *
 *   import { store } from '../store.js';
 *   store.get().animes
 *   store.set({ filtroStatus: 'assistindo' })
 *   store.substituirAnime(animeAtualizado)
 */

const estado = {
  animes: [],
  filtroStatus: 'todos', // um dos valores de FILTROS (constants.js)
  busca: '',
  carregando: true,
  erro: null, // ApiError ou null
};

const ouvintes = new Set();

function avisar() {
  ouvintes.forEach((fn) => fn(estado));
}

export const store = {
  get: () => estado,

  set(parcial) {
    Object.assign(estado, parcial);
    avisar();
  },

  /** Registra uma função chamada a cada mudança. Retorna função para cancelar. */
  inscrever(fn) {
    ouvintes.add(fn);
    return () => ouvintes.delete(fn);
  },

  adicionarAnime(anime) {
    store.set({ animes: [anime, ...estado.animes] });
  },

  substituirAnime(anime) {
    store.set({ animes: estado.animes.map((a) => (a.id === anime.id ? anime : a)) });
  },

  removerAnime(id) {
    store.set({ animes: estado.animes.filter((a) => a.id !== id) });
  },

  buscarPorId(id) {
    return estado.animes.find((a) => a.id === id) ?? null;
  },
};

/** Animes que devem aparecer na grid, aplicando aba + busca. */
export function animesVisiveis({ animes, filtroStatus, busca }) {
  const termo = busca.trim().toLowerCase();
  return animes.filter(
    (a) =>
      (filtroStatus === 'todos' || a.status === filtroStatus) &&
      (!termo || a.titulo.toLowerCase().includes(termo)),
  );
}

/** Quantidade por aba, ex.: { todos: 12, assistindo: 5, ... } */
export function contarPorStatus(animes) {
  const contagem = { todos: animes.length };
  animes.forEach((a) => (contagem[a.status] = (contagem[a.status] ?? 0) + 1));
  return contagem;
}
