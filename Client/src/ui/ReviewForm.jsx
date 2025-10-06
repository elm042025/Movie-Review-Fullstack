// client/src/ui/ReviewForm.jsx
import { useState } from 'react';

export default function ReviewForm({ onSubmit }) {
  const [form, setForm] = useState({ reviewAuthor: '', reviewText: '', rating: 5 });
  const [err, setErr] = useState('');

  function onChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'rating' ? Number(value) : value }));
  }

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      await onSubmit(form);
      setForm({ reviewAuthor: '', reviewText: '', rating: 5 });
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 12, maxWidth: 500 }}>
      {err && <p style={{ color: 'crimson' }}>{err}</p>}
      <input name="reviewAuthor" placeholder="Your name" value={form.reviewAuthor} onChange={onChange} required />
      <textarea name="reviewText" placeholder="Your review" value={form.reviewText} onChange={onChange} required rows={4} />
      <select name="rating" value={form.rating} onChange={onChange}>
        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <button type="submit">Submit Review</button>
    </form>
  );
}
