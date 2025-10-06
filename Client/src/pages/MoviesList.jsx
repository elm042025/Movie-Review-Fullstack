// client/src/pages/MoviesList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

export default function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    api.listMovies().then(setMovies).catch(e => setErr(e.message));
  }, []);

  if (err) return <p style={{ color: 'crimson' }}>Error: {err}</p>;

  return (
    <div>
      <h2>All Movies</h2>
      {movies.length === 0 ? <p>No movies yet.</p> : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
          {movies.map(m => (
            <li key={m.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{m.title}</strong> ({m.releaseYear}) {m.genre ? `• ${m.genre}` : ''}
                  <div style={{ color: '#555' }}>{m.director}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link to={`/movies/${m.id}`}>Details</Link>
                  <Link to={`/movies/${m.id}/edit`}>Edit</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
