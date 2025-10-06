// client/src/pages/MovieDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";
import ReviewForm from "../ui/ReviewForm.jsx";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [err, setErr] = useState("");

  async function load() {
    try {
      const [m, r] = await Promise.all([api.getMovie(id), api.listReviews(id)]);
      setMovie(m);
      setReviews(r);
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  if (err) return <p style={{ color: "crimson" }}>Error: {err}</p>;
  if (!movie) return <p>Loading…</p>;

  return (
    <div>
      <h2>
        {movie.title} ({movie.releaseYear})
      </h2>
      <p>
        {movie.genre ? `${movie.genre} • ` : ""}
        {movie.director}
      </p>

      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 10 }}>
          {reviews.map((r) => (
            <li
              key={r.id}
              style={{ border: "1px solid #eee", padding: 10, borderRadius: 8 }}
            >
              <div style={{ fontWeight: "bold" }}>
                {r.reviewAuthor} • {r.rating}/5
              </div>
              <div>{r.reviewText}</div>
            </li>
          ))}
        </ul>
      )}

      <h3 style={{ marginTop: 24 }}>Add a review</h3>
      <ReviewForm
        onSubmit={async (data) => {
          await api.addReview(id, data);
          await load(); // refresh list
        }}
      />
    </div>
  );
}
