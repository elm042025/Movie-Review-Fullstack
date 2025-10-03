export const updateMovie = async (req, res, next ) =>
{
    try
    {
        res.status(200).json({ message: "updateMovie - controller" });
    }
    catch (error)
    {
        next(error);
    }
}