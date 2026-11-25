// ===============================================
// AÇÕES RÁPIDAS DO CARD: −1 / +1 episódio e remover anime
// Adaptado do anime-card.js do colega para o formato do dados.js.
// Usa: pegarAnimes/salvarAnimes (dados.js), atualizarTela (biblioteca.js),
//      showToast/confirmDelete (feedback.js)
// ===============================================

// Muda o episódio visto em +1 ou -1 sem abrir a tela de edição.
// delta = 1 (botão +) ou -1 (botão −)
function mudarEpisodio(id, delta) {
  const lista = pegarAnimes();
  const anime = lista.find((a) => a.id === id);
  if (!anime) return;

  const novo = anime.episodiosVistos + delta;

  // Não deixa passar de 0 nem do total
  if (novo < 0 || novo > anime.totalEpisodios) return;

  anime.episodiosVistos = novo;

  // O status acompanha o progresso (ideia do colega):
  if (novo === anime.totalEpisodios) {
    anime.status = "finalizado"; // viu o último episódio
  } else if (novo > 0 && anime.status !== "assistindo") {
    anime.status = "assistindo"; // começou a ver, ou voltou um episódio de um finalizado
  }

  salvarAnimes(lista);
  atualizarTela();

  if (delta > 0 && novo === anime.totalEpisodios) {
    showToast(`${anime.titulo} concluído!`, "success");
  }
}

// Pergunta antes de remover (confirmDelete) e só remove se a pessoa confirmar
async function removerAnime(id) {
  const anime = pegarAnimes().find((a) => a.id === id);
  if (!anime) return;

  // "await" espera a pessoa clicar em Remover ou Cancelar
  const confirmou = await confirmDelete(anime.titulo);
  if (!confirmou) return;

  // filter cria uma lista nova SEM o anime removido
  const novaLista = pegarAnimes().filter((a) => a.id !== id);
  salvarAnimes(novaLista);
  atualizarTela();

  showToast(`${anime.titulo} removido da lista.`, "success");
}
