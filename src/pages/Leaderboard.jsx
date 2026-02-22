import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboards } from '../features/leaderboards/leaderboardsThunk';

function Leaderboard() {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.leaderboards || {});

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="leaderboard-page">
      <h2 className="page-title">Papan Peringkat</h2>
      <div className="leaderboard-list">
        <header className="leaderboard-item-header">
          <span className="leaderboard-user-label">Pengguna</span>
          <span className="leaderboard-score-label">Skor</span>
        </header>
        {data && data.map((item, index) => (
          <div key={item.user.id} className="leaderboard-item">
            <div className="leaderboard-user-info">
              <span className="leaderboard-rank">#{index + 1}</span>
              <img src={item.user.avatar} alt={item.user.name} className="avatar" />
              <span className="leaderboard-user-name">{item.user.name}</span>
            </div>
            <span className="leaderboard-score">{item.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;