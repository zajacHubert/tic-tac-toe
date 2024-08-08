import { Sign, TileBox } from './Tile.css';
import { Player } from '../types';
import { useState } from 'react';

type TileProps = {
  index: number;
  onClick: () => void;
  player: Player;
  isPlayingState: boolean;
};

const Tile = ({ index, onClick, player, isPlayingState }: TileProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isPlayingState) {
      return;
    }

    onClick();
    setIsClicked(!!player);
    if (player) {
      setTimeout(() => {
        setIsClicked(false);
      }, 300);
    }
  };

  return (
    <TileBox
      key={index}
      onClick={handleClick}
      data-player={player}
      data-testid={`tile-${index}`}
      $canClick={isPlayingState}
    >
      <Sign $isClicked={isClicked}>{player}</Sign>
    </TileBox>
  );
};

export default Tile;
