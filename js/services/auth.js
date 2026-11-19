/*
 * AUTENTICAÇÃO (arquivo base — dono: Pessoa 1)
 * Funções que as telas chamam. Elas usam a api + storage por baixo.
 */

import { api } from './api.js';
import { salvarSessao, limparSessao, getUsuario } from './storage.js';
import { PAGINAS } from '../constants.js';

/** Faz login e salva a sessão. Lança ApiError se falhar. */
export async function entrar({ email, senha, lembrar = true }) {
  const sessao = await api.auth.login({ email, senha });
  salvarSessao(sessao, lembrar);
  return sessao.usuario;
}

/** Cria a conta e já deixa logado. Lança ApiError se falhar. */
export async function cadastrar({ nome, email, senha }) {
  const sessao = await api.auth.cadastrar({ nome, email, senha });
  salvarSessao(sessao, true);
  return sessao.usuario;
}

/**
 * Encerra a sessão e volta para o login.
 * @param {string} [motivo] ex.: 'expirada' → a tela de login pode mostrar um aviso
 */
export function sair(motivo) {
  limparSessao();
  const query = motivo ? `?motivo=${encodeURIComponent(motivo)}` : '';
  location.replace(PAGINAS.login + query);
}

export function usuarioAtual() {
  return getUsuario();
}
