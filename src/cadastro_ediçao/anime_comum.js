const $ =(s) => document.querySelector(s);

function carregarAnimes(){
    try{
        return JSON.parse(localStorage.getItem("animes"))||[];

    }catch{
        return []
    }
}

function guardarAnimes (lista){
localStorage.setItem ("animes", JSON.stringify(lista));

}

function criarAnimes(dados){
const anime = {id: Date.now().toString(), ...}
guardarAnimes ([anime, ...carregarAnimes()]);
return anime;
}

function atualizarAnimes(anime) {
    guardarAnimes(carregarAnimes().map((a)=>(a.id === anime.id ? anime : a)));
    return anime;
    
}

function limitarVistos(form){
    const img = form.querySelector("[data-previw]")
    const url = form.image.value.trim();
    if (!url) return img.classList.add("hidden");
    img.src = url;
    img.classList.remove("hidden");
}




