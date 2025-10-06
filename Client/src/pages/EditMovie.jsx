// client/src/pages/EditMovie.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';

export default function EditMovie() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ title: '', director: '', releaseYear: '', genre: '' });
  const [err, setErr] = useState('');

  useEffect(() => {
    api.getMovie(id).then(m => {
      setForm({
        title: m.title ?? '',
        director: m.director ?? '',
        releaseYear: m.releaseYear ?? '',
        genre: m.genre ?? ''
      });
    }).catch(e => setErr(e.message));
  }, [id]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      const payload = {
        title: form.title || undefined,
        director: form.director || undefined,
        releaseYear: form.releaseYear === '' ? undefined : Number(form.releaseYear),
        genre: form.genre || undefined,
      };
      await api.updateMovie(id, payload);
      nav(`/movies/${id}`);
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div>
      <h2>Edit Movie</h2>
      {err && <p style={{ color: 'crimson' }}>{err}</p>}
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 500 }}>
        <input name="title" placeholder="Title" value={form.title} onChange={onChange} />
        <input name="director" placeholder="Director" value={form.director} onChange={onChange} />
        <input name="releaseYear" placeholder="Release Year" value={form.releaseYear} onChange={onChange} />
        <input name="genre" placeholder="Genre" value={form.genre} onChange={onChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
