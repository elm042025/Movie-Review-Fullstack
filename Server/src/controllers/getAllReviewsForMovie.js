import {getPool, sql} from "../DB/DB.js";


export const getAllReviewsForMovie = async (req, res, next) => {
  try {
    // 1- Validate :id
    const movieId = Number(req.params.id);
    if (Number.isNaN(movieId)) {
      return res.status(400).json({ error: "ID must be a number" });
    }

    const pool = await getPool();

    // 2- Ensure movie exists → 404 if not
    const exists = await pool
      .request()
      .input("id", sql.Int, movieId)
      .query("SELECT 1 FROM dbo.Movies WHERE id = @id");

    if (!exists || exists.recordset.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // 3) Fetch reviews (empty [] if none)
    const result = await pool
      .request()
      .input("movieId", sql.Int, movieId)
      .query(`
        SELECT id, movieId, reviewAuthor, reviewText, rating
        FROM dbo.Reviews
        WHERE movieId = @movieId
        ORDER BY id DESC
      `);

    return res.status(200).json(result.recordset); // [] or list
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return next(error);
  }
};