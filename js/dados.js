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
