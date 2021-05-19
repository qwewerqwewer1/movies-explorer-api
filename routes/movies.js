const router = require('express').Router();

const { getMovies, getMovieById, postMovie } = require('../controllers/movies');
const { validateGetMovieById, validatePostMovie } = require('../middlewares/validations');

router.get('/', getMovies);
router.delete('/:movieId', validateGetMovieById, getMovieById);
router.post('/', validatePostMovie, postMovie);

module.exports = router;
