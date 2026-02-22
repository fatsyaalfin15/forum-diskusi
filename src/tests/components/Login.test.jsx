import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';
import store from '../../app/store';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('should render login page', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  // Menggunakan getByRole agar spesifik memilih elemen heading, menghindari konflik dengan tombol Login
  expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
});