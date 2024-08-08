import { TileBox } from './Tile.css';
import { Player } from '../types';

type TileProps = {
  index: number;
  onClick: () => void;
  player: Player;
};

const Tile = ({ index, onClick, player }: TileProps) => {
  return (
    <TileBox
      key={index}
      onClick={onClick}
      data-player={player}
      data-testid={`tile-${index}`}
    />
  );
};

export default Tile;
