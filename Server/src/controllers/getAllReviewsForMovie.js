export const getAllReviewsForMovie = async (req, res, next ) =>
{
  try
    {
        res.status(201).json({ message: "Add new movie - controller" });
    }
    catch (error)
    {
        next(error);
    }
}