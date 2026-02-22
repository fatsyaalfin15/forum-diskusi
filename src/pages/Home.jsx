import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchThreads } from '../features/threads/threadsThunk';
import { fetchUsers } from '../features/users/usersThunk';
import ThreadItem from '../components/ThreadItem';

function Home() {
  const dispatch = useDispatch();
  const { data: threads = [] } = useSelector((state) => state.threads);
  const { data: users = [] } = useSelector((state) => state.users || {});
  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchUsers());
  }, [dispatch]);

  const threadsWithUser = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
  }));

  // Dapatkan daftar kategori unik dari semua thread
  const categories = [...new Set(threadsWithUser.map((thread) => thread.category).filter(Boolean))];

  const filteredThreads = category
    ? threadsWithUser.filter((thread) => thread.category === category)
    : threadsWithUser;

  return (
    <div className="container">
      <div className="category-filter-menu">
        <Link to="/" className={!category ? 'active' : ''}>Semua</Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${cat}`}
            className={category === cat ? 'active' : ''}
          >
            #{cat}
          </Link>
        ))}
      </div>

      <h2 className="page-title">{category ? `Kategori: #${category}` : 'Daftar Diskusi'}</h2>
      {filteredThreads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

export default Home;
