/*
 * CONSTANTES COMPARTILHADAS (arquivo base — dono: Pessoa 1)
 * Nada de escrever 'assistindo' ou 'Na Fila' solto pelo código:
 * importe daqui. Assim, se mudar um rótulo, muda em todo lugar.
 */

export const NOME_APP = 'AnimeTeca';

export const PAGINAS = {
  login: 'login.html',
  biblioteca: 'biblioteca.html',
};

/** Status possíveis de um anime. A chave é o valor salvo no "banco". */
export const STATUS = {
  assistindo: { rotulo: 'Assistindo', classeBadge: 'badge-assistindo' },
  finalizado: { rotulo: 'Finalizado', classeBadge: 'badge-finalizado' },
  'na-fila': { rotulo: 'Na Fila', classeBadge: 'badge-na-fila' },
};

/** Abas da Home, na ordem em que aparecem. */
export const FILTROS = [
  { valor: 'todos', rotulo: 'Todos' },
  { valor: 'assistindo', rotulo: 'Assistindo' },
  { valor: 'finalizado', rotulo: 'Finalizados' },
  { valor: 'na-fila', rotulo: 'Na Fila' },
];

export const NOTA_MIN = 0;
export const NOTA_MAX = 10;
