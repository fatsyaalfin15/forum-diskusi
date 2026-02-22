import authReducer, { setAuthUser, clearAuthUser } from '../../features/auth/authSlice';

describe('authSlice reducer', () => {
  const initialState = {
    user: null,
    status: 'idle',
    error: null,
  };

  test('should return initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle setAuthUser', () => {
    const user = { id: 'user-1', name: 'Alfin' };
    const nextState = authReducer(initialState, setAuthUser(user));

    expect(nextState.user).toEqual(user);
    expect(nextState.status).toBe('succeeded');
  });

  test('should handle clearAuthUser', () => {
    const prevState = {
      user: { id: 'user-1' },
      status: 'succeeded',
      error: null,
    };

    const nextState = authReducer(prevState, clearAuthUser());

    expect(nextState.user).toBeNull();
    expect(nextState.status).toBe('idle');
  });
});