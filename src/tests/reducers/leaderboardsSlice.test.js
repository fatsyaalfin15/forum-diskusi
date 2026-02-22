import leaderboardsReducer from '../../features/leaderboards/leaderboardsSlice';
import { fetchLeaderboards } from '../../features/leaderboards/leaderboardsThunk';

describe('leaderboardsSlice reducer', () => {
  const initialState = {
    data: [],
    error: null,
    status: 'idle',
  };

  test('should return initial state', () => {
    expect(leaderboardsReducer(undefined, { type: 'UNKNOWN' }))
      .toEqual(initialState);
  });

  test('should handle fulfilled', () => {
    const fakeData = [{ user: { id: '1', name: 'Alfin' }, score: 10 }];

    const action = {
      type: fetchLeaderboards.fulfilled.type,
      payload: fakeData,
    };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState.data).toEqual(fakeData);
    expect(nextState.status).toBe('succeeded');
  });
});