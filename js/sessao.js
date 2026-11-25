// ===============================================
// SESSÃO: proteção das páginas e logout
// Carregado no <head> das páginas que exigem login
// ===============================================

// Sem token = não fez login. Manda de volta para a tela de login.
function verificarLogin() {
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
  }
}

// Botão "Sair": apaga o token e o usuário logado e volta para o login
function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  window.location.href = "index.html";
}
