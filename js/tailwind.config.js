/*
 * ============================================================
 *  TEMA + COMPONENTES BASE (arquivo compartilhado)
 *  Dono: Pessoa 1 (líder técnico). Mudanças aqui só via PR revisado.
 * ============================================================
 *
 *  Este arquivo é carregado em TODAS as páginas, logo depois do
 *  script do Tailwind (CDN). Ele define:
 *    1. As cores, fontes e raios do projeto (tailwind.config)
 *    2. As classes de componente (.btn, .input, .card, .badge...)
 *
 *  REGRA DE OURO: não invente cor nova no meio do código.
 *  Use as cores daqui (bg-fundo, text-primaria, border-borda...).
 *  Se precisar de algo novo, adicione AQUI e avise o grupo.
 */

tailwind.config = {
  theme: {
    extend: {
      colors: {
        fundo: '#0b0b14', // fundo da página
        superficie: '#151526', // cards, modais
        'superficie-2': '#1e1e35', // inputs, hover
        borda: '#2a2a45',
        texto: '#ececf5',
        'texto-suave': '#9a9ab8',
        primaria: {
          DEFAULT: '#e8457c', // rosa "sakura"
          escura: '#c92f63',
          clara: '#ff7aa5',
        },
        secundaria: '#7c5cff', // roxo
        sucesso: '#2ecc8f',
        alerta: '#f5b942',
        perigo: '#ef4c5a',
        info: '#45a8e8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        titulo: ['Poppins', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
        brilho: '0 0 0 1px rgba(232,69,124,.35), 0 8px 30px -8px rgba(232,69,124,.45)',
      },
    },
  },
};

/*
 * Classes de componente. Escritas com @apply para todo mundo usar
 * o MESMO botão, o MESMO input e o MESMO badge.
 * Veja todas funcionando em styleguide.html.
 */
const COMPONENTES_CSS = `
@layer base {
  body { @apply bg-fundo text-texto font-sans antialiased; }
  h1, h2, h3 { @apply font-titulo; }
}

@layer components {
  /* Botões */
  .btn { @apply inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primaria/60
                 disabled:opacity-50 disabled:cursor-not-allowed; }
  .btn-primario   { @apply btn bg-primaria text-white hover:bg-primaria-escura; }
  .btn-secundario { @apply btn bg-superficie-2 text-texto border border-borda hover:border-primaria/60; }
  .btn-perigo     { @apply btn bg-perigo text-white hover:brightness-110; }
  .btn-fantasma   { @apply btn text-texto-suave hover:text-texto hover:bg-superficie-2; }
  .btn-icone      { @apply btn p-2; }

  /* Formulários */
  .label     { @apply block text-sm font-medium text-texto-suave mb-1; }
  .input     { @apply w-full rounded-lg bg-superficie-2 border border-borda px-3 py-2 text-texto
                      placeholder:text-texto-suave/60 transition
                      focus:outline-none focus:border-primaria focus:ring-2 focus:ring-primaria/30; }
  .input-erro { @apply border-perigo focus:border-perigo focus:ring-perigo/30; }
  .msg-erro  { @apply mt-1 text-xs text-perigo; }

  /* Superfícies */
  .card  { @apply rounded-card bg-superficie border border-borda; }

  /* Badges de status (mesma cor em TODO lugar) */
  .badge            { @apply inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold; }
  .badge-assistindo { @apply badge bg-info/15 text-info; }
  .badge-finalizado { @apply badge bg-sucesso/15 text-sucesso; }
  .badge-na-fila    { @apply badge bg-alerta/15 text-alerta; }

  /* Abas de filtro */
  .aba       { @apply rounded-full px-4 py-1.5 text-sm font-medium text-texto-suave border border-transparent transition hover:text-texto; }
  .aba-ativa { @apply bg-primaria/15 text-primaria border-primaria/40; }
}
`;

(function injetarComponentes() {
  const estilo = document.createElement('style');
  estilo.type = 'text/tailwindcss';
  estilo.textContent = COMPONENTES_CSS;
  document.head.appendChild(estilo);
})();
