// ===============================================
// MODAL DE ADICIONAR / EDITAR — 👤 Pessoa 3
// ===============================================

// Abre o modal. Sem id = novo anime. Com id = editar esse anime.
function abrirModal(id) {
  document.getElementById('erroModal').textContent = '';

  if (id) {
    const anime = animes.find((a) => a.id === id);
    document.getElementById('modalTitulo').textContent = 'Editar anime';
    document.getElementById('campoId').value = anime.id;
    document.getElementById('campoTitulo').value = anime.titulo;
    document.getElementById('campoImagem').value = anime.imagem;
    document.getElementById('campoStatus').value = anime.status;
    document.getElementById('campoNota').value = anime.nota;
    document.getElementById('campoVistos').value = anime.episodiosVistos;
    document.getElementById('campoTotal').value = anime.totalEpisodios;
  } else {
    document.getElementById('modalTitulo').textContent = 'Novo anime';
    document.getElementById('campoId').value = '';
    document.getElementById('campoTitulo').value = '';
    document.getElementById('campoImagem').value = '';
    document.getElementById('campoStatus').value = 'fila';
    document.getElementById('campoNota').value = 0;
    document.getElementById('campoVistos').value = 0;
    document.getElementById('campoTotal').value = 12;
  }

  document.getElementById('modal').classList.remove('hidden');
}

function fecharModal() {
  document.getElementById('modal').classList.add('hidden');
}

function salvarAnime(event) {
  event.preventDefault();

  const id = document.getElementById('campoId').value;
  const titulo = document.getElementById('campoTitulo').value.trim();
  const imagem = document.getElementById('campoImagem').value.trim();
  const status = document.getElementById('campoStatus').value;
  const nota = Number(document.getElementById('campoNota').value);
  const episodiosVistos = Number(document.getElementById('campoVistos').value);
  const totalEpisodios = Number(document.getElementById('campoTotal').value);

  // Validação
  const erro = document.getElementById('erroModal');
  if (titulo === '') {
    erro.textContent = 'Digite o título.';
    return;
  }
  if (nota < 0 || nota > 10) {
    erro.textContent = 'A nota deve ser de 0 a 10.';
    return;
  }
  if (totalEpisodios < 1) {
    erro.textContent = 'O total de episódios deve ser pelo menos 1.';
    return;
  }
  if (episodiosVistos < 0 || episodiosVistos > totalEpisodios) {
    erro.textContent = 'Episódios vistos deve estar entre 0 e o total.';
    return;
  }

  const dados = { titulo, imagem, status, nota, episodiosVistos, totalEpisodios };

  if (id) {
    // Editando: substitui o anime com esse id
    animes = animes.map((a) => (a.id === Number(id) ? { ...a, ...dados } : a));
  } else {
    // Novo: cria com um id único
    animes.unshift({ id: Date.now(), ...dados });
  }

  salvarAnimes(animes);
  mostrarAnimes();
  fecharModal();
}
