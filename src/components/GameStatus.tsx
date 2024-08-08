import {
  AnyActorRef,
  MachineSnapshot,
  MetaObject,
  NonReducibleUnknown,
  StateValue,
} from 'xstate';
import { GameStates, EventTypes, Event, Context } from '../types';
import { Button, Subtitle } from './Common.css';

type GameStatusProps = {
  state: MachineSnapshot<
    Context,
    Event,
    Record<string, AnyActorRef>,
    StateValue,
    string,
    NonReducibleUnknown,
    MetaObject,
    any
  >;
  send: (event: Event) => void;
};

const GameStatus = ({ state, send }: GameStatusProps) => {
  const isIdle = state.matches(GameStates.IDLE);
  const isGameOver = state.matches(GameStates.GAMEOVER);
  const isPlaying = state.matches(GameStates.PLAYING);

  const winner = state.context.winner;
  const player = state.context.player;

  return (
    <>
      {isIdle && (
        <Button onClick={() => send({ type: EventTypes.START })}>
          Start game
        </Button>
      )}

      {isGameOver && (
        <>
          {state.hasTag('won') && <Subtitle>Winner: {winner}</Subtitle>}
          {state.hasTag('draw') && <Subtitle>Draw</Subtitle>}
          <Button onClick={() => send({ type: EventTypes.RESET })}>
            Play again
          </Button>
        </>
      )}

      {isPlaying && <Subtitle>Player: {player}</Subtitle>}
    </>
  );
};

export default GameStatus;
