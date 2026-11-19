/*
 * NAVBAR — 👤 Pessoa 1 (Autenticação & Segurança)
 *
 * Contrato: renderizarNavbar(elemento, usuario)
 * O botão de sair usa data-acao="sair" (a biblioteca.js já trata o clique).
 *
 * TODO Pessoa 1:
 *  [ ] Avatar com a inicial do nome do usuário
 *  [ ] Pedir confirmação antes de sair (usar confirmar() da Pessoa 4)
 *  [ ] Layout mobile (esconder nome em telas pequenas)
 *  [ ] Navbar "grudada" no topo ao rolar (sticky + fundo com blur)
 */

import { NOME_APP } from '../constants.js';
import { escaparHtml, icones } from './ui.js';

export function renderizarNavbar(elemento, usuario) {
  elemento.innerHTML = `
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
      <a href="biblioteca.html" class="font-titulo text-xl font-bold">
        <span class="text-primaria">Anime</span>${escaparHtml(NOME_APP.replace('Anime', ''))}
      </a>
      <div class="flex items-center gap-3">
        <span class="text-sm text-texto-suave">Olá, ${escaparHtml(usuario?.nome ?? '')}</span>
        <button type="button" class="btn-fantasma" data-acao="sair">${icones.sair} Sair</button>
      </div>
    </nav>`;
}
