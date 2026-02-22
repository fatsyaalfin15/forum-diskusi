import Login from '../../pages/Login';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Pages/Login',
  component: Login,
};

export default meta;

export const Default = () => (
  <Provider store={store}>
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  </Provider>
);