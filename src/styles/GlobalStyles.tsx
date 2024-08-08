import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
 }

 body {
    font-family: Arial, sans-serif;
    color: ${({ theme }) => theme.colors.black};
 }

 button {
    border: none;
    color: white;
    cursor: pointer;
 }
`;

export default GlobalStyles;
