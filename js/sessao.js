// ===============================================
// SESSÃO: proteção das páginas e logout
// Carregado no <head> das páginas que exigem login
// ===============================================

const DURACAO_SESSAO = 60 * 60 * 1000; // 1 hora, em milissegundos

// O token é "token-" + o horário do login (ex: "token-1764000000000").
// Esta função devolve true se o login foi feito há mais tempo que a DURACAO_SESSAO.
function sessaoExpirada(token) {
  const horarioDoLogin = Number(token.replace("token-", ""));
  return Date.now() - horarioDoLogin > DURACAO_SESSAO;
}

// Sem token = não fez login. Token velho = sessão expirou. Nos dois casos, volta para o login.
function verificarLogin() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "index.html";
  } else if (sessaoExpirada(token)) {
    sair("expirou"); // o login vai mostrar "Sua sessão expirou"
  }
}

// Botão "Sair": apaga o token e o usuário logado e volta para o login.
// Se receber um motivo, ele vai na URL (ex: index.html?motivo=expirou)
function sair(motivo) {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");

  if (motivo) {
    window.location.href = "index.html?motivo=" + motivo;
  } else {
    window.location.href = "index.html";
  }
}
