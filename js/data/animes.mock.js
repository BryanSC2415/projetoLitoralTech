/*
 * DADOS INICIAIS DO MOCK (o "banco" começa com isso)
 *
 * Formato de um anime (CONTRATO — todo mundo usa esses nomes):
 * {
 *   id: string,
 *   titulo: string,
 *   capaUrl: string,          // URL da imagem (pode ser '' → card mostra placeholder)
 *   nota: number,             // 0 a 10
 *   status: 'assistindo' | 'finalizado' | 'na-fila',
 *   episodiosVistos: number,
 *   totalEpisodios: number,
 *   criadoEm: string (ISO),
 *   atualizadoEm: string (ISO),
 * }
 *
 * TODO (grupo): colocar URLs reais de capas em capaUrl.
 * Depois de mudar este arquivo, rode no console: mockApi.resetar()
 */

export const USUARIO_DEMO = {
  id: 'u_demo',
  nome: 'Visitante LitoralTech',
  email: 'demo@litoraltech.com',
  senha: '123456', // é mock! num backend real a senha nunca fica salva assim
};

const agora = new Date().toISOString();

const base = [
  ['Fullmetal Alchemist: Brotherhood', 10, 'finalizado', 64, 64],
  ['Steins;Gate', 9.5, 'finalizado', 24, 24],
  ['Attack on Titan', 9, 'assistindo', 59, 87],
  ['Frieren', 9.5, 'assistindo', 18, 28],
  ['Jujutsu Kaisen', 8.5, 'assistindo', 30, 47],
  ['Spy x Family', 8, 'finalizado', 37, 37],
  ['One Piece', 9, 'assistindo', 620, 1100],
  ['Vinland Saga', 9, 'na-fila', 0, 48],
  ['Cowboy Bebop', 9, 'na-fila', 0, 26],
  ['Mob Psycho 100', 8.5, 'finalizado', 37, 37],
  ['Haikyuu!!', 8.5, 'na-fila', 0, 85],
  ['Chainsaw Man', 8, 'assistindo', 6, 12],
];

export const SEED_ANIMES = base.map(([titulo, nota, status, episodiosVistos, totalEpisodios], i) => ({
  id: `a_seed_${i + 1}`,
  titulo,
  capaUrl: '',
  nota,
  status,
  episodiosVistos,
  totalEpisodios,
  criadoEm: agora,
  atualizadoEm: agora,
}));
