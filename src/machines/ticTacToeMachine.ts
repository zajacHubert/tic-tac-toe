import { createMachine, assign } from 'xstate';
import { Context, Event, EventTypes, GameStates, Player } from '../types';
import { range } from '../utils/range';

const context: Context = {
  board: range(0, 9),
  moves: 0,
  player: 'x',
  winner: undefined,
  error: null,
};

export const ticTacToeMachine = createMachine(
  {
    initial: GameStates.IDLE,
    types: {} as {
      context: Context;
      events: Event;
    },
    context,
    states: {
      idle: {
        on: {
          [EventTypes.START]: {
            target: GameStates.PLAYING,
            actions: 'clearError',
          },
        },
      },
      playing: {
        always: [
          { target: `${GameStates.GAMEOVER}.won`, guard: 'checkWin' },
          { target: `${GameStates.GAMEOVER}.draw`, guard: 'checkDraw' },
        ],
        on: {
          [EventTypes.PLAY]: [
            {
              target: GameStates.PLAYING,
              guard: 'isValidMove',
              actions: ['updateBoard', 'clearError'],
            },
            {
              target: GameStates.PLAYING,
              actions: 'setErrorInvalidMove',
            },
          ],
        },
      },
      gameOver: {
        initial: 'won',
        states: {
          won: {
            tags: 'won',
            entry: 'setWinner',
          },
          draw: {
            tags: 'draw',
          },
        },
        on: {
          [EventTypes.RESET]: {
            target: GameStates.PLAYING,
            actions: 'resetGame',
          },
        },
      },
    },
  },
  {
    actions: {
      updateBoard: assign({
        board: ({ context, event }) => {
          try {
            if (event.type === EventTypes.PLAY) {
              const updatedBoard = [...context.board];
              updatedBoard[event.value] = context.player;
              return updatedBoard;
            }
            return context.board;
          } catch (error) {
            return context.board;
          }
        },
        moves: ({ context }) => context.moves + 1,
        player: ({ context }) => (context.player === 'x' ? 'o' : 'x'),
      }),
      resetGame: assign({
        board: range(0, 9) as Array<Player | null>,
        moves: 0,
        player: 'x',
        winner: undefined,
        error: null,
      }),
      setWinner: assign({
        winner: ({ context }) => (context.player === 'x' ? 'o' : 'x'),
      }),
      setErrorInvalidMove: assign({
        error: ({ context }) => {
          if (context.error === null) {
            return 'Invalid move: The tile is already occupied. Please try another tile.';
          }
          return context.error;
        },
      }),
      setErrorGeneral: assign({
        error: () =>
          'An unexpected error occurred. Please try restarting the game.',
      }),
      clearError: assign({
        error: () => null,
      }),
    },
    guards: {
      checkWin: ({ context }) => {
        try {
          const { board } = context;
          const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];

          for (const line of winningLines) {
            const xWon = line.every((index) => board[index] === 'x');
            if (xWon) return true;

            const oWon = line.every((index) => board[index] === 'o');
            if (oWon) return true;
          }

          return false;
        } catch (error) {
          assign({
            error:
              'An unexpected error occurred while checking for a win. Please try restarting the game.',
          });
          return false;
        }
      },
      checkDraw: ({ context }) => {
        try {
          return context.moves === 9 && !context.winner;
        } catch (error) {
          assign({
            error:
              'An unexpected error occurred while checking for a draw. Please try restarting the game.',
          });
          return false;
        }
      },
      isValidMove: ({ context, event }) => {
        try {
          if (event.type !== EventTypes.PLAY) {
            return false;
          }
          return context.board[event.value] === null;
        } catch (error) {
          assign({
            error:
              'An unexpected error occurred while validating the move. Please try restarting the game.',
          });
          return false;
        }
      },
    },
  }
);
