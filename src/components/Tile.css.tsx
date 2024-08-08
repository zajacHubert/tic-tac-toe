import styled from 'styled-components';

export const TileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10vmin;
  background: white;

  &::before {
    content: attr(data-player);
  }
`;
