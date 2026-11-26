// Imagem usada quando o anime não tem capa ou quando o link da capa não funciona
const IMAGEM_PADRAO = "https://placehold.co/300x450?text=Sem+imagem";

const ANIMES_INICIAIS = [
    {
        id: 1,
        titulo: "Frieren",
        imagem: "https://i.pinimg.com/1200x/93/88/89/9388895dd76dfc240a8e37a9143e6983.jpg",
        nota: 9.5,
        episodiosVistos: 18,
        totalEpisodios: 28,
        status: "assistindo",
        adicionadoPor: "AnimeTeca" // animes de exemplo vêm do próprio site
    },
    {
        id: 2,
        titulo: "Jujutsu Kaisen",
        imagem: "https://i.pinimg.com/1200x/5e/af/3c/5eaf3c6435abf357b399ab4cba7f8bd9.jpg",
        nota: 9.0,
        episodiosVistos: 24,
        totalEpisodios: 24,
        status: "finalizado",
        adicionadoPor: "AnimeTeca" // animes de exemplo vêm do próprio site
    },
    {
        id: 3,
        titulo: "Attack on Titan",
        imagem: "https://i.pinimg.com/1200x/fd/aa/d1/fdaad11b3d5ef645cb9548fb4ace27ad.jpg",
        nota: 9.8,
        episodiosVistos: 0,
        totalEpisodios: 75,
        status: "na-fila",
        adicionadoPor: "AnimeTeca" // animes de exemplo vêm do próprio site
    }
];
//Devolve a lista
function pegarAnimes(){
    const salvos = localStorage.getItem("animes");

    if(salvos){
        return JSON.parse(salvos);
    }
    return ANIMES_INICIAIS;
}

//guarda alista no navegador
function salvarAnimes(lista){
    localStorage.setItem("animes", JSON.stringify(lista));
}

// ---------- Usuários (login e cadastro) ----------

// Lê a lista de usuários. Se não existir ainda, devolve uma lista vazia.
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Salva a lista de usuários (convertida em texto)
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Devolve o nome de quem está logado agora (o login guarda isso em "loggedUser")
function pegarUsuarioLogado() {
  const salvo = localStorage.getItem('loggedUser');
  if (salvo) {
    return JSON.parse(salvo).username;
  }
  return "Desconhecido";
}
