const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

//                                            *Вход и Регистрация

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
});

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
});

//                                            *Роуты после получения доступа User

module.exports.validateGetUser = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().max(200).required(),
  }).unknown(),
});

module.exports.validatePatchUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().max(200).required(),
  }).unknown(),
});

//                                            *Роуты после получения доступа Movie

module.exports.validateGetMovies = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().max(200).required(),
  }).unknown(),
});

module.exports.validateGetMovieById = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().max(200).required(),
  }).unknown(),
});

module.exports.validatePostMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helpers.message('Поле "image" должно быть валидным url-адресом');
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helpers.message('Поле "trailer" должно быть валидным url-адресом');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helpers.message('Поле "thumbnail" должно быть валидным url-адресом');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEn: Joi.string().required(),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().max(200).required(),
  }).unknown(),
});
