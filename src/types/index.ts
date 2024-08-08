export enum GameStates {
  IDLE = 'idle',
  PLAYING = 'playing',
  GAMEOVER = 'gameOver',
}

export enum EventTypes {
  START = 'START',
  PLAY = 'PLAY',
  RESET = 'RESET',
}

export type Event =
  | { type: EventTypes.START }
  | { type: EventTypes.PLAY; value: number }
  | { type: EventTypes.RESET };

export type Player = 'x' | 'o' | null;

export type Context = {
  board: (Player | null)[];
  moves: number;
  player: Player;
  winner: Player | undefined;
  error: string | null;
};
