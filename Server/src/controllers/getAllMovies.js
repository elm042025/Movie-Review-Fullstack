import {getPool} from "../DB/DB.js"

export const getAllMovies = async (req, res, next ) =>
{
  try
  {
const pool = await getPool();

const result = await pool.request().query
(
  'SELECT * FROM dbo.Movies'
);

res.status(200).json(result.recordset);
  }
    catch (error)
    {
        next(error);
    }
}

