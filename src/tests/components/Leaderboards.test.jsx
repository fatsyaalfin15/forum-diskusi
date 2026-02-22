import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Leaderboard from '../../pages/Leaderboard';

const fakeStore = configureStore({
  reducer: {
    leaderboards: () => ({
      data: [
        {
          user: { id: '1', name: 'Alfin', avatar: 'avatar.png' },
          score: 100,
        },
      ],
      error: null,
    }),
  },
});

describe('Leaderboard component', () => {
  it('should render leaderboard data', () => {
    render(
      <Provider store={fakeStore}>
        <Leaderboard />
      </Provider>
    );

    expect(screen.getByText('Papan Peringkat')).toBeInTheDocument();
    expect(screen.getByText('Alfin')).toBeInTheDocument();
  });
});