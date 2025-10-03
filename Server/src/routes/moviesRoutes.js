import {Router} from "express";

//! ====== controllers ====== 

import {addNewMovie} from '../controllers/addNewMovie.js'
import {addReview} from '../controllers/addReview.js'
import {getAllMovies} from '../controllers/getAllMovies.js'
import {getAllReviewsForMovie} from '../controllers/getAllReviewsForMovie.js'
import {getMovieByID} from '../controllers/getMovieByID.js'
import {updateMovie} from '../controllers/updateMovie.js'


//! ===== routes for /movies endpoint in app.js =====

const router = Router();

router.get('/', getAllMovies)

router.get('/:id', getMovieByID)

router.post('/', addNewMovie)

router.put('/:id', updateMovie)

//! ===== reviews, nested under movies/:id ===== 

router.post('/:id/reviews', addReview)

router.get('/:id/reviews', getAllReviewsForMovie)

export default router;