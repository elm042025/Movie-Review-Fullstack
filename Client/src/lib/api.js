// client/src/lib/api.js
const BASE = import.meta.env.VITE_API_BASE_URL;

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await res.json() : null;
  if (!res.ok) {
    const msg = body?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return body;
}

export const api = {
  // Movies
  listMovies: () => request('/movies'),
  getMovie: (id) => request(`/movies/${id}`),
  createMovie: (payload) => request('/movies', { method: 'POST', body: JSON.stringify(payload) }),
  updateMovie: (id, payload) => request(`/movies/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),

  // Reviews
  listReviews: (movieId) => request(`/movies/${movieId}/reviews`),
  addReview: (movieId, payload) =>
    request(`/movies/${movieId}/reviews`, { method: 'POST', body: JSON.stringify(payload) }),
};
