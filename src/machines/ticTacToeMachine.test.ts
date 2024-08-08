import { describe, it, expect } from 'vitest';
import { createActor } from 'xstate';
import { ticTacToeMachine } from './ticTacToeMachine';
import { EventTypes, GameStates } from '../types';

describe('Tic Tac Toe Machine', () => {
  it('check if states change correctly', async () => {
    const actor = createActor(ticTacToeMachine);
    actor.start();
    expect(actor.getSnapshot().value).toBe(GameStates.IDLE);
    actor.send({ type: EventTypes.START });
    expect(actor.getSnapshot().value).toBe(GameStates.PLAYING);
    actor.send({ type: EventTypes.RESET });
    expect(actor.getSnapshot().value).toBe(GameStates.PLAYING);
  });

  it('start game and make a valid move', () => {
    const actor = createActor(ticTacToeMachine);
    actor.start();
    actor.send({ type: EventTypes.START });
    actor.send({ type: EventTypes.PLAY, value: 0 });
    expect(actor.getSnapshot().context.board[0]).toBe('x');
    expect(actor.getSnapshot().context.player).toBe('o');
  });

  it('attempt to make an invalid move', () => {
    const actor = createActor(ticTacToeMachine);
    actor.start();
    actor.send({ type: EventTypes.START });
    actor.send({ type: EventTypes.PLAY, value: 0 });
    actor.send({ type: EventTypes.PLAY, value: 0 });
    expect(actor.getSnapshot().context.board[0]).toBe('x');
    expect(actor.getSnapshot().context.player).toBe('o');
  });

  it('winning the game', () => {
    const actor = createActor(ticTacToeMachine);
    actor.start();
    actor.send({ type: EventTypes.START });
    actor.send({ type: EventTypes.PLAY, value: 0 });
    actor.send({ type: EventTypes.PLAY, value: 3 });
    actor.send({ type: EventTypes.PLAY, value: 1 });
    actor.send({ type: EventTypes.PLAY, value: 4 });
    actor.send({ type: EventTypes.PLAY, value: 2 });

    expect(actor.getSnapshot().value).toEqual({ gameOver: 'won' });
    expect(actor.getSnapshot().context.winner).toBe('x');
  });

  it('drawing the game', () => {
    const actor = createActor(ticTacToeMachine);
    actor.start();
    actor.send({ type: EventTypes.START });
    actor.send({ type: EventTypes.PLAY, value: 0 });
    actor.send({ type: EventTypes.PLAY, value: 1 });
    actor.send({ type: EventTypes.PLAY, value: 2 });
    actor.send({ type: EventTypes.PLAY, value: 4 });
    actor.send({ type: EventTypes.PLAY, value: 3 });
    actor.send({ type: EventTypes.PLAY, value: 5 });
    actor.send({ type: EventTypes.PLAY, value: 7 });
    actor.send({ type: EventTypes.PLAY, value: 6 });
    actor.send({ type: EventTypes.PLAY, value: 8 });

    expect(actor.getSnapshot().value).toEqual({ gameOver: 'draw' });
    expect(actor.getSnapshot().context.winner).toBeUndefined();
  });

  it('reset the game after winning', () => {
    const actor = createActor(ticTacToeMachine);
    actor.start();
    actor.send({ type: EventTypes.START });
    actor.send({ type: EventTypes.PLAY, value: 0 });
    actor.send({ type: EventTypes.PLAY, value: 3 });
    actor.send({ type: EventTypes.PLAY, value: 1 });
    actor.send({ type: EventTypes.PLAY, value: 4 });
    actor.send({ type: EventTypes.PLAY, value: 2 });

    expect(actor.getSnapshot().value).toEqual({ gameOver: 'won' });
    actor.send({ type: EventTypes.RESET });
    expect(actor.getSnapshot().value).toBe(GameStates.PLAYING);
    expect(actor.getSnapshot().context.board).toEqual(Array(9).fill(null));
    expect(actor.getSnapshot().context.moves).toBe(0);
    expect(actor.getSnapshot().context.player).toBe('x');
  });
});
