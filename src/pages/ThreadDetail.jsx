import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreadDetail, addComment } from '../features/threadDetail/threadDetailThunk';
import CommentItem from '../components/CommentItem';
import { asyncUpVote, asyncDownVote, asyncNeutralVote } from '../features/threads/threadsThunk';

function ThreadDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.threadDetail);
  const { user } = useSelector((state) => state.auth);

  const [comment, setComment] = useState('');
  const [upVotesBy, setUpVotesBy] = useState([]);
  const [downVotesBy, setDownVotesBy] = useState([]);

  useEffect(() => {
    if (data) {
      setUpVotesBy(data.upVotesBy || []);
      setDownVotesBy(data.downVotesBy || []);
    }
  }, [data]);

  const isUpVoted = user && upVotesBy.includes(user.id);
  const isDownVoted = user && downVotesBy.includes(user.id);

  const onUpVote = () => {
    if (!user) return alert('Silakan login untuk vote');

    if (isUpVoted) {
      dispatch(asyncNeutralVote(id));
      setUpVotesBy(upVotesBy.filter((uid) => uid !== user.id));
    } else { // User is not upvoted, so upvote it. Also remove downvote if present.
      dispatch(asyncUpVote(id));
      setUpVotesBy([...upVotesBy, user.id]);
      setDownVotesBy(downVotesBy.filter((uid) => uid !== user.id));
    }
  };

  const onDownVote = () => {
    if (!user) return alert('Silakan login untuk vote');

    if (isDownVoted) {
      dispatch(asyncNeutralVote(id));
      setDownVotesBy(downVotesBy.filter((uid) => uid !== user.id));
    } else { // User is not downvoted, so downvote it. Also remove upvote if present.
      dispatch(asyncDownVote(id));
      setDownVotesBy([...downVotesBy, user.id]);
      setUpVotesBy(upVotesBy.filter((uid) => uid !== user.id));
    }
  };

  // Helper untuk format "time ago"
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

  useEffect(() => {
    dispatch(fetchThreadDetail(id));
  }, [dispatch, id]);

  // Tampilkan null selama data belum ada, loading bar di atas akan aktif
  if (!data) {
    return null;
  }

  return (
    <div className="detail-page">
      <header className="detail-header">
        {data.category && <Link to={`/category/${data.category}`} className="category-badge">#{data.category}</Link>}
        <h1>{data.title}</h1>
        <div className="detail-meta">
          <div className="avatar">
            {data.owner.avatar ? (
              <img src={data.owner.avatar} alt={data.owner.name} />
            ) : (
              data.owner.name ? data.owner.name.charAt(0).toUpperCase() : '?'
            )}
          </div>
          <div className="meta-info">
            <span className="author-name">{data.owner.name}</span>
            <span className="post-date">• {timeAgo(data.createdAt)}</span>
          </div>
        </div>

        <div className="vote-container" style={{ marginTop: '16px' }}>
          <button type="button" className={`vote-button upvote ${isUpVoted ? 'active' : ''}`} onClick={onUpVote}>
            👍 {upVotesBy.length}
          </button>
          <button type="button" className={`vote-button downvote ${isDownVoted ? 'active' : ''}`} onClick={onDownVote}>
            👎 {downVotesBy.length}
          </button>
        </div>
      </header>

      <div className="detail-body" dangerouslySetInnerHTML={{ __html: data.body }} />

      <div className="comments-section">
        <h3>Komentar ({data.comments.length})</h3>
        {data.comments.map((comment) => (
          <CommentItem key={comment.id} comment={{ ...comment, threadId: id }} />
        ))}
      </div>

      <div className="comment-form-container">
        <h3>Beri Komentar</h3>
        <form
          className="form"
          style={{ boxShadow: 'none', padding: 0, margin: '20px 0 0 0' }}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addComment({ id, content: comment }));
            setComment('');
          }}
        >
          <textarea
            placeholder="Tulis komentar Anda..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            required
          />
          <button type="submit">Kirim Komentar</button>
        </form>
      </div>
    </div>
  );
}

export default ThreadDetail;
