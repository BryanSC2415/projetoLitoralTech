# AnimeTeca — Guia do Grupo (LitoralTech)

Catálogo pessoal de animes. Só front-end: **HTML + JavaScript puro + Tailwind**.
O "backend" é um **mock** em [js/services/api.js](js/services/api.js) que imita uma API de verdade
(demora para responder, exige token, devolve erros 401/404/422/500 e salva no `localStorage`).

> **Login de teste:** `demo@litoraltech.com` / `123456`

---

## 1. Como rodar

1. Abra a pasta no VS Code e instale as extensões recomendadas (o VS Code sugere sozinho):
   **Live Server**, **Prettier**, **EditorConfig**.
2. Clique com o botão direito em `index.html` → **Open with Live Server**.

> ⚠️ Não abra o arquivo com duplo clique (`file://`). Os `import` de JavaScript só funcionam com servidor.

---

## 2. Estrutura do projeto

```
index.html            → só redireciona
login.html            → tela de login/cadastro                      (Pessoa 1)
biblioteca.html       → a Home com a grid de animes                  (todos encaixam peças aqui)
styleguide.html       → VITRINE de cores, botões, inputs, badges     (consultem SEMPRE)

js/
  tailwind.config.js  → tema (cores, fontes) + classes .btn, .input, .card, .badge...   [BASE]
  constants.js        → status, filtros, nomes das páginas                              [BASE]
  guarda-rota.js      → bloqueia páginas sem login                                      [BASE]
  store.js            → estado da Home (lista de animes, filtro, busca)                 [BASE]
  data/animes.mock.js → animes iniciais do "banco"                                      [BASE]
  services/
    api.js            → API mock (a ÚNICA forma de ler/salvar animes)                   [BASE]
    auth.js           → entrar(), cadastrar(), sair()                                   [BASE]
    storage.js        → token no localStorage/sessionStorage                            [BASE]
  components/
    ui.js             → escaparHtml, ícones, spinner, abrirModal()                      [BASE]
    navbar.js         → (Pessoa 1)
    anime-card.js     → (Pessoa 2)
    filtros.js        → (Pessoa 2)
    anime-form.js     → (Pessoa 3)
    toast.js          → (Pessoa 4)
    confirmar.js      → (Pessoa 4)
    estados.js        → (Pessoa 4) loading, erro, tratamento de 401
  acoes/
    anime-acoes.js    → (Pessoa 4) +1 episódio, remover
  pages/
    login.js          → (Pessoa 1)
    biblioteca.js     → "cola" que liga as peças da Home                                [BASE]
```

Todos os arquivos já existem e **já funcionam numa versão mínima**. Cada um tem no topo
o **dono** e um **checklist TODO** do que falta. O trabalho de cada pessoa é completar o seu checklist.

---

## 3. Divisão do grupo (4 pessoas)

### 👤 Pessoa 1 — Autenticação, Segurança e Líder técnico
**Requisitos do PDF:** Tela de Autenticação + Segurança de Navegação.
- `login.html`, `js/pages/login.js`, `js/components/navbar.js`
- Alternar login ⇄ cadastro, validação dos campos, "lembrar de mim", aviso de sessão expirada
- Logout (com confirmação), navbar responsiva
- **Guardião da base:** revisa e aprova mudanças nos arquivos `[BASE]` e no `styleguide.html`
- Junta (merge) o trabalho de todos

### 👤 Pessoa 2 — Biblioteca / Home
**Requisitos do PDF:** grid de cards, abas de status, busca local.
- `js/components/anime-card.js`, `js/components/filtros.js`
- Card estilo galeria: capa, título, nota, barra de progresso de episódios
- Abas Todos / Assistindo / Finalizados / Na Fila com contagem
- Busca por título com debounce, estado vazio
- Trocar as capas vazias do mock por URLs reais ([js/data/animes.mock.js](js/data/animes.mock.js))

### 👤 Pessoa 3 — Cadastro e Edição de Animes
**Requisitos do PDF:** modal para incluir anime (com URL da imagem) e editar nota/status/episódios.
- `js/components/anime-form.js`
- Todos os campos, preview da capa, validação no front, erros da API por campo
- Mesmo formulário serve para criar e editar

### 👤 Pessoa 4 — UX, Ações Rápidas e Feedback
**Requisitos do PDF:** +1 Episódio, confirmação de DELETE, loading e erros amigáveis.
- `js/acoes/anime-acoes.js`, `js/components/toast.js`, `confirmar.js`, `estados.js`
- +1 Ep inteligente (não passa do total, finaliza sozinho, comemora)
- Modal de confirmação bonito, toasts, skeleton de loading
- Tratamento de token expirado (401) e erro de servidor (500)
- Preparar a **demonstração de erros** da apresentação (ver seção 7)

---

## 4. Regras anti-"Frankenstein" 🧟

1. **Só cores do tema.** Nada de `bg-pink-500`, `#ff0000` ou `style="..."`.
   Use `bg-primaria`, `text-texto-suave`, `border-borda`... (lista no `styleguide.html`).
2. **Use as classes prontas.** Botão é `.btn-primario` / `.btn-secundario` / `.btn-perigo` / `.btn-fantasma`.
   Input é `.input`. Caixa é `.card`. Status é `.badge-*`. Não crie botão "do seu jeito".
