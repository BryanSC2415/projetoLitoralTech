// −1 / +1 episódio e remover anime
// Usa: pegarAnimes/salvarAnimes (dados.js), atualizarTela (biblioteca.js),
// showToast/confirmDelete (feedback.js)


// Muda o ep em +1 ou -1

function mudarEpisodio(id, delta) {
  const lista = pegarAnimes();
  const anime = lista.find((a) => a.id === id);
  if (!anime) return;

  const novo = anime.episodiosVistos + delta;

  // Limita a 0 ou ao total de eps
  if (novo < 0 || novo > anime.totalEpisodios) return;

  anime.episodiosVistos = novo;

  // Status muda conforme o progresso
  if (novo === anime.totalEpisodios) {
    anime.status = "finalizado"; // viu o último ep
  } else if (novo > 0 && anime.status !== "assistindo") {
    anime.status = "assistindo"; // começou a ver ou voltou um ep
  }

  salvarAnimes(lista);
  atualizarTela();

  if (delta > 0 && novo === anime.totalEpisodios) {
    showToast(`${anime.titulo} concluído!`, "success");
  }
}

// Pergunta antes e só remove se confirmar
async function removerAnime(id) {
  const anime = pegarAnimes().find((a) => a.id === id);
  if (!anime) return;

  // Espera clicar em Remover ou Cancelar
  const confirmou = await confirmDelete(anime.titulo);
  if (!confirmou) return;

  // Lista nova sem o anime removido
  const novaLista = pegarAnimes().filter((a) => a.id !== id);
  salvarAnimes(novaLista);
  atualizarTela();

  showToast(`${anime.titulo} removido da lista.`, "success");
}
