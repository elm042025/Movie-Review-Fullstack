export const addNewMovie = async (req, res, next ) =>
{
    try
    {
        res.status(201).json({ message: "addNewMovie - controller" });
    }
    catch (error)
    {
        next(error);
    }
}