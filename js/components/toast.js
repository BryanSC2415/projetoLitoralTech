/*
 * TOAST (avisos rápidos) — 👤 Pessoa 4 (UX & Interatividade)
 *
 * Contrato: toast(mensagem, tipo = 'info')
 *   tipo: 'sucesso' | 'erro' | 'alerta' | 'info'
 *   Todo mundo chama essa função para dar feedback. Não crie alert().
 *
 * Versão mínima: caixinha simples que some em 3s.
 *
 * TODO Pessoa 4:
 *  [ ] Cor e ícone por tipo (usar cores do tema: sucesso, perigo, alerta, info)
 *  [ ] Animação de entrada/saída
 *  [ ] Vários toasts empilhados sem sobrepor
 *  [ ] Botão de fechar + pausar o tempo ao passar o mouse
 *  [ ] Acessibilidade: container com aria-live="polite"
 */

import { escaparHtml } from './ui.js';

function container() {
  let el = document.querySelector('#toasts');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toasts';
    el.className = 'fixed bottom-4 right-4 z-[60] flex flex-col gap-2';
    document.body.appendChild(el);
  }
  return el;
}

export function toast(mensagem, tipo = 'info') {
  const item = document.createElement('div');
  item.className = 'card px-4 py-3 text-sm shadow-lg';
  item.dataset.tipo = tipo;
  item.innerHTML = escaparHtml(mensagem);
  container().appendChild(item);
  setTimeout(() => item.remove(), 3000);
}
