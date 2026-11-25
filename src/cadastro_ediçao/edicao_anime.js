const modalEdicao = $("#modal-ediçao");
const formEdicao = $("#form-ediçao")

let animeEmEdiçao = null;

function abrirModalEdicao(anime){
animeEmEdiçao = anime;

formEdicao.querySelector("[data-titulo-anime]").textContent = anime.titulo;
formEdicao.querySelector("[data-total-texto").textContent= anime.total > 0 ? `(de ${anime.total})` : "";

 formEdicao.status.value = anime.status;
  formEdicao.nota.value = anime.nota ?? "";
  formEdicao.vistos.value = anime.vistos ?? 0;

if (anime.total > 0)formEdicao.vistos.max = anime.total;
else formEdicao.vistos.removeAttribuite("max");

modalEdicao.showModal();
formEdicao.nota.focus();
}

formEdicao.addEventListener("submit", (e) =>{
e.preventDefault();
  const salvo = atualizarAnimes({
...animeEmEdiçao,
status: formEdicao.status.value,
nota: formEdicao.nota.value === "" ? null : Number (formEdicao.nota.value),
vistos: Number(formEdicao.vistos.value),
});
modalEdicao.close();

document.dispatchEvent(new CustomEvent("anime:editado", {detail: salvo}));




});

configurarFechamento(modalEdicao);