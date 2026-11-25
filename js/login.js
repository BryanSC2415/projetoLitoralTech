// ===============================================
// LOGIN E CADASTRO DE USUÁRIOS
// As funções getUsers() e saveUsers() ficam no js/dados.js
// ===============================================

// Se já está logado (tem token), nem mostra o login: vai direto pra biblioteca
if (localStorage.getItem('token')) {
  window.location.href = 'biblioteca.html';
}

// ---------- Pegando os elementos da página ----------
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const message = document.getElementById('message');

// ---------- Mensagens na tela ----------
function showMessage(text, type) {
  message.textContent = text;
  message.classList.remove('hidden', 'text-red-400', 'text-green-400');
  message.classList.add(type === 'error' ? 'text-red-400' : 'text-green-400');
}

function clearMessage() {
  message.classList.add('hidden');
}

// Se veio da biblioteca porque a sessão expirou (index.html?motivo=expirou), avisa
if (window.location.search.includes('motivo=expirou')) {
  showMessage('Sua sessão expirou. Faça login novamente.', 'error');
}

// ---------- Alternar entre login e cadastro ----------
document.getElementById('showRegister').addEventListener('click', (e) => {
  e.preventDefault(); // impede o link de recarregar a página
  clearMessage();
  loginSection.classList.add('hidden');
  registerSection.classList.remove('hidden');
});

document.getElementById('showLogin').addEventListener('click', (e) => {
  e.preventDefault();
  clearMessage();
  registerSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
});

// ---------- CADASTRO ----------
registerForm.addEventListener('submit', (e) => {
  e.preventDefault(); // impede o formulário de recarregar a página

  const username = document.getElementById('regUsername').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const password = document.getElementById('regPassword').value;

  const users = getUsers();

  // some() devolve true se ALGUM usuário bater com a condição
  const alreadyExists = users.some(
    (u) => u.username.toLowerCase() === username.toLowerCase() || u.email === email
  );

  if (alreadyExists) {
    showMessage('Esse usuário ou e-mail já está cadastrado.', 'error');
    return;
  }

  users.push({ username, email, password });
  saveUsers(users);

  registerForm.reset();
  registerSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
  showMessage('Conta criada! Agora é só entrar.', 'success');
});

// ---------- LOGIN ----------
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // O campo aceita usuário OU e-mail, então comparamos com os dois
  const login = document.getElementById('username').value.trim().toLowerCase();
  const password = document.getElementById('password').value;

  const users = getUsers();

  // find() devolve o primeiro usuário que bate, ou undefined se não achar
  const user = users.find(
    (u) =>
      (u.username.toLowerCase() === login || u.email === login) &&
      u.password === password
  );

  const campos = [document.getElementById('username'), document.getElementById('password')];

  if (!user) {
    showMessage('Usuário/e-mail ou senha incorretos.', 'error');
    // Borda vermelha nos campos (ideia do colega do feedback)
    campos.forEach((campo) => campo.classList.add('border-red-500'));
    return;
  }

  campos.forEach((campo) => campo.classList.remove('border-red-500'));

  // Guarda quem está logado (sem a senha!)
  localStorage.setItem(
    'loggedUser',
    JSON.stringify({ username: user.username, email: user.email })
  );

  // Token de mentira (ainda não temos backend). É ele que libera a biblioteca.
  localStorage.setItem('token', 'token-' + Date.now());

  // Botão com "Entrando..." girando (setButtonLoading do feedback.js) e depois vai para a biblioteca
  const botao = loginForm.querySelector('button[type="submit"]');
  setButtonLoading(botao, true, 'Entrando...');
  setTimeout(() => {
    window.location.href = 'biblioteca.html';
  }, 800);
});
