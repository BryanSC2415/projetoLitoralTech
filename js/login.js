// ===============================================
// LOGIN E CADASTRO — 👤 Pessoa 1
// ===============================================

// Se já está logado, vai direto para a biblioteca
if (localStorage.getItem('token')) {
  window.location.href = 'biblioteca.html';
}

// Se veio da biblioteca com a sessão expirada, mostra o aviso
if (window.location.search.includes('motivo=expirou')) {
  mostrarAviso('Sua sessão expirou. Faça login novamente.');
}

function mostrarAviso(texto) {
  const aviso = document.getElementById('aviso');
  aviso.textContent = texto;
  aviso.classList.remove('hidden');
}

function mostrarCadastro() {
  document.getElementById('formLogin').classList.add('hidden');
  document.getElementById('formCadastro').classList.remove('hidden');
  document.getElementById('aviso').classList.add('hidden');
}

function mostrarLogin() {
  document.getElementById('formCadastro').classList.add('hidden');
  document.getElementById('formLogin').classList.remove('hidden');
  document.getElementById('aviso').classList.add('hidden');
}

function entrar(event) {
  event.preventDefault(); // não deixa a página recarregar

  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;

  if (email === '' || senha === '') {
    mostrarAviso('Preencha e-mail e senha.');
    return;
  }

  const usuario = lerUsuarios().find((u) => u.email === email && u.senha === senha);

  if (!usuario) {
    mostrarAviso('E-mail ou senha incorretos.');
    return;
  }

  fazerLogin(usuario);
}

function cadastrar(event) {
  event.preventDefault();

  const nome = document.getElementById('cadNome').value.trim();
  const email = document.getElementById('cadEmail').value.trim();
  const senha = document.getElementById('cadSenha').value;

  if (nome === '') {
    mostrarAviso('Digite seu nome.');
    return;
  }
  if (!email.includes('@')) {
    mostrarAviso('Digite um e-mail válido.');
    return;
  }
  if (senha.length < 6) {
    mostrarAviso('A senha precisa ter pelo menos 6 caracteres.');
    return;
  }

  const usuarios = lerUsuarios();

  if (usuarios.some((u) => u.email === email)) {
    mostrarAviso('Esse e-mail já está cadastrado.');
    return;
  }

  const novoUsuario = { nome, email, senha };
  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);

  fazerLogin(novoUsuario);
}
