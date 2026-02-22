import { useSelector } from 'react-redux';

function Loading() {
  const { count } = useSelector((state) => state.loading);

  if (count <= 0) {
    return null;
  }

  return (
    <div className="loading-bar-container">
      <div className="loading-bar-fill" />
    </div>
  );
}

export default Loading;