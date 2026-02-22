import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ThreadItem from '../../components/ThreadItem';
import store from '../../app/store';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

test('should render thread item', () => {
  const thread = {
    id: '1',
    title: 'Thread Test',
    body: 'Body Test',
    category: 'react',
    createdAt: '2024-01-01',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  };

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ThreadItem thread={thread} />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Thread Test')).toBeInTheDocument();
});