// ===============================================
// AÇÕES RÁPIDAS (+1 episódio e remover) — 👤 Pessoa 4
// ===============================================

function maisUmEpisodio(id) {
  const anime = animes.find((a) => a.id === id);

  if (anime.episodiosVistos >= anime.totalEpisodios) {
    alert('Você já assistiu todos os episódios!');
    return;
  }

  anime.episodiosVistos++;

  // Se começou a assistir, sai da fila
  if (anime.status === 'fila') {
    anime.status = 'assistindo';
  }

  // Se chegou no último episódio, marca como finalizado
  if (anime.episodiosVistos === anime.totalEpisodios) {
    anime.status = 'finalizado';
  }

  salvarAnimes(animes);
  mostrarAnimes();
}

function removerAnime(id) {
  const anime = animes.find((a) => a.id === id);

  const confirmou = confirm('Remover "' + anime.titulo + '" da sua lista?');
  if (!confirmou) {
    return;
  }

  animes = animes.filter((a) => a.id !== id);
  salvarAnimes(animes);
  mostrarAnimes();
}
