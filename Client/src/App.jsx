// client/src/App.jsx
import { Link, Routes, Route, NavLink } from 'react-router-dom';
import MoviesList from './pages/MoviesList.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import NewMovie from './pages/NewMovie.jsx';
import EditMovie from './pages/EditMovie.jsx';

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 16, fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Link to="/" style={{ textDecoration: 'none' }}><h1>🎬 Fjellfilm</h1></Link>
        <nav style={{ display: 'flex', gap: 12 }}>
          <NavLink to="/" end>Movies</NavLink>
          <NavLink to="/new">Add Movie</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/new" element={<NewMovie />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/edit" element={<EditMovie />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </div>
  );
}
