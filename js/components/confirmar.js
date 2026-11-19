/*
 * DIÁLOGO DE CONFIRMAÇÃO — 👤 Pessoa 4 (UX & Interatividade)
 *
 * Contrato: await confirmar({ titulo, mensagem, textoConfirmar, perigo }) → true | false
 *   Exemplo: if (await confirmar({ titulo: 'Remover anime?', perigo: true })) { ... }
 *   A Pessoa 1 também vai usar no botão "Sair".
 *
 * Versão mínima: usa o confirm() feio do navegador.
 *
 * TODO Pessoa 4:
 *  [ ] Trocar por abrirModal() de ui.js com botões "Cancelar" e "Remover"
 *  [ ] perigo: true → botão .btn-perigo e ícone de alerta
 *  [ ] Mostrar o nome do anime na mensagem ("Remover Naruto da sua lista?")
 *  [ ] Esc / clique fora = cancelar (resolver false)
 */

export function confirmar({ titulo = 'Tem certeza?', mensagem = '', textoConfirmar = 'Confirmar', perigo = false } = {}) {
  return Promise.resolve(window.confirm(`${titulo}\n\n${mensagem}`));
}
