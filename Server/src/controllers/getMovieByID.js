export const getMovieByID = async (req, res, next ) =>
{
    try
    {
        res.status(200).json({ message: "getMovieByID - controller" });
    }
    catch (error)
    {
        next(error);
    }
}