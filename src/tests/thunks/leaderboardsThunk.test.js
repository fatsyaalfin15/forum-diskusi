import { fetchLeaderboards } from '../../features/leaderboards/leaderboardsThunk';

global.fetch = jest.fn();

describe('fetchLeaderboards thunk', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should dispatch fulfilled when success', async () => {
    const fakeData = [{ user: { id: '1', name: 'alfin' }, score: 20 }];
    fetch.mockResolvedValueOnce({
      json: async () => ({
        status: 'success',
        data: { leaderboards: fakeData },
      }),
    });

    const dispatch = jest.fn();
    await fetchLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchLeaderboards.fulfilled.type,
      payload: fakeData,
    }));
  });

  it('should dispatch rejected when failed', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        status: 'fail',
        message: 'Error fetch',
      }),
    });

    const dispatch = jest.fn();
    await fetchLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchLeaderboards.rejected.type,
      error: expect.anything(),
    }));
  });
});