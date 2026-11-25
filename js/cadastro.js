// ===============================================
// CADASTRO E EDIÇÃO DE ANIMES
// Adaptado do código do colega (antes em src/cadastro_ediçao/).
// Usa pegarAnimes() / salvarAnimes() do dados.js
// e atualizarTela() do biblioteca.js para redesenhar os cards.
// ===============================================

// ---------- Abrir e fechar os modais ----------

function fecharModal(id) {
  document.getElementById(id).close();
}

// Clicar fora da janela (na parte escura) também fecha o modal
for (const modal of document.querySelectorAll("dialog")) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });
}

// ---------- Imagem a partir de um link da internet ----------

// Arruma o link colado pela pessoa
function limparLinkImagem(link) {
  link = link.trim();

  // Link do Google Imagens: a imagem de verdade vem depois de "imgurl="
  if (link.includes("imgurl=")) {
    try {
      link = new URL(link).searchParams.get("imgurl") || link;
    } catch {
      // se não der para ler o link, deixa como está
    }
  }

  return link;
}

// Link da PÁGINA do Pinterest (não é a imagem em si)
function ehPaginaDoPinterest(link) {
  return link.includes("pinterest.com/pin") || link.includes("pin.it/");
}

// Mostra a prévia da capa enquanto a pessoa digita/cola o link
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

// Se o link não carregar uma imagem, avisa e volta para a imagem padrão
document.getElementById("c-preview").addEventListener("error", () => {
  const preview = document.getElementById("c-preview");
  if (preview.src !== IMAGEM_PADRAO) {
    document.getElementById("c-aviso-imagem").textContent =
      "Não foi possível carregar essa imagem. Confira se o link é da imagem (geralmente termina em .jpg, .png ou .webp).";
    preview.src = IMAGEM_PADRAO;
  }
});

// ---------- Regras dos episódios (usada no cadastro e na edição) ----------

function validarEpisodios(vistos, total) {
  if (total < 1) return "O total de episódios precisa ser pelo menos 1.";
  if (vistos > total) return "Episódios vistos não pode ser maior que o total.";
  return ""; // vazio = está tudo certo
}

// ---------- CADASTRO ----------

function abrirModalCadastro() {
  document.getElementById("form-cadastro").reset(); // limpa os campos
  document.getElementById("c-erro").textContent = "";
  atualizarPreview();
  document.getElementById("modal-cadastro").showModal();
}

function salvarCadastro(event) {
  event.preventDefault(); // impede o formulário de recarregar a página
  const form = event.target;

  const imagem = limparLinkImagem(form.imagem.value);
  const episodiosVistos = Number(form.episodiosVistos.value);
  const totalEpisodios = Number(form.totalEpisodios.value);

  // Confere as regras antes de salvar
  let erro = validarEpisodios(episodiosVistos, totalEpisodios);
  if (ehPaginaDoPinterest(imagem)) {
    erro = "O link da imagem é de uma página do Pinterest, não da imagem.";
  }
  if (erro !== "") {
    document.getElementById("c-erro").textContent = erro;
    return;
  }

  // Monta o anime no mesmo formato do dados.js
  const novoAnime = {
    id: Date.now(), // número único (os milissegundos de agora)
    titulo: form.titulo.value.trim(),
    imagem: imagem,
    nota: form.nota.value === "" ? null : Number(form.nota.value), // vazio = sem nota
    episodiosVistos: episodiosVistos,
    totalEpisodios: totalEpisodios,
    status: form.status.value,
  };

  const lista = pegarAnimes();

  // Não deixa cadastrar o mesmo título duas vezes (erro 409 do feedback.js)
  const jaExiste = lista.some((a) => a.titulo.toLowerCase() === novoAnime.titulo.toLowerCase());
  if (jaExiste) {
    handleApiError(409); // "Este anime já está na sua lista."
    return;
  }

  lista.unshift(novoAnime); // unshift = coloca no COMEÇO da lista
  salvarAnimes(lista);

  fecharModal("modal-cadastro");
  atualizarTela(); // redesenha os cards (respeitando aba e pesquisa)
  showToast(`${novoAnime.titulo} adicionado!`, "success");
}

// ---------- EDIÇÃO ----------

let idEmEdicao = null; // lembra qual anime está sendo editado

function abrirModalEdicao(id) {
  const anime = pegarAnimes().find((a) => a.id === id);
  if (!anime) return;

  idEmEdicao = id;
  const form = document.getElementById("form-edicao");

  // Preenche o modal com os dados atuais do anime
  document.getElementById("e-titulo-anime").textContent = anime.titulo;
  document.getElementById("e-total-texto").textContent = `(de ${anime.totalEpisodios})`;
  document.getElementById("e-erro").textContent = "";
  form.status.value = anime.status;
  form.nota.value = anime.nota ?? ""; // ?? = se for null, usa ""
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

  // Muda só o que pode ser editado
  anime.status = form.status.value;
  anime.nota = form.nota.value === "" ? null : Number(form.nota.value);
  anime.episodiosVistos = episodiosVistos;

  salvarAnimes(lista);
  fecharModal("modal-edicao");
  atualizarTela();
  showToast("Alterações salvas!", "success");
}
