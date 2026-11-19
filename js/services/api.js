/*
 * ============================================================
 *  API MOCK (arquivo base — dono: Pessoa 1)
 * ============================================================
 *  Finge ser um backend de verdade:
 *   - toda função é async e demora 300–900ms (para aparecer o loading)
 *   - exige token nas rotas de anime (igual um header Authorization)
 *   - devolve erros com status HTTP (401, 404, 409, 422, 500)
 *   - salva tudo no localStorage, então os dados sobrevivem ao F5
 *
 *  NINGUÉM acessa o localStorage dos animes direto: sempre via `api`.
 *  Assim, se um dia tiver backend real, só este arquivo muda.
 *
 *  Uso:
 *    import { api, ApiError } from '../services/api.js';
 *    const animes = await api.animes.listar();
 *
 *  Ferramentas para a APRESENTAÇÃO (digite no console do navegador):
 *    mockApi.expirarSessao()   → próxima chamada dá 401 "sessão expirada"
 *    mockApi.falharProxima()   → próxima chamada dá erro 500
 *    mockApi.resetar()         → volta o banco para os dados iniciais
 * ============================================================
 */

import { SEED_ANIMES, USUARIO_DEMO } from '../data/animes.mock.js';
import { STATUS, NOTA_MIN, NOTA_MAX } from '../constants.js';
import { getToken, substituirToken } from './storage.js';

const CHAVE_DB = 'animeteca:db';
const DURACAO_TOKEN_MS = 60 * 60 * 1000; // 1 hora
const LATENCIA_MIN_MS = 300;
const LATENCIA_MAX_MS = 900;

export class ApiError extends Error {
  constructor(mensagem, status, detalhes = null) {
    super(mensagem);
    this.name = 'ApiError';
    this.status = status;
    this.detalhes = detalhes; // ex.: { titulo: 'Obrigatório' } nos erros 422
  }
}

const debug = { falharProxima: false };

/* ---------- "banco de dados" ---------- */

function criarDbInicial() {
  return {
    usuarios: [USUARIO_DEMO],
    animes: SEED_ANIMES.map((a) => ({ ...a, usuarioId: USUARIO_DEMO.id })),
  };
}

function lerDb() {
  try {
    const bruto = localStorage.getItem(CHAVE_DB);
    if (bruto) return JSON.parse(bruto);
  } catch {
    /* banco corrompido → recria */
  }
  const db = criarDbInicial();
  salvarDb(db);
  return db;
}

function salvarDb(db) {
  localStorage.setItem(CHAVE_DB, JSON.stringify(db));
}

