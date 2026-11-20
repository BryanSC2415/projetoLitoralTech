// ===============================================
// SEGURANÇA — 👤 Pessoa 1
// Protege a biblioteca: sem login, volta para o index.html
// ===============================================

const TEMPO_SESSAO = 30 * 60 * 1000; // 30 minutos

function fazerLogin(usuario) {
  localStorage.setItem('token', 'token-' + Date.now());
  localStorage.setItem('tokenExpira', Date.now() + TEMPO_SESSAO);
  localStorage.setItem('usuarioNome', usuario.nome);
  window.location.href = 'biblioteca.html';
}

function sair(motivo) {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpira');
  localStorage.removeItem('usuarioNome');

  if (motivo) {
    window.location.href = 'index.html?motivo=' + motivo;
  } else {
    window.location.href = 'index.html';
  }
}

function verificarLogin() {
  const token = localStorage.getItem('token');
  const expira = Number(localStorage.getItem('tokenExpira'));

  if (!token) {
    window.location.href = 'index.html';
  } else if (Date.now() > expira) {
    sair('expirou');
  }
}
