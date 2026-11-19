/*
 * ABAS DE FILTRO + BUSCA — 👤 Pessoa 2 (Biblioteca / Home)
 *
 * Contrato:
 *   renderizarFiltros(elemento, estado) → desenha as abas
 *     cada aba usa data-acao="filtrar" data-valor="<valor>" (biblioteca.js trata)
 *   configurarBusca(input, aoBuscar) → liga o campo de busca
 *     aoBuscar(texto) já atualiza o store (quem chama é a biblioteca.js)
 *
 * TODO Pessoa 2:
 *  [ ] Mostrar a contagem em cada aba: "Assistindo (5)" → use contarPorStatus()
 *  [ ] Abas roláveis na horizontal no celular (overflow-x-auto)
 *  [ ] Busca com debounce (~250ms) para não filtrar a cada tecla
 *  [ ] Botão "x" para limpar a busca / tecla Esc limpa
 *  [ ] Acessibilidade: role="tablist", aria-selected na aba ativa
 */

import { FILTROS } from '../constants.js';

export function renderizarFiltros(elemento, estado) {
  elemento.innerHTML = FILTROS.map(
    (f) => `
      <button type="button" class="aba ${estado.filtroStatus === f.valor ? 'aba-ativa' : ''}"
              data-acao="filtrar" data-valor="${f.valor}">
        ${f.rotulo}
      </button>`,
  ).join('');
}

export function configurarBusca(input, aoBuscar) {
  input.addEventListener('input', () => aoBuscar(input.value));
}
