import ThreadItem from '../../components/ThreadItem';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/ThreadItem',
  component: ThreadItem,
};

export default meta;

const fakeThread = {
  id: '1',
  title: 'Thread Storybook',
  body: 'Contoh thread Storybook',
  category: 'testing',
  createdAt: new Date().toISOString(),
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
  owner: { name: 'Alfin', avatar: '' },
};

export const Default = () => (
  <Provider store={store}>
    <MemoryRouter>
      <ThreadItem thread={fakeThread} />
    </MemoryRouter>
  </Provider>
);