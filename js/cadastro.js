// Cadastro e edição de animes
// Usa pegarAnimes/salvarAnimes (dados.js) e atualizarTela (biblioteca.js)

// Abrir e fechar os modais

function fecharModal(id) {
  document.getElementById(id).close();
}
// Fecha o modal pelo id

// Clicar fora fecha o modal
for (const modal of document.querySelectorAll("dialog")) {
 let comecouFora = false; // lembra onde o clique começou
  modal.addEventListener("mousedown", (e) => {
    comecouFora = e.target === modal;
  });

// Só fecha se o clique começou fora

modal.addEventListener("click", (e)=> {
  if(comecouFora && e.target === modal) modal.close();
  comecouFora= false;
})

}

// Imagem por link

// Arruma o link colado
function limparLinkImagem(link) {
  link = link.trim();

  // Google Imagens: o link da imagem vem depois de "imgurl="
  if (link.includes("imgurl=")) {
    try {
      link = new URL(link).searchParams.get("imgurl") || link;
    } catch {
      // link estranho, deixa como está
    }
  }

  return link;
}

// Link da página do Pinterest (não é a imagem)
function ehPaginaDoPinterest(link) {
  return link.includes("pinterest.com/pin") || link.includes("pin.it/");
}

// Prévia da capa enquanto cola o link
function atualizarPreview() {
  const link = limparLinkImagem(document.getElementById("c-imagem").value);
  const preview = document.getElementById("c-preview");
  const aviso = document.getElementById("c-aviso-imagem");

  aviso.textContent = "";

  if (link === "") {
    preview.src = IMAGEM_PADRAO;
  } else if (ehPaginaDoPinterest(link)) {
    aviso.textContent =
      "Esse é o link da página do Pinterest. Abra o pin, clique com o botão direito na imagem e escolha \"Copiar endereço da imagem\".";
    preview.src = IMAGEM_PADRAO;
  } else {
    preview.src = link;
  }
}

// Link não carregou: avisa e usa a imagem padrão
document.getElementById("c-preview").addEventListener("error", () => {
  const preview = document.getElementById("c-preview");
  if (preview.src !== IMAGEM_PADRAO) {
    document.getElementById("c-aviso-imagem").textContent =
      "Não foi possível carregar essa imagem. Confira se o link é da imagem (geralmente termina em .jpg, .png ou .webp).";
    preview.src = IMAGEM_PADRAO;
  }
});

// Regras dos eps (cadastro e edição)

function validarEpisodios(vistos, total) {
  if (total < 1) return "O total de episódios precisa ser pelo menos 1.";
  if (vistos > total) return "Episódios vistos não pode ser maior que o total.";
  return ""; // vazio = tudo certo
}

// Cadastro

function abrirModalCadastro() {
  document.getElementById("form-cadastro").reset(); // limpa os campos
  document.getElementById("c-erro").textContent = "";
  atualizarPreview();
  document.getElementById("modal-cadastro").showModal();
}

function salvarCadastro(event) {
  event.preventDefault(); // não recarrega a página
  const form = event.target;

  const imagem = limparLinkImagem(form.imagem.value);
  const episodiosVistos = Number(form.episodiosVistos.value);
  const totalEpisodios = Number(form.totalEpisodios.value);

  // Confere as regras
  let erro = validarEpisodios(episodiosVistos, totalEpisodios);
  if (ehPaginaDoPinterest(imagem)) {
    erro = "O link da imagem é de uma página do Pinterest, não da imagem.";
  }
  if (erro !== "") {
    document.getElementById("c-erro").textContent = erro;
    return;
  }

  // Monta o anime no formato do dados.js
  const novoAnime = {
    id: Date.now(), // número único
    titulo: form.titulo.value.trim(),
    imagem: imagem,
    nota: form.nota.value === "" ? null : Number(form.nota.value), // vazio = sem nota
    episodiosVistos: episodiosVistos,
    totalEpisodios: totalEpisodios,
    status: form.status.value,
    adicionadoPor: pegarUsuarioLogado(), // quem está logado
  };

  const lista = pegarAnimes();

  // Não deixa repetir o mesmo título
  const jaExiste = lista.some((a) => a.titulo.toLowerCase() === novoAnime.titulo.toLowerCase());
  if (jaExiste) {
    handleApiError(409); // "Este anime já está na sua lista."
    return;
  }

  lista.unshift(novoAnime); // coloca no começo da lista
  salvarAnimes(lista);

  fecharModal("modal-cadastro");
  atualizarTela(); // redesenha os cards
  showToast(`${novoAnime.titulo} adicionado!`, "success");
}

// Edição

let idEmEdicao = null; // anime que está sendo editado

function abrirModalEdicao(id) {
  const anime = pegarAnimes().find((a) => a.id === id);
  if (!anime) return;

  idEmEdicao = id;
  const form = document.getElementById("form-edicao");

  // Preenche o modal com os dados do anime
  document.getElementById("e-titulo-anime").textContent = anime.titulo;
  document.getElementById("e-total-texto").textContent = `(de ${anime.totalEpisodios})`;
  document.getElementById("e-erro").textContent = "";
  form.status.value = anime.status;
  form.nota.value = anime.nota ?? ""; // null vira campo vazio
  form.episodiosVistos.value = anime.episodiosVistos;
  form.episodiosVistos.max = anime.totalEpisodios;

  document.getElementById("modal-edicao").showModal();
}

function salvarEdicao(event) {
  event.preventDefault();
  const form = event.target;

  const lista = pegarAnimes();
  const anime = lista.find((a) => a.id === idEmEdicao);
  const episodiosVistos = Number(form.episodiosVistos.value);

  const erro = validarEpisodios(episodiosVistos, anime.totalEpisodios);
  if (erro !== "") {
    document.getElementById("e-erro").textContent = erro;
    return;
  }

  // Muda só o que dá pra editar
  anime.status = form.status.value;
  anime.nota = form.nota.value === "" ? null : Number(form.nota.value);
  anime.episodiosVistos = episodiosVistos;

  salvarAnimes(lista);
  fecharModal("modal-edicao");
  atualizarTela();
  showToast("Alterações salvas!", "success");
}
