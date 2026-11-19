/*
 * LOADING + ERROS — 👤 Pessoa 4 (UX & Interatividade)
 *
 * Contrato:
 *   renderizarCarregando() → HTML mostrado na grid enquanto a API responde
 *   renderizarErro(erro)   → HTML de erro na grid, com botão data-acao="tentar-novamente"
 *   tratarErroApi(erro)    → TODO mundo chama no catch. Decide o que fazer:
 *                            401 → sessão expirada → logout com aviso
 *                            outros → toast de erro
 *
 * TODO Pessoa 4:
 *  [ ] Loading em "skeleton": cards cinzas pulsando (animate-pulse) no formato do card
 *  [ ] Tela de erro ilustrada e amigável (ícone, título, texto, botão)
 *  [ ] 401: mostrar toast "Sua sessão expirou" e esperar ~1.5s antes de sair
 *  [ ] Mensagens amigáveis por status (404, 422, 500)
 *  [ ] Testar na apresentação com mockApi.expirarSessao() e mockApi.falharProxima()
 */

import { sair } from '../services/auth.js';
import { escaparHtml, spinner } from './ui.js';
import { toast } from './toast.js';

export function renderizarCarregando() {
  return `
    <div class="col-span-full flex items-center justify-center gap-3 py-16 text-texto-suave">
      ${spinner()} Carregando sua biblioteca...
    </div>`;
}

export function renderizarErro(erro) {
  return `
    <div class="col-span-full py-16 text-center">
      <p class="mb-4 text-perigo">${escaparHtml(erro?.message ?? 'Algo deu errado.')}</p>
      <button type="button" class="btn-secundario" data-acao="tentar-novamente">Tentar novamente</button>
    </div>`;
}

export function tratarErroApi(erro) {
  console.error(erro);
  if (erro?.status === 401) {
    sair('expirada');
    return;
  }
  toast(erro?.message ?? 'Algo deu errado.', 'erro');
}
