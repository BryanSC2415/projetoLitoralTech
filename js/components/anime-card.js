/*
 * CARD DE ANIME + ESTADO VAZIO — 👤 Pessoa 2 (Biblioteca / Home)
 *
 * Contrato: renderizarCard(anime) → string HTML
 *   Botões do card usam data-acao + data-id (a biblioteca.js trata os cliques):
 *     data-acao="mais-episodio"  → Pessoa 4 implementa a ação
 *     data-acao="editar"         → abre o formulário da Pessoa 3
 *     data-acao="remover"        → Pessoa 4 implementa a confirmação
 *   NÃO adicione addEventListener nos cards. Só os atributos data-*.
 *
 * TODO Pessoa 2:
 *  [ ] Capa (anime.capaUrl) em proporção de pôster (aspect-[2/3], object-cover)
 *  [ ] Placeholder bonito quando capaUrl é '' ou a imagem falha (onerror)
 *  [ ] Nota com estrela (icones.estrela)
 *  [ ] Barra de progresso de episódios (episodiosVistos / totalEpisodios)
 *  [ ] Hover: leve zoom na capa + shadow-brilho, botões aparecendo
 *  [ ] Esconder "+1 Ep" quando já assistiu tudo
 *  [ ] Estado vazio diferente para "sem animes" x "busca sem resultado"
 */

import { STATUS } from '../constants.js';
import { escaparHtml, icones } from './ui.js';

export function renderizarCard(anime) {
  const status = STATUS[anime.status];
  return `
    <article class="card flex flex-col gap-3 p-4">
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-semibold leading-tight">${escaparHtml(anime.titulo)}</h3>
        <span class="${status.classeBadge}">${status.rotulo}</span>
      </div>
      <p class="text-sm text-texto-suave">
        Nota ${anime.nota} · Ep ${anime.episodiosVistos}/${anime.totalEpisodios}
      </p>
      <div class="mt-auto flex gap-2">
        <button type="button" class="btn-secundario flex-1" data-acao="mais-episodio" data-id="${anime.id}">+1 Ep</button>
        <button type="button" class="btn-icone btn-fantasma" data-acao="editar" data-id="${anime.id}" aria-label="Editar">${icones.editar}</button>
        <button type="button" class="btn-icone btn-fantasma hover:text-perigo" data-acao="remover" data-id="${anime.id}" aria-label="Remover">${icones.lixeira}</button>
      </div>
    </article>`;
}

/** @param {{ temBusca: boolean }} contexto */
export function renderizarVazio({ temBusca }) {
  return `
    <div class="col-span-full py-16 text-center text-texto-suave">
      ${temBusca ? 'Nenhum anime encontrado para essa busca.' : 'Nenhum anime aqui ainda.'}
    </div>`;
}
