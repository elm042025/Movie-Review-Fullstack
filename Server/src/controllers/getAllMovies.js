export const getAllMovies = async (req, res, next ) =>
{
  try
  {
    res.status(200).json({ message: "getAllMovies - controller" });
  }
    catch (error)
    {
        next(error);
    }
}

