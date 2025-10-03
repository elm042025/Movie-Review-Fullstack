export const updateMovie = async (req, res, next ) =>
{
    try
    {
        res.status(200).json({ message: "Update movie - controller" });
    }
    catch (error)
    {
        next(error);
    }
}