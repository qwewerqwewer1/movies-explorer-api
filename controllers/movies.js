const MovieSchema = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const Forbidden = require('../errors/forbidden-error');

module.exports.getMovies = (req, res, next) => {
  MovieSchema.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

// создал контроллер удаления фильма, после чего собирался создать такой же у метода POST
// и потом с юзерами так же
module.exports.getMovieById = (req, res, next) => {
  MovieSchema.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм с указанным _id не найден.'))
    .then((dataMovie) => {
      if (dataMovie.owner._id.toString() === req.user._id) {
        dataMovie.delete();
        res.status(200).send({ message: 'Фильм удален!' });
      } else {
        throw new Forbidden('Отказано в доступе, нет прав.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Данные некорректны!'));
      } else {
        next(err);
      }
    });
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEn,
  } = req.body;

  MovieSchema.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEn,
  })
    .then((dataCard) => res.send(dataCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.send(err);
        next(new BadRequestError('Данные некорректны!'));
      } else {
        next(err);
      }
    });
};