3. **Precisa de algo novo para mais de uma tela?** Peça à Pessoa 1 para colocar em
   `tailwind.config.js` + `styleguide.html` **antes** de usar.
4. **Dados só pela `api`.** Ninguém mexe no `localStorage` dos animes direto.
5. **Lista de animes só no `store`.** Depois de salvar na API, atualize com
   `store.adicionarAnime()`, `store.substituirAnime()` ou `store.removerAnime()`. A tela se redesenha sozinha.
6. **Cliques com `data-acao`.** Botões dentro da grid não ganham `addEventListener`;
   recebem `data-acao="..." data-id="..."` e a `biblioteca.js` encaminha.
7. **Feedback padronizado.** Aviso = `toast()`. Pergunta = `confirmar()`. Erro de API = `tratarErroApi()`.
   Proibido `alert()`.
8. **Texto do usuário dentro de HTML passa por `escaparHtml()`.**
9. **Modal é sempre `abrirModal()`** de `ui.js`.
10. **Código em português, mesmo estilo de nome:** `camelCase` para funções/variáveis
    (`renderizarCard`, `episodiosVistos`), `kebab-case` para arquivos (`anime-card.js`).
11. **Não mexa no arquivo do colega.** Precisa de uma mudança lá? Peça a quem é dono.
12. **Formatação automática:** o Prettier formata ao salvar. Não desative.

### Contrato do anime (todo mundo usa esses nomes)
```js
{
  id, titulo, capaUrl, nota,                // nota: 0 a 10
  status,                                   // 'assistindo' | 'finalizado' | 'na-fila'
  episodiosVistos, totalEpisodios,
  criadoEm, atualizadoEm
}
```

### API disponível
```js
await api.auth.login({ email, senha })            // → { token, usuario }
await api.auth.cadastrar({ nome, email, senha })  // → { token, usuario }
await api.animes.listar()                          // → Anime[]
await api.animes.criar({ titulo, capaUrl, nota, status, episodiosVistos, totalEpisodios })
await api.animes.atualizar(id, { episodiosVistos: 5 })  // manda só o que mudou
await api.animes.remover(id)
// Erros: ApiError com .status (401, 404, 409, 422, 500), .message e .detalhes (campos no 422)
```

---

## 5. Fluxo com Git (recomendado)

1. A Pessoa 1 cria o repositório no GitHub com esta base e adiciona todos.
2. Cada pessoa trabalha na **sua branch**: `feat/auth`, `feat/biblioteca`, `feat/formulario`, `feat/ux`.
3. Commits pequenos e frequentes, mensagem em português: `feat(card): barra de progresso`.
4. Para juntar: abrir **Pull Request** para a `main`; a Pessoa 1 (e mais alguém) revisa olhando
   as regras da seção 4.
5. Antes de começar o dia: `git pull origin main` na sua branch para pegar o que os outros fizeram.

Como cada pessoa mexe em arquivos diferentes, quase não vai ter conflito.

---

## 6. Cronograma sugerido

| Etapa | O quê |
|---|---|
| **Dia 1** | Todos rodam o projeto, leem este guia e o `styleguide.html`. Ajustem juntos cores/nome se quiserem (depois disso, congela). |
| **Semana 1** | Cada um completa os itens principais do seu TODO. PRs pequenos. |
| **Semana 2** | Itens extras + responsividade (testar no celular, DevTools F12 → modo mobile). |
| **Penúltimo dia** | **Congelamento**: só correção de bug. Ensaio da apresentação. |

---

## 7. Roteiro da apresentação (ideia)

1. **Problema** (Pessoa 1): "Quem assiste muito anime esquece em que episódio parou."
2. **Login/cadastro + proteção de rota** (Pessoa 1): tentar abrir `biblioteca.html` sem login → volta pro login.
3. **Biblioteca** (Pessoa 2): grid, abas, busca ao vivo.
4. **Adicionar e editar** (Pessoa 3): cadastrar um anime com capa ao vivo.
5. **UX** (Pessoa 4): +1 Ep até finalizar, remover com confirmação, e a demonstração de erros:
   - no console: `mockApi.falharProxima()` → clicar em algo → mostra erro amigável
   - no console: `mockApi.expirarSessao()` → clicar em +1 Ep → "Sua sessão expirou" e volta pro login
6. **Como nos organizamos** (todos): mostrar o `styleguide.html` e a divisão por arquivos —
   é o que explica por que o projeto parece feito por uma pessoa só.

Se precisar zerar os dados antes de apresentar: `mockApi.resetar()` no console.

---

## 8. Ideias extras (se sobrar tempo)

- **Página de detalhes** do anime (sinopse, gêneros, data de início)
- **Estatísticas** no topo: total de episódios assistidos, horas estimadas (ep × 24 min), nota média
- **Ordenação**: por nota, por título, por atualizado recentemente
- **Favoritos** com coração no card
- **Gêneros** como tags e filtro por gênero
- **Modo claro/escuro** (o tema já está centralizado, então é só trocar as cores)
- **Atalho de teclado**: `/` foca a busca, `N` abre "Novo anime"
- **Exportar a lista** em JSON
