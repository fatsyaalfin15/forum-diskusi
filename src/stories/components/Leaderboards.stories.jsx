import Leaderboard from '../../pages/Leaderboard';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Pages/Leaderboard',
  component: Leaderboard,
};

export default meta;

export const Default = () => (
  <Provider store={store}>
    <MemoryRouter>
      <Leaderboard />
    </MemoryRouter>
  </Provider>
);