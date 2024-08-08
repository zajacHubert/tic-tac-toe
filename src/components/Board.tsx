import { useMachine } from '@xstate/react';
import { ticTacToeMachine } from '../machines/ticTacToeMachine';
import { range } from '../utils/range';
import Tile from './Tile';
import GameStatus from './GameStatus';
import { BoxBoard, Container, BoxActions } from './Board.css';
import { ErrorMessage, Title } from './Common.css';
import { EventTypes } from '../types';

const Board = () => {
  const [state, send] = useMachine(ticTacToeMachine);

  return (
    <Container>
      <Title>Tic Tac Toe</Title>
      <BoxActions>
        <GameStatus state={state} send={send} />
      </BoxActions>
      <BoxBoard>
        {range(0, 9).map((_, index) => {
          return (
            <Tile
              index={index}
              onClick={() => send({ type: EventTypes.PLAY, value: index })}
              key={index}
              player={state.context.board[index]}
            />
          );
        })}
      </BoxBoard>
      {state.context.error && (
        <ErrorMessage>{state.context.error}</ErrorMessage>
      )}
    </Container>
  );
};

export default Board;
