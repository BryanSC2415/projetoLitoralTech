/*
 * TELA DE LOGIN / CADASTRO — 👤 Pessoa 1 (Autenticação & Segurança)
 *
 * Versão mínima: só faz login com o usuário demo para o resto do grupo
 * conseguir trabalhar desde o 1º dia.
 *   e-mail: demo@litoraltech.com   senha: 123456
 *
 * TODO Pessoa 1:
 *  [ ] Alternar entre "Entrar" e "Criar conta" (abas ou link) sem recarregar
 *  [ ] Cadastro: nome, e-mail, senha, confirmar senha → usar cadastrar() de auth.js
 *  [ ] Validação: e-mail válido, senha ≥ 6, senhas iguais, nome obrigatório
 *      (mostrar erro embaixo do campo com .input-erro e .msg-erro)
 *  [ ] Checkbox "Lembrar de mim" → passar lembrar: true/false para entrar()
 *  [ ] Botão com spinner e desabilitado enquanto espera a API
 *  [ ] Ler ?motivo= da URL e mostrar aviso ("Sua sessão expirou", "Faça login para continuar")
 *  [ ] Mostrar/ocultar senha (ícone de olho)
 *  [ ] Visual caprichado: lado esquerdo com arte/frase, lado direito com o form
 */

import { entrar } from '../services/auth.js';
import { PAGINAS } from '../constants.js';

const form = document.querySelector('#form-login');
const caixaErro = document.querySelector('#erro-login');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(form));
  caixaErro.textContent = '';

  try {
    await entrar({ email: dados.email, senha: dados.senha });
    location.replace(PAGINAS.biblioteca);
  } catch (erro) {
    caixaErro.textContent = erro.message;
  }
});
