// client/src/pages/NewMovie.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function NewMovie() {
  const nav = useNavigate();
  const [form, setForm] = useState({ title: '', director: '', releaseYear: '', genre: '' });
  const [err, setErr] = useState('');

  function onChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      const payload = {
        title: form.title,
        director: form.director || null,
        releaseYear: Number(form.releaseYear),
        genre: form.genre || null,
      };
      const created = await api.createMovie(payload);
      nav(`/movies/${created.id}`);
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div>
      <h2>Add Movie</h2>
      {err && <p style={{ color: 'crimson' }}>{err}</p>}
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 500 }}>
        <input name="title" placeholder="Title *" value={form.title} onChange={onChange} required />
        <input name="director" placeholder="Director" value={form.director} onChange={onChange} />
        <input name="releaseYear" placeholder="Release Year *" value={form.releaseYear} onChange={onChange} required />
        <input name="genre" placeholder="Genre" value={form.genre} onChange={onChange} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
