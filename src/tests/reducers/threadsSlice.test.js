import threadsReducer from '../../features/threads/threadsSlice';
import { fetchThreads } from '../../features/threads/threadsThunk';

describe('threadsSlice reducer', () => {
  const initialState = {
    data: [],
    error: null,
  };

  test('should handle fetchThreads fulfilled', () => {
    const threads = [{ id: 'thread-1', title: 'Test thread' }];

    const action = {
      type: fetchThreads.fulfilled.type,
      payload: threads,
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState.data).toEqual(threads);
  });

  test('should handle fetchThreads rejected', () => {
    const action = {
      type: fetchThreads.rejected.type,
      error: { message: 'Failed' },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState.error).toBe('Failed');
  });
});