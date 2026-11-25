// ===============================================
// FEEDBACK: avisos (toasts), botão carregando, erros e confirmação de remoção
// Adaptado do código do colega (antes feedback.js + modal.js com import/export).
// Agora são funções comuns, que qualquer página pode usar depois de carregar este arquivo.
// ===============================================

// ---------- Avisos no canto da tela (toasts) ----------

const ICONES_TOAST = {
  error: `<svg class="h-6 w-6 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M15 9l-6 6M9 9l6 6"/></svg>`,
  success: `<svg class="h-6 w-6 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 12l3 3 5-6"/></svg>`,
};

const CORES_TOAST = {
  error: "border-red-500 bg-red-50 text-red-800 dark:bg-slate-900 dark:text-red-300",
  success: "border-green-500 bg-green-50 text-green-800 dark:bg-slate-900 dark:text-green-300",
};

// Caixa no canto inferior direito onde os avisos aparecem (é criada na primeira vez)
function pegarCaixaDeToasts() {
  let caixa = document.getElementById("toast-container");
  if (!caixa) {
    caixa = document.createElement("div");
    caixa.id = "toast-container";
    caixa.setAttribute("aria-live", "polite"); // leitores de tela anunciam o aviso
    caixa.className = "fixed bottom-4 right-4 z-50 flex flex-col gap-3";
    document.body.appendChild(caixa);
  }
  return caixa;
}

// Mostra um aviso por alguns segundos. tipo: "success" (verde) ou "error" (vermelho)
function showToast(mensagem, tipo = "error", duracao = 4000) {
  const toast = document.createElement("div");
  toast.className = `animate-toast-in flex items-center gap-3 rounded-sm border-l-4 px-4 py-3 shadow-lg transition-all duration-300 ${CORES_TOAST[tipo]}`;
  toast.innerHTML = ICONES_TOAST[tipo];

  const texto = document.createElement("p");
  texto.className = "text-sm font-medium";
  texto.textContent = mensagem;
  toast.appendChild(texto);

  pegarCaixaDeToasts().appendChild(toast);

  // Depois do tempo, some devagar e é removido
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-x-4");
    setTimeout(() => toast.remove(), 300);
  }, duracao);
}

// ---------- Botão "carregando" ----------

// Troca o texto do botão por um círculo girando e desabilita o clique
function setButtonLoading(botao, carregando, texto = "Carregando...") {
  if (carregando) {
    botao.dataset.original = botao.innerHTML; // guarda o texto original
    botao.disabled = true;
    botao.classList.add("opacity-70", "cursor-not-allowed");
    botao.innerHTML = `<span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span> ${texto}`;
  } else {
    botao.disabled = false;
    botao.classList.remove("opacity-70", "cursor-not-allowed");
    botao.innerHTML = botao.dataset.original;
  }
}

// ---------- Mensagens de erro amigáveis ----------

// Recebe um código de erro (como os de um servidor) e mostra uma mensagem que a pessoa entende
function handleApiError(status, mensagemExtra) {
  const mensagens = {
    400: "Dados inválidos. Confira os campos.",
    401: "E-mail ou senha incorretos.",
    403: "Sua sessão expirou. Faça login novamente.",
    409: "Este anime já está na sua lista.",
    500: "Erro no servidor. Tente novamente em instantes.",
  };
  showToast(mensagens[status] || mensagemExtra || "Algo deu errado.", "error");
}

// ---------- Confirmação antes de remover ----------

const ICONE_ALERTA = `<svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.3 3.9L2.4 17.5A2 2 0 004.1 20.5h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/></svg>`;

// Abre a janela "Remover anime?" e espera a resposta.
// Devolve uma Promise: true se clicou em Remover, false se cancelou.
// Uso: if (await confirmDelete("Naruto")) { ...remove... }
function confirmDelete(nomeDoAnime = "este anime") {
  return new Promise((responder) => {
    const janela = document.createElement("dialog");
    janela.className =
      "m-auto w-[calc(100%-2rem)] max-w-sm rounded-sm border border-slate-200 bg-white p-0 text-slate-800 shadow-xl animate-toast-in backdrop:bg-black/70 dark:border-red-500 dark:bg-slate-900 dark:text-slate-100";

    janela.innerHTML = `
      <div class="p-6">
        <div class="flex items-start gap-4">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">${ICONE_ALERTA}</div>
          <div>
            <h2 class="text-lg font-semibold">Remover anime?</h2>
            <p data-texto class="mt-1 text-sm text-slate-600 dark:text-slate-400"></p>
          </div>
        </div>
        <div class="mt-6 flex justify-end gap-3">
          <button type="button" data-cancelar autofocus class="rounded-sm border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">Cancelar</button>
          <button type="button" data-confirmar class="rounded-sm bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Remover</button>
        </div>
      </div>`;

    // O nome vai com textContent para não quebrar o HTML se tiver caracteres especiais
    const texto = janela.querySelector("[data-texto]");
    texto.append("Você vai remover ");
    const negrito = document.createElement("strong");
    negrito.textContent = nomeDoAnime;
    texto.append(negrito, ". Essa ação não pode ser desfeita.");

    // Fecha a janela, apaga ela da página e entrega a resposta (true ou false)
    function fecharComResposta(resposta) {
      janela.close();
      janela.remove();
      responder(resposta);
    }

    janela.querySelector("[data-confirmar]").addEventListener("click", () => fecharComResposta(true));
    janela.querySelector("[data-cancelar]").addEventListener("click", () => fecharComResposta(false));

    // Clicar fora da janela = cancelar
    janela.addEventListener("click", (e) => {
      if (e.target === janela) fecharComResposta(false);
    });

    // Apertar Esc = cancelar
    janela.addEventListener("cancel", (e) => {
      e.preventDefault();
      fecharComResposta(false);
    });

    document.body.appendChild(janela);
    janela.showModal();
  });
}
