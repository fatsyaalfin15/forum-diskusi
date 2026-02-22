import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUpVote, asyncDownVote, asyncNeutralVote } from '../features/threads/threadsThunk';

function ThreadItem({ thread }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [upVotesBy, setUpVotesBy] = useState([]);
  const [downVotesBy, setDownVotesBy] = useState([]);

  // Sinkronisasi state lokal dengan props saat data thread berubah
  useEffect(() => {
    setUpVotesBy(thread.upVotesBy || []);
    setDownVotesBy(thread.downVotesBy || []);
  }, [thread]);

  const isUpVoted = user && upVotesBy.includes(user.id);
  const isDownVoted = user && downVotesBy.includes(user.id);

  const onUpVote = (e) => {
    e.stopPropagation(); // Mencegah klik tembus ke card
    if (!user) return alert('Silakan login untuk vote');

    if (isUpVoted) {
      dispatch(asyncNeutralVote(thread.id));
      setUpVotesBy(upVotesBy.filter((id) => id !== user.id));
    } else { // User is not upvoted, so upvote it. Also remove downvote if present.
      dispatch(asyncUpVote(thread.id));
      setUpVotesBy([...upVotesBy, user.id]);
      setDownVotesBy(downVotesBy.filter((id) => id !== user.id));
    }
  };

  const onDownVote = (e) => {
    e.stopPropagation();
    if (!user) return alert('Silakan login untuk vote');

    if (isDownVoted) {
      dispatch(asyncNeutralVote(thread.id));
      setDownVotesBy(downVotesBy.filter((id) => id !== user.id));
    } else { // User is not downvoted, so downvote it. Also remove upvote if present.
      dispatch(asyncDownVote(thread.id));
      setDownVotesBy([...downVotesBy, user.id]);
      setUpVotesBy(upVotesBy.filter((id) => id !== user.id));
    }
  };

  //  mendapatkan inisial nama
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  //  format "time ago"
  const timeAgo = (date) => {
    if (!date) return '';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return `${Math.floor(interval)} tahun lalu`;

    interval = seconds / 2592000;
    if (interval > 1) return `${Math.floor(interval)} bulan lalu`;

    interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)} hari lalu`;

    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)} jam lalu`;

    interval = seconds / 60;
    if (interval > 1) return `${Math.floor(interval)} menit lalu`;

    return `${Math.floor(seconds)} detik lalu`;
  };

  return (
    <div className="thread-item">
      {thread.category && (
        <Link to={`/category/${thread.category}`} className="category-badge" onClick={(e) => e.stopPropagation()}>
          #{thread.category}
        </Link>
      )}

      <div className="thread-content">
        <h3>{thread.title}</h3>
        <p>{thread.body.slice(0, 150)}{thread.body.length > 150 ? '...' : ''}</p>
      </div>

      <div className="thread-footer">
        <div className="author-info">
          <div className="avatar">
            {thread.owner?.avatar ? (
              <img src={thread.owner.avatar} alt={thread.owner.name} />
            ) : (
              getInitials(thread.owner?.name)
            )}
          </div>
          <div className="author-details">
            <span className="author-name">{thread.owner?.name || 'Anonim'}</span>
            <span className="post-date">• {timeAgo(thread.createdAt)}</span>
          </div>
        </div>
        <div className="thread-actions">
          <span className="comment-count">
            💬 {thread.totalComments}
          </span>
          <div className="vote-container">
            <button type="button" className={`vote-button upvote ${isUpVoted ? 'active' : ''}`} onClick={onUpVote}>
              👍 {upVotesBy.length}
            </button>
            <button type="button" className={`vote-button downvote ${isDownVoted ? 'active' : ''}`} onClick={onDownVote}>
              👎 {downVotesBy.length}
            </button>
          </div>
          <Link to={`/threads/${thread.id}`} className="detail-link">Lihat Detail</Link>
        </div>
      </div>
    </div>
  );
}

// Validasi PropTypes untuk menghilangkan error ESLint
ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
    ownerId: PropTypes.string,
    owner: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
};

export default ThreadItem;