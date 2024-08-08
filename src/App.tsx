import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './theme/theme';
import Board from './components/Board';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Board />
    </ThemeProvider>
  );
}

export default App;
