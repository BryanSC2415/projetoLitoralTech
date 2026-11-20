# AnimeTeca

Catálogo de animes feito com **HTML + JavaScript + Tailwind**, sem backend.
Os dados ficam salvos no `localStorage` do navegador.

## Como rodar
Abra o `index.html` no navegador (com duplo clique ou pelo Live Server).

Login de teste: **demo@email.com** / **123456**

## Arquivos e quem cuida de cada um

| Arquivo | O que faz | Quem |
|---|---|---|
| `index.html` + `js/login.js` | Login e cadastro | Pessoa 1 |
| `js/seguranca.js` | Token, proteção da biblioteca, sair | Pessoa 1 |
| `biblioteca.html` | Estrutura da página principal | Todos (cada um mexe só na sua parte marcada) |
| `js/biblioteca.js` | Cards, filtros e busca | Pessoa 2 |
| `js/modal.js` | Adicionar e editar anime | Pessoa 3 |
| `js/acoes.js` | +1 episódio e remover | Pessoa 4 |
| `js/dados.js` | Animes iniciais e funções de salvar/ler | Todos usam, combinem antes de mudar |

## Combinados para o projeto não virar um "frankenstein"

**Cores** (use só estas):
- Fundo da página: `bg-slate-950`
- Cards e caixas: `bg-slate-800`
- Campos e botões secundários: `bg-slate-700`
- Destaque (botões principais): `bg-pink-500` / `hover:bg-pink-600`
- Status: Assistindo = `sky`, Finalizado = `emerald`, Na Fila = `amber`

**Formato de um anime** (sempre esses nomes):
```js
{ id, titulo, imagem, nota, status, episodiosVistos, totalEpisodios }
// status: 'assistindo' | 'finalizado' | 'fila'
```

**Para salvar ou ler dados**, use sempre as funções do `dados.js`:
`lerAnimes()`, `salvarAnimes(lista)`, `lerUsuarios()`, `salvarUsuarios(lista)`.

**Depois de mudar a lista de animes**, chame `salvarAnimes(animes)` e depois `mostrarAnimes()`.

## Dica
Para voltar aos dados iniciais, abra o console do navegador (F12) e digite:
```js
localStorage.clear()
```
