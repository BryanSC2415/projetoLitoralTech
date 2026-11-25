// Imagem usada quando o anime não tem capa ou quando o link da capa não funciona
const IMAGEM_PADRAO = "https://placehold.co/300x450?text=Sem+imagem";

const ANIMES_INICIAIS = [
    {
        id: 1,
        titulo: "Frieren",
        imagem: "https://placehold.co/300x450?text=Frieren",
        nota: 9.5,
        episodiosVistos: 18,
        totalEpisodios: 28,
        status: "assistindo"
    },
    {
        id: 2,
        titulo: "Jujutsu Kaisen",
        imagem: "https://placehold.co/300x450?text=Jujutsu+Kaisen",
        nota: 9.0,
        episodiosVistos: 24,
        totalEpisodios: 24,
        status: "finalizado"
    },
    {
        id: 3,
        titulo: "Attack on Titan",
        imagem: "https://placehold.co/300x450?text=Attack+on+Titan",
        nota: 9.8,
        episodiosVistos: 0,
        totalEpisodios: 75,
        status: "na-fila"
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
