/*
 * SESSÃO NO NAVEGADOR (arquivo base — dono: Pessoa 1)
 * Único lugar que mexe com as chaves de token/usuário.
 * "Lembrar de mim" marcado → localStorage (sobrevive ao fechar o navegador)
 * desmarcado → sessionStorage (some ao fechar a aba).
 *
 * Se mudar as chaves, mude também em js/guarda-rota.js.
 */

const CHAVE_TOKEN = 'animeteca:token';
const CHAVE_USUARIO = 'animeteca:usuario';

export function salvarSessao({ token, usuario }, lembrar = true) {
  limparSessao();
  const alvo = lembrar ? localStorage : sessionStorage;
  alvo.setItem(CHAVE_TOKEN, token);
  alvo.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
}

export function getToken() {
  return localStorage.getItem(CHAVE_TOKEN) ?? sessionStorage.getItem(CHAVE_TOKEN);
}

/** Troca só o token, mantendo onde ele estava salvo (usado pelo debug do mock). */
export function substituirToken(token) {
  const alvo = localStorage.getItem(CHAVE_TOKEN) !== null ? localStorage : sessionStorage;
  alvo.setItem(CHAVE_TOKEN, token);
}

export function getUsuario() {
  const bruto = localStorage.getItem(CHAVE_USUARIO) ?? sessionStorage.getItem(CHAVE_USUARIO);
  try {
    return bruto ? JSON.parse(bruto) : null;
  } catch {
    return null;
  }
}

export function limparSessao() {
  [localStorage, sessionStorage].forEach((s) => {
    s.removeItem(CHAVE_TOKEN);
    s.removeItem(CHAVE_USUARIO);
  });
}
