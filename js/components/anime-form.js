/*
 * FORMULÁRIO DE CADASTRO / EDIÇÃO — 👤 Pessoa 3
 *
 * Contrato: abrirFormularioAnime(anime?)
 *   sem argumento → modo "Novo anime" → api.animes.criar() → store.adicionarAnime()
 *   com anime     → modo "Editar"     → api.animes.atualizar(id, campos) → store.substituirAnime()
 *   Use abrirModal() de ui.js (não crie outro modal) e toast() da Pessoa 4.
 *
 * Versão mínima: só cria com título + total de episódios.
 *
 * TODO Pessoa 3:
 *  [ ] Campos: título, URL da capa, status (select com STATUS), nota (0–10),
 *      episódios vistos, total de episódios
 *  [ ] Pré-visualização da capa ao digitar a URL (com fallback se a imagem falhar)
 *  [ ] Modo edição: preencher os campos com o anime recebido, título "Editar anime"
 *  [ ] Validação no front ANTES de chamar a API (mesmas regras do validarAnime em api.js)
 *  [ ] Se a API devolver 422, mostrar erro.detalhes embaixo de cada campo
 *  [ ] Regras amigáveis: status "Finalizado" → vistos = total; vistos = total → sugerir Finalizado
 *  [ ] Nota com estrelas ou slider (input range) em vez de número cru
 *  [ ] Botão "Salvar" com spinner e desabilitado durante o envio
 */

import { api } from '../services/api.js';
import { store } from '../store.js';
import { abrirModal, escaparHtml } from './ui.js';
import { toast } from './toast.js';
import { tratarErroApi } from './estados.js';

export function abrirFormularioAnime(anime = null) {
  const editando = Boolean(anime);

  const modal = abrirModal({
    titulo: editando ? 'Editar anime' : 'Novo anime',
    conteudo: `
      <form class="space-y-4" novalidate>
        <div>
          <label class="label" for="campo-titulo">Título</label>
          <input class="input" id="campo-titulo" name="titulo" value="${escaparHtml(anime?.titulo ?? '')}" required>
        </div>
        <div>
          <label class="label" for="campo-total">Total de episódios</label>
          <input class="input" id="campo-total" name="totalEpisodios" type="number" min="1" value="${anime?.totalEpisodios ?? 12}">
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" class="btn-fantasma" data-fechar-modal>Cancelar</button>
          <button type="submit" class="btn-primario">Salvar</button>
        </div>
      </form>`,
  });

  const form = modal.corpo.querySelector('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(form));
    const campos = { titulo: dados.titulo, totalEpisodios: Number(dados.totalEpisodios) };

    try {
      if (editando) {
        store.substituirAnime(await api.animes.atualizar(anime.id, campos));
        toast('Anime atualizado!', 'sucesso');
      } else {
        store.adicionarAnime(await api.animes.criar(campos));
        toast('Anime adicionado!', 'sucesso');
      }
      modal.fechar();
    } catch (erro) {
      tratarErroApi(erro);
    }
  });
}
