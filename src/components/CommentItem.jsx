import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { asyncUpVoteComment, asyncDownVoteComment, asyncNeutralVoteComment } from '../features/threadDetail/threadDetailThunk';

function CommentItem({ comment }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [upVotesBy, setUpVotesBy] = useState([]);
  const [downVotesBy, setDownVotesBy] = useState([]);
  useEffect(() => {
    setUpVotesBy(comment.upVotesBy || []);
    setDownVotesBy(comment.downVotesBy || []);
  }, [comment]);

  const isUpVoted = user && upVotesBy.includes(user.id);
  const isDownVoted = user && downVotesBy.includes(user.id);

  // format waktu untuk komentar
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

  const onUpVote = () => {
    if (!user) return alert('Silakan login untuk vote');
    if (isUpVoted) {
      dispatch(asyncNeutralVoteComment({ threadId: comment.threadId, commentId: comment.id }));
      setUpVotesBy(upVotesBy.filter((id) => id !== user.id));
    } else { // User is not upvoted, so upvote it. Also remove downvote if present.
      dispatch(asyncUpVoteComment({ threadId: comment.threadId, commentId: comment.id }));
      setUpVotesBy([...upVotesBy, user.id]);
      setDownVotesBy(downVotesBy.filter((id) => id !== user.id));
    }
  };

  const onDownVote = () => {
    if (!user) return alert('Silakan login untuk vote');
    if (isDownVoted) {
      dispatch(asyncNeutralVoteComment({ threadId: comment.threadId, commentId: comment.id }));
      setDownVotesBy(downVotesBy.filter((id) => id !== user.id));
    } else { // User is not downvoted, so downvote it. Also remove upvote if present.
      dispatch(asyncDownVoteComment({ threadId: comment.threadId, commentId: comment.id }));
      setDownVotesBy([...downVotesBy, user.id]);
      setUpVotesBy(upVotesBy.filter((id) => id !== user.id));
    }
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <div className="avatar">
          {comment.owner.avatar ? (
            <img src={comment.owner.avatar} alt={comment.owner.name} />
          ) : (
            comment.owner.name ? comment.owner.name.charAt(0).toUpperCase() : '?'
          )}
        </div>
        <div className="comment-meta">
          <strong className="author-name">{comment.owner.name}</strong>
          <span className="post-date">
            • {timeAgo(comment.createdAt)}
          </span>
        </div>
      </div>
      <div className="comment-content" dangerouslySetInnerHTML={{ __html: comment.content }} />
      <div className="vote-container" style={{ marginTop: '8px', paddingLeft: 'calc(32px + 0.75rem)' }}>
        <button type="button" className={`vote-button upvote ${isUpVoted ? 'active' : ''}`} onClick={onUpVote}>
          👍 {upVotesBy.length}
        </button>
        <button type="button" className={`vote-button downvote ${isDownVoted ? 'active' : ''}`} onClick={onDownVote}>
          👎 {downVotesBy.length}
        </button>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentItem;