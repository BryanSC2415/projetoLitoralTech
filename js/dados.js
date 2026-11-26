// Imagem usada quando não tem capa ou o link falha
const IMAGEM_PADRAO = "https://placehold.co/300x450?text=Sem+imagem";

// Animes de exemplo, adicionados pelo próprio site
const ANIMES_INICIAIS = [
    {
        id: 1,
        titulo: "Frieren",
        imagem: "https://i.pinimg.com/1200x/93/88/89/9388895dd76dfc240a8e37a9143e6983.jpg",
        nota: 9.5,
        episodiosVistos: 18,
        totalEpisodios: 28,
        status: "assistindo",
        adicionadoPor: "AnimeTeca"
    },
    {
        id: 2,
        titulo: "Jujutsu Kaisen",
        imagem: "https://i.pinimg.com/1200x/5e/af/3c/5eaf3c6435abf357b399ab4cba7f8bd9.jpg",
        nota: 9.0,
        episodiosVistos: 24,
        totalEpisodios: 24,
        status: "finalizado",
        adicionadoPor: "AnimeTeca"
    },
    {
        id: 3,
        titulo: "Attack on Titan",
        imagem: "https://i.pinimg.com/1200x/fd/aa/d1/fdaad11b3d5ef645cb9548fb4ace27ad.jpg",
        nota: 9.8,
        episodiosVistos: 0,
        totalEpisodios: 75,
        status: "na-fila",
        adicionadoPor: "AnimeTeca"
    }
];
// Devolve a lista salva ou a de exemplo
function pegarAnimes(){
    const salvos = localStorage.getItem("animes");

    if(salvos){
        return JSON.parse(salvos);
    }
    return ANIMES_INICIAIS;
}

// Salva a lista no navegador
function salvarAnimes(lista){
    localStorage.setItem("animes", JSON.stringify(lista));
}

// Usuários (login e cadastro)

// Lista de usuários (vazia se ainda não tiver nenhum)
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Salva a lista de usuários
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Nome de quem está logado (vem do "loggedUser" salvo no login)
function pegarUsuarioLogado() {
  const salvo = localStorage.getItem('loggedUser');
  if (salvo) {
    return JSON.parse(salvo).username;
  }
  return "Desconhecido";
}
