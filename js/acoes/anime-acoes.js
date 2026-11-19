/*
 * AÇÕES RÁPIDAS DO CARD — 👤 Pessoa 4 (UX & Interatividade)
 *
 * Contrato (chamadas pela biblioteca.js quando clicam no card):
 *   maisUmEpisodio(id)     → +1 em episodiosVistos sem abrir o formulário
 *   confirmarRemocao(id)   → pergunta e, se confirmar, faz o DELETE
 *
 * TODO Pessoa 4:
 *  [ ] +1 Ep: não passar do total; ao chegar no último, mudar status para
 *      'finalizado' e comemorar com toast ("Você terminou X! 🎉")
 *  [ ] +1 Ep: se estava 'na-fila', mudar para 'assistindo' automaticamente
 *  [ ] Desabilitar o botão / spinner enquanto a API responde (evitar clique duplo)
 *  [ ] (Extra) atualização otimista: muda na tela na hora e desfaz se a API falhar
 *  [ ] Remoção: usar o nome do anime na confirmação + toast com "Desfazer" (extra)
 */

import { api } from '../services/api.js';
import { store } from '../store.js';
import { toast } from '../components/toast.js';
import { confirmar } from '../components/confirmar.js';
import { tratarErroApi } from '../components/estados.js';

export async function maisUmEpisodio(id) {
  const anime = store.buscarPorId(id);
  if (!anime) return;
  try {
    const atualizado = await api.animes.atualizar(id, { episodiosVistos: anime.episodiosVistos + 1 });
    store.substituirAnime(atualizado);
  } catch (erro) {
    tratarErroApi(erro);
  }
}

export async function confirmarRemocao(id) {
  const anime = store.buscarPorId(id);
  if (!anime) return;
  const ok = await confirmar({ titulo: 'Remover anime?', mensagem: anime.titulo, perigo: true });
  if (!ok) return;
  try {
    await api.animes.remover(id);
    store.removerAnime(id);
    toast('Anime removido.', 'sucesso');
  } catch (erro) {
    tratarErroApi(erro);
  }
}
