export const getAllReviewsForMovie = async (req, res, next ) =>
{
  try
    {
        res.status(201).json({ message: "getAllReviewsForMovie - controller" });
    }
    catch (error)
    {
        next(error);
    }
}