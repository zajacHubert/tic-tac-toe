import styled, { css, keyframes } from 'styled-components';

const signShakeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-10px);
  }
  40% {
    transform: translateX(10px);
  }
  60% {
    transform: translateX(-10px);
  }
  80% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
`;

type TileBoxProps = {
  $canClick: boolean;
};

export const TileBox = styled.div<TileBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  user-select: none;
  cursor: ${({ $canClick }) => ($canClick ? 'pointer' : '')};
`;

type SignProps = {
  $isClicked: boolean;
};

export const Sign = styled.p<SignProps>`
  font-size: 10vmin;

  ${({ $isClicked }) =>
    $isClicked &&
    css`
      animation: ${signShakeAnimation} 0.3s ease;
    `}
`;
