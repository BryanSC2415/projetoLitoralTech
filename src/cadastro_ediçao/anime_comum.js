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
const anime = {id: Date.now().toString(), ...dados};
guardarAnimes ([anime, ...carregarAnimes()]);
return anime;
}

function atualizarAnimes(anime) {
    guardarAnimes(carregarAnimes().map((a)=>(a.id === anime.id ? anime : a)));
    return anime;
    
}

function limitarVistos(form){
const total = Number(form.total.value);
if(total > 0) form.vistos.max = total;
else form.vistos.removeAttribute("max")

}



function atualizarPreview(form){
 const img = form.querySelector("[data-previw]");
 const url= form.img.value.trim();
 if (!url) return img.classList.add("hidden");
 img.src= url;
 img.classList.remove("hidden");

     
}

Document.querySelectorAll("[data-preview]").forEach((img) => 
img.addEventListener("error", ()=> img.classList.add("hidden"))
);

function configurarFechamento(modal){
    modal.querySelector("[data-cancelar]").addEventListener("click",()=> modal.close());
modal.addEventListener("click",(e)=> {
    if (e.target === modal) modal.close();
});    
}




