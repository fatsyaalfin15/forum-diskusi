import { fetchThreads } from '../../features/threads/threadsThunk';

global.fetch = jest.fn();

describe('threadsThunk', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('fetchThreads success should return threads', async () => {
    const fakeThreads = [{ id: 'thread-1', title: 'Test thread' }];

    fetch.mockResolvedValueOnce({
      json: async () => ({
        status: 'success',
        data: { threads: fakeThreads },
      }),
    });

    const dispatch = jest.fn();
    const result = await fetchThreads()(dispatch);

    expect(result.payload).toEqual(fakeThreads);
  });

 test('fetchThreads failed should return rejected action', async () => {
  fetch.mockResolvedValueOnce({
    json: async () => ({
      status: 'fail',
      message: 'Error fetch',
    }),
  });

  const dispatch = jest.fn();
  const result = await fetchThreads()(dispatch);

  expect(result.type).toBe('threads/fetch/rejected');
  expect(result.error.message).toBe('Error fetch');
});
});