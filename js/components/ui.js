/*
 * PEÇAS DE UI COMPARTILHADAS (arquivo base — dono: Pessoa 1)
 * Antes de criar um modal/ícone/spinner novo, veja se já existe aqui.
 */

/** SEMPRE use ao colocar texto do usuário dentro de HTML (evita quebrar a página / XSS). */
export function escaparHtml(valor) {
  return String(valor ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** Ícones SVG (traço, herdam a cor do texto). Uso: `${icones.mais}` */
const svg = (d) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true">${d}</svg>`;

export const icones = {
  mais: svg('<path d="M12 5v14M5 12h14"/>'),
  editar: svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>'),
  lixeira: svg('<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/>'),
  sair: svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>'),
  busca: svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
  estrela: svg('<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z"/>'),
  fechar: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
  alerta: svg('<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>'),
};

export function spinner(classe = 'h-5 w-5') {
  return `<span class="${classe} inline-block animate-spin rounded-full border-2 border-current border-t-transparent" role="status" aria-label="Carregando"></span>`;
}

/**
 * Modal base. Formulário de anime (Pessoa 3) e confirmação (Pessoa 4)
 * usam este mesmo modal, então todos ficam com a mesma cara.
 *
 * @param {{ titulo: string, conteudo: string, aoFechar?: () => void, largura?: string }} opcoes
 * @returns {{ elemento: HTMLElement, corpo: HTMLElement, fechar: () => void }}
 */
export function abrirModal({ titulo, conteudo, aoFechar, largura = 'max-w-lg' }) {
  const fundo = document.createElement('div');
  fundo.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm';
  fundo.innerHTML = `
    <div class="card w-full ${largura} p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
      <div class="mb-4 flex items-start justify-between gap-4">
        <h2 id="modal-titulo" class="text-lg font-semibold">${escaparHtml(titulo)}</h2>
        <button type="button" class="btn-icone btn-fantasma -mr-2 -mt-1" data-fechar-modal aria-label="Fechar">${icones.fechar}</button>
      </div>
      <div data-corpo-modal>${conteudo}</div>
    </div>`;

  const focoAnterior = document.activeElement;

  function fechar() {
    document.removeEventListener('keydown', aoTeclar);
    fundo.remove();
    focoAnterior?.focus?.();
    aoFechar?.();
  }

  function aoTeclar(e) {
    if (e.key === 'Escape') fechar();
  }

  fundo.addEventListener('click', (e) => {
    if (e.target === fundo || e.target.closest('[data-fechar-modal]')) fechar();
  });
  document.addEventListener('keydown', aoTeclar);
  document.body.appendChild(fundo);

  fundo.querySelector('input, select, textarea, button:not([data-fechar-modal])')?.focus();

  return { elemento: fundo, corpo: fundo.querySelector('[data-corpo-modal]'), fechar };
}
