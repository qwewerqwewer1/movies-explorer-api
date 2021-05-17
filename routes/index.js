const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');

const userRouter = require('./users');
const movieRouter = require('./movies');

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый адрес отсутствует, укажите существующий путь!!!'));
});

module.exports = router;
