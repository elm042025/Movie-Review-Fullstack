import {getPool, sql} from "../DB/DB.js"

export const updateMovie = async (req, res, next ) =>
{
    try
    {
        const id = Number(req.params.id);

        if (Number.isNaN(id))
        {
            return res.status(400).json({error: "ID must be a number"});
        }

        const { title, director, releaseYear, genre } = req.body;

// Basic validation

        if ( releaseYear !== undefined && !Number.isInteger(releaseYear)) {
            // Bad Request
          return res.status(400).json({ error: 'release year must be an integer' });
        }

        if (title !== undefined && title.trim() === '') {
            return res.status(400).json({ error: 'title cannot be empty' });
        }

// Update the movie in the database

        const pool = await getPool();

// Check if movie with given ID exists

        const exists = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT 1 FROM dbo.Movies WHERE id = @id');
        if (exists.recordset.length === 0)
        {
            return res.status(404).json({error: "Movie not found"});
        }

// Proceed to update

        const safeTitle = title?.trim() ?? null;
        const safeDirector = director?.trim() ?? null;
        const safeGenre = genre?.trim() ?? null;

        const result = await pool.request()
        .input('id', sql.Int, id)
        .input('title', sql.NVarChar(100), safeTitle)
        .input('director', sql.NVarChar(100), safeDirector)
        .input('releaseYear', sql.Int, releaseYear ?? null)
        .input('genre', sql.NVarChar(50), safeGenre)
        .query
        (`
          UPDATE dbo.Movies
          SET 
              title = COALESCE(@title, title),
              director = COALESCE(@director, director),
              releaseYear = COALESCE(@releaseYear, releaseYear),
              genre = COALESCE(@genre, genre)

              OUTPUT INSERTED.id, INSERTED.title, INSERTED.director, INSERTED.releaseYear, INSERTED.genre
              WHERE id = @id
        `);

        if (!result.recordset || result.recordset.length === 0) {
  return res.status(404).json({ error: 'Movie not found' });
}

        res.status(200).json(result.recordset[0]); // 200 OK with updated movie
    }
    catch (error)
    {
            // Unique title+year violation shows as code 2627/2601 → 409 Conflict   
        if (error.number === 2627 || error.number === 2601) {
            return res
            .status(409)
            .json({ error: 'Movie with same title and year already exists' });
          }
        next(error);
    }
}