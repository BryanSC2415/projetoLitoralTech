// Proteção das páginas e logout
// Carregado no <head> das páginas que precisam de login

const DURACAO_SESSAO = 60 * 60 * 1000; // 1 hora em ms

// O token é "token-" + a hora do login. Passou de 1 hora, expirou
function sessaoExpirada(token) {
  const horarioDoLogin = Number(token.replace("token-", ""));
  return Date.now() - horarioDoLogin > DURACAO_SESSAO;
}

// Sem token ou token velho: volta pro login
function verificarLogin() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "index.html";
  } else if (sessaoExpirada(token)) {
    sair("expirou"); // login mostra o aviso de sessão expirada
  }
}

// Apaga o token e volta pro login (o motivo vai na URL, ex: ?motivo=expirou)
function sair(motivo) {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");

  if (motivo) {
    window.location.href = "index.html?motivo=" + motivo;
  } else {
    window.location.href = "index.html";
  }
}
