// Login e cadastro de usuários
// getUsers() e saveUsers() ficam no dados.js

// Já logado? Vai direto pra biblioteca
if (localStorage.getItem('token')) {
  window.location.href = 'biblioteca.html';
}

// Elementos da página
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const message = document.getElementById('message');

// Mensagens na tela
function showMessage(text, type) {
  message.textContent = text;
  message.classList.remove('hidden', 'text-red-400', 'text-green-400');
  message.classList.add(type === 'error' ? 'text-red-400' : 'text-green-400');
}

function clearMessage() {
  message.classList.add('hidden');
}

// Veio da biblioteca com a sessão expirada? Mostra o aviso
if (window.location.search.includes('motivo=expirou')) {
  showMessage('Sua sessão expirou. Faça login novamente.', 'error');
}

// Troca entre login e cadastro
document.getElementById('showRegister').addEventListener('click', (e) => {
  e.preventDefault(); // não recarrega a página
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

// Cadastro
registerForm.addEventListener('submit', (e) => {
  e.preventDefault(); // não recarrega a página

  const username = document.getElementById('regUsername').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const password = document.getElementById('regPassword').value;

  const users = getUsers();

  // Já existe alguém com esse usuário ou e-mail?
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

// Login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Aceita usuário ou e-mail
  const login = document.getElementById('username').value.trim().toLowerCase();
  const password = document.getElementById('password').value;

  const users = getUsers();

  // Procura o usuário com esse login e senha
  const user = users.find(
    (u) =>
      (u.username.toLowerCase() === login || u.email === login) &&
      u.password === password
  );

  const campos = [document.getElementById('username'), document.getElementById('password')];

  if (!user) {
    showMessage('Usuário/e-mail ou senha incorretos.', 'error');
    // Borda vermelha nos campos
    campos.forEach((campo) => campo.classList.add('border-red-500'));
    return;
  }

  campos.forEach((campo) => campo.classList.remove('border-red-500'));

  // Guarda quem logou (sem a senha)
  localStorage.setItem(
    'loggedUser',
    JSON.stringify({ username: user.username, email: user.email })
  );

  // Token falso (sem backend ainda), é ele que libera a biblioteca
  localStorage.setItem('token', 'token-' + Date.now());

  // Mostra "Entrando..." e vai pra biblioteca
  const botao = loginForm.querySelector('button[type="submit"]');
  setButtonLoading(botao, true, 'Entrando...');
  setTimeout(() => {
    window.location.href = 'biblioteca.html';
  }, 800);
});
