import { asyncLogin } from '../../features/auth/authThunk';

global.fetch = jest.fn();

describe('authThunk', () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  test('asyncLogin success should store token', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        status: 'success',
        data: { token: 'fake-token' },
      }),
    });

    const dispatch = jest.fn();

    await asyncLogin({ email: 'test@mail.com', password: '123456' })(dispatch);

    expect(localStorage.getItem('accessToken')).toBe('fake-token');
  });

  test('asyncLogin failed should return rejected action', async () => {
  fetch.mockResolvedValueOnce({
    json: async () => ({
      status: 'fail',
      message: 'Login gagal',
    }),
  });

  const dispatch = jest.fn();
  const result = await asyncLogin({ email: 'test', password: 'wrong' })(dispatch);

  expect(result.type).toBe('auth/login/rejected');
  expect(result.error.message).toBe('Login gagal');
});
});