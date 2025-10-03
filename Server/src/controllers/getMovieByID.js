export const getMovieByID = async (req, res, next ) =>
{
    try
    {
        res.status(200).json({ message: "Get movie by ID - controller" });
    }
    catch (error)
    {
        next(error);
    }
}