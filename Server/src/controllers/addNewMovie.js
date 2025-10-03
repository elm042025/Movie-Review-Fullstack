
import { getPool, sql } from '../DB/DB.js';

export const addNewMovie = async (req, res, next) => {
  try
   {

        // Basic validation, bad requests

    if(!req.body || Object.keys(req.body).length === 0){
        return res.status(400).json({ error: 'Request body is required' });
    }

    const { title, director, releaseYear, genre } = req.body;

    if (!title || !Number.isInteger(releaseYear)) {
      return res.status(400).json({ error: 'title and integer releaseYear are required' });
    }

    if (title !== undefined && title.trim() === '') {
        return res.status(400).json({ error: 'title cannot be empty' });
    }


    // Insert the new movie into the database

    const pool = await getPool();

    const result = await pool.request()
      .input('title', sql.NVarChar(100), title)
      .input('director', sql.NVarChar(100), director ?? null)
      .input('releaseYear', sql.Int, releaseYear)
      .input('genre', sql.NVarChar(50), genre ?? null)
      .query
      (`
        INSERT INTO dbo.Movies (title, director, releaseYear, genre)
        OUTPUT INSERTED.id, INSERTED.title, INSERTED.director, INSERTED.releaseYear, INSERTED.genre
        VALUES (@title, @director, @releaseYear, @genre)
      `);

    res.status(201).json(result.recordset[0]); // 201 Created
  } 
  catch (err)
   {
    // Unique title+year violation shows as code 2627/2601 → 409 Conflict
    if (err.number === 2627 || err.number === 2601) {
      return res.status(409).json({ error: 'Movie with same title and year already exists' });
    }

    next(err);
  }
};
