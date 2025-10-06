import { getPool, sql } from "../DB/DB.js";

export const addReview = async (req, res, next) => {
  try {
    const movieId = Number(req.params.id);

    // validation, check if movieId is a number

    if (Number.isNaN(movieId)) {
      return res.status(400).json({ error: "Invalid movie ID, must be a number" });
    }

    // validation, check if req.body has content

    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "Request body cannot be empty" });
    }

    let { reviewAuthor, reviewText, rating } = req.body;

    // check if fields are strings and trim spaces

    reviewAuthor =
      typeof reviewAuthor === "string" ? reviewAuthor.trim() : reviewAuthor;
    reviewText =
      typeof reviewText === "string" ? reviewText.trim() : reviewText;

    // validate rating is a number between 1 and 5

    const ratingNumber = Number(rating);
    const ratingIsValid =
      !Number.isNaN(ratingNumber) &&
      Number.isInteger(ratingNumber) &&
      ratingNumber >= 1 &&
      ratingNumber <= 5;

      if(!reviewAuthor || !reviewText || !ratingIsValid) {
        return res.status(400).json({ error: "Invalid review data. Ensure all fields are correctly filled." });
      }

    // adding review to the database

    const pool = await getPool();

    // check if movie with movieId exists

    const exists = await pool
      .request()
      .input("id", sql.Int, movieId)
      .query("SELECT 1 FROM dbo.Movies WHERE id = @id");

    if (!exists || exists.recordset.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // insert review into Reviews table and return created row

    const result = await pool
      .request()
      .input("movieId", sql.Int, movieId)
      .input("reviewAuthor", sql.NVarChar(100), reviewAuthor)
      .input("reviewText", sql.NVarChar(sql.MAX), reviewText)
      .input("rating", sql.TinyInt, ratingNumber)
      .query(`
        INSERT INTO dbo.Reviews (movieId, reviewAuthor, reviewText, rating)
        OUTPUT INSERTED.*
        VALUES (@movieId, @reviewAuthor, @reviewText, @rating);
      `);

    return res.status(201).json(result.recordset[0]);
  }
  
  catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({ error: "Database connection was refused" });
    }
    if (error.number === 547) {
      return res.status(400).json({ error: "invalid data or movie reference" });
    }
    next(error); // Pass error to the global error handler
  }
};
