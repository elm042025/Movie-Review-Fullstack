import {getPool, sql} from "../DB/DB.js"

export const getMovieByID = async (req, res, next ) =>
{
    try
    {
        // Extract id from request parameters

        const id = Number(req.params.id);

        // Validate id is a number

        if (Number.isNaN(id))
        {
            return res.status(400).json({error: "ID must be a number"});
        }

        // Query the database for the movie with the given ID

        const pool = await getPool();

        const result = await pool.request()
        .input('id', sql.Int, id)  // Use parameterized query to prevent SQL injection
        .query
        (
            'SELECT * FROM dbo.Movies WHERE id = @id'
        );
        if (result.recordset.length === 0)
        {
            return res.status(404).json({error: "Movie not found"});
        }
        res.status(200).json(result.recordset[0]);

    }
    catch (error)
    {
        next(error);
    }
}