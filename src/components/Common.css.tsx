import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.lightGreen};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.625rem 1.25rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSize.medium};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGreen};
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.extraLarge};
`;

export const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fontSize.medium};
`;
