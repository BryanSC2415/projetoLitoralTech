// ===============================================
// DADOS (mock) — simula o banco de dados
// Tudo fica salvo no localStorage do navegador.
// ===============================================

// Animes que aparecem na primeira vez que o site abre
const ANIMES_INICIAIS = [
  { id: 1, titulo: 'Fullmetal Alchemist: Brotherhood', imagem: '', nota: 10, status: 'finalizado', episodiosVistos: 64, totalEpisodios: 64 },
  { id: 2, titulo: 'Attack on Titan', imagem: '', nota: 9, status: 'assistindo', episodiosVistos: 59, totalEpisodios: 87 },
  { id: 3, titulo: 'Frieren', imagem: '', nota: 9.5, status: 'assistindo', episodiosVistos: 18, totalEpisodios: 28 },
  { id: 4, titulo: 'Jujutsu Kaisen', imagem: '', nota: 8.5, status: 'assistindo', episodiosVistos: 30, totalEpisodios: 47 },
  { id: 5, titulo: 'Spy x Family', imagem: '', nota: 8, status: 'finalizado', episodiosVistos: 37, totalEpisodios: 37 },
  { id: 6, titulo: 'Vinland Saga', imagem: '', nota: 9, status: 'fila', episodiosVistos: 0, totalEpisodios: 48 },
  { id: 7, titulo: 'Cowboy Bebop', imagem: '', nota: 9, status: 'fila', episodiosVistos: 0, totalEpisodios: 26 },
  { id: 8, titulo: 'Chainsaw Man', imagem: '', nota: 8, status: 'assistindo', episodiosVistos: 6, totalEpisodios: 12 },
];

// Usuário de teste
const USUARIOS_INICIAIS = [
  { nome: 'Usuário Demo', email: 'demo@email.com', senha: '123456' },
];

// Nomes que aparecem na tela para cada status
const NOMES_STATUS = {
  assistindo: 'Assistindo',
  finalizado: 'Finalizado',
  fila: 'Na Fila',
};

// ---------- Animes ----------

function lerAnimes() {
  const salvos = localStorage.getItem('animes');
  if (salvos) {
    return JSON.parse(salvos);
  }
  return ANIMES_INICIAIS;
}

function salvarAnimes(lista) {
  localStorage.setItem('animes', JSON.stringify(lista));
}

// ---------- Usuários ----------

function lerUsuarios() {
  const salvos = localStorage.getItem('usuarios');
  if (salvos) {
    return JSON.parse(salvos);
  }
  return USUARIOS_INICIAIS;
}

function salvarUsuarios(lista) {
  localStorage.setItem('usuarios', JSON.stringify(lista));
}
