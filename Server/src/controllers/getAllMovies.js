export const getAllMovies = async (req, res, next ) =>
{
  try
  {
    res.status(200).json({ message: "Get all movies - controller" });
  }
    catch (error)
    {
        next(error);
    }
}

