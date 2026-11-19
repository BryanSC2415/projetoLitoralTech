/*
 * GUARDA DE ROTA (arquivo base — dono: Pessoa 1)
 *
 * Script NORMAL (não é module) colocado no <head> das páginas.
 * Roda antes da página aparecer, então não "pisca" conteúdo protegido.
 *
 * Uso no <head>:
 *   <script src="js/guarda-rota.js" data-modo="privada"></script>  → exige login
 *   <script src="js/guarda-rota.js" data-modo="publica"></script>  → se já logado, vai pra biblioteca
 *
 * As chaves precisam ser iguais às de js/services/storage.js.
 */
(function () {
  var CHAVE_TOKEN = 'animeteca:token';
  var modo = document.currentScript.dataset.modo || 'privada';

  function tokenValido() {
    var token = localStorage.getItem(CHAVE_TOKEN) || sessionStorage.getItem(CHAVE_TOKEN);
    if (!token) return { ok: false, motivo: 'sem-sessao' };
    try {
      var payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp < Date.now()) return { ok: false, motivo: 'expirada' };
      return { ok: true };
    } catch (e) {
      return { ok: false, motivo: 'sem-sessao' };
    }
  }

  var sessao = tokenValido();
  if (modo === 'privada' && !sessao.ok) {
    location.replace('login.html?motivo=' + sessao.motivo);
  } else if (modo === 'publica' && sessao.ok) {
    location.replace('biblioteca.html');
  }
})();
