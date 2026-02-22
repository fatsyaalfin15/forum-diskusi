import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createThread } from '../features/threads/threadsThunk';

function CreateThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await dispatch(createThread({ title, body, category }));
    if (!result.error) {
      navigate('/');
    } else {
      alert(`Gagal membuat thread: ${result.error.message}`);
    }
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <h2>Buat Thread Baru</h2>

      <input
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        placeholder="Kategori (opsional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        placeholder="Isi Thread"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />

      <button type="submit">Kirim</button>
    </form>
  );
}

export default CreateThread;