function gerarId(prefixo) {
  return `${prefixo}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

/* ---------- token falso (formato parecido com JWT) ---------- */

function gerarToken(usuarioId, expiraEm = Date.now() + DURACAO_TOKEN_MS) {
  return `mock.${btoa(JSON.stringify({ sub: usuarioId, exp: expiraEm }))}.assinatura`;
}

function autenticar() {
  const token = getToken();
  if (!token) throw new ApiError('Você precisa estar logado.', 401);
  let payload;
  try {
    payload = JSON.parse(atob(token.split('.')[1]));
  } catch {
    throw new ApiError('Sessão inválida. Faça login novamente.', 401);
  }
  if (payload.exp < Date.now()) {
    throw new ApiError('Sua sessão expirou. Faça login novamente.', 401);
  }
  return payload.sub;
}

/* ---------- utilidades ---------- */

function esperar() {
  const ms = LATENCIA_MIN_MS + Math.random() * (LATENCIA_MAX_MS - LATENCIA_MIN_MS);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Envolve cada "rota": espera, simula falha se pedido, devolve cópia dos dados. */
async function rota(fn) {
  await esperar();
  if (debug.falharProxima) {
    debug.falharProxima = false;
    throw new ApiError('O servidor teve um problema. Tente novamente.', 500);
  }
  return structuredClone(fn());
}

function semSenha({ senha, ...usuario }) {
  return usuario;
}

function validarAnime(dados) {
  const erros = {};
  if (!dados.titulo || !String(dados.titulo).trim()) erros.titulo = 'Informe o título.';
  if (!STATUS[dados.status]) erros.status = 'Status inválido.';
  if (!Number.isInteger(dados.totalEpisodios) || dados.totalEpisodios < 1)
    erros.totalEpisodios = 'Total de episódios deve ser um inteiro ≥ 1.';
  if (!Number.isInteger(dados.episodiosVistos) || dados.episodiosVistos < 0)
    erros.episodiosVistos = 'Episódios vistos deve ser um inteiro ≥ 0.';
  else if (dados.episodiosVistos > dados.totalEpisodios)
    erros.episodiosVistos = 'Não pode ser maior que o total.';
  if (typeof dados.nota !== 'number' || dados.nota < NOTA_MIN || dados.nota > NOTA_MAX)
    erros.nota = `Nota deve ser entre ${NOTA_MIN} e ${NOTA_MAX}.`;
  if (Object.keys(erros).length) throw new ApiError('Confira os campos destacados.', 422, erros);
}

const CAMPOS_EDITAVEIS = ['titulo', 'capaUrl', 'nota', 'status', 'episodiosVistos', 'totalEpisodios'];

function pegarCampos(dados) {
  return Object.fromEntries(CAMPOS_EDITAVEIS.filter((c) => c in dados).map((c) => [c, dados[c]]));
}

/* ---------- rotas ---------- */

export const api = {
  auth: {
    /** POST /auth/login → { token, usuario } */
    login: ({ email, senha }) =>
      rota(() => {
        const db = lerDb();
        const usuario = db.usuarios.find(
          (u) => u.email.toLowerCase() === String(email).trim().toLowerCase() && u.senha === senha,
        );
        if (!usuario) throw new ApiError('E-mail ou senha incorretos.', 401);
        return { token: gerarToken(usuario.id), usuario: semSenha(usuario) };
      }),

    /** POST /auth/cadastro → { token, usuario } */
    cadastrar: ({ nome, email, senha }) =>
      rota(() => {
        const db = lerDb();
        const emailNorm = String(email).trim().toLowerCase();
        if (db.usuarios.some((u) => u.email.toLowerCase() === emailNorm)) {
          throw new ApiError('Este e-mail já está cadastrado.', 409, { email: 'E-mail já em uso.' });
        }
        const usuario = { id: gerarId('u'), nome: String(nome).trim(), email: emailNorm, senha };
        db.usuarios.push(usuario);
        salvarDb(db);
        return { token: gerarToken(usuario.id), usuario: semSenha(usuario) };
      }),
  },

  animes: {
    /** GET /animes → Anime[] (só os do usuário logado) */
    listar: () =>
      rota(() => {
        const usuarioId = autenticar();
        return lerDb().animes.filter((a) => a.usuarioId === usuarioId);
      }),

    /** POST /animes → Anime */
    criar: (dados) =>
      rota(() => {
        const usuarioId = autenticar();
        const agora = new Date().toISOString();
        const anime = {
          capaUrl: '',
          nota: 0,
          status: 'na-fila',
          episodiosVistos: 0,
          ...pegarCampos(dados),
          id: gerarId('a'),
          usuarioId,
          criadoEm: agora,
          atualizadoEm: agora,
        };
        validarAnime(anime);
        const db = lerDb();
        db.animes.unshift(anime);
        salvarDb(db);
        return anime;
      }),

    /** PATCH /animes/:id → Anime (manda só os campos que mudaram) */
    atualizar: (id, parcial) =>
      rota(() => {
        const usuarioId = autenticar();
        const db = lerDb();
        const i = db.animes.findIndex((a) => a.id === id && a.usuarioId === usuarioId);
        if (i === -1) throw new ApiError('Anime não encontrado.', 404);
        const atualizado = { ...db.animes[i], ...pegarCampos(parcial), atualizadoEm: new Date().toISOString() };
        validarAnime(atualizado);
        db.animes[i] = atualizado;
        salvarDb(db);
        return atualizado;
      }),

    /** DELETE /animes/:id → { id } */
    remover: (id) =>
      rota(() => {
        const usuarioId = autenticar();
        const db = lerDb();
        const antes = db.animes.length;
        db.animes = db.animes.filter((a) => !(a.id === id && a.usuarioId === usuarioId));
        if (db.animes.length === antes) throw new ApiError('Anime não encontrado.', 404);
        salvarDb(db);
        return { id };
      }),
  },
};

/* ---------- atalhos de debug para a apresentação ---------- */

window.mockApi = {
  expirarSessao() {
    const token = getToken();
    if (!token) return console.warn('Ninguém logado.');
    const { sub } = JSON.parse(atob(token.split('.')[1]));
    substituirToken(gerarToken(sub, Date.now() - 1000));
    console.info('✔ Sessão expirada. A próxima ação vai receber 401.');
  },
  falharProxima() {
    debug.falharProxima = true;
    console.info('✔ A próxima chamada à API vai falhar com 500.');
  },
  resetar() {
    salvarDb(criarDbInicial());
    console.info('✔ Banco resetado. Recarregue a página.');
  },
};
