import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Board from './Board';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme/theme';

describe('Board Component Tests', () => {
  it('Check if start game button renders properly', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Board />
      </ThemeProvider>
    );

    const startBtn = screen.getByRole('button', { name: /start game/i });
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn);

    await waitFor(() => {
      expect(startBtn).not.toBeInTheDocument();
    });
  });

  it('Game over state shows winner correctly', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Board />
      </ThemeProvider>
    );

    const startBtn = screen.getByRole('button', { name: /start game/i });
    userEvent.click(startBtn);

    // Combination for player x win
    userEvent.click(screen.getByTestId('tile-0'));
    userEvent.click(screen.getByTestId('tile-1'));
    userEvent.click(screen.getByTestId('tile-3'));
    userEvent.click(screen.getByTestId('tile-4'));
    userEvent.click(screen.getByTestId('tile-6'));

    await waitFor(() => {
      expect(screen.getByText(/winner/i)).toBeInTheDocument();
      expect(screen.getByText(/x/i)).toBeInTheDocument();
    });
  });

  it('Game over state shows draw correctly', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Board />
      </ThemeProvider>
    );

    const startBtn = screen.getByRole('button', { name: /start game/i });
    userEvent.click(startBtn);

    // Combination for a draw
    userEvent.click(screen.getByTestId('tile-0'));
    userEvent.click(screen.getByTestId('tile-1'));
    userEvent.click(screen.getByTestId('tile-2'));
    userEvent.click(screen.getByTestId('tile-4'));
    userEvent.click(screen.getByTestId('tile-7'));
    userEvent.click(screen.getByTestId('tile-6'));
    userEvent.click(screen.getByTestId('tile-3'));
    userEvent.click(screen.getByTestId('tile-5'));
    userEvent.click(screen.getByTestId('tile-8'));

    await waitFor(() => {
      expect(screen.getByText(/draw/i)).toBeInTheDocument();
    });
  });

  it('Displays error message for invalid move and then clears error on valid move', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Board />
      </ThemeProvider>
    );

    const startBtn = screen.getByRole('button', { name: /start game/i });
    userEvent.click(startBtn);

    userEvent.click(screen.getByTestId('tile-0'));
    userEvent.click(screen.getByTestId('tile-0'));

    await waitFor(() => {
      expect(
        screen.getByText(/invalid move: the tile is already occupied/i)
      ).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId('tile-1'));

    await waitFor(() => {
      expect(
        screen.queryByText(/invalid move: the tile is already occupied/i)
      ).not.toBeInTheDocument();
    });
  });
});
