const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');

const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateSignIn, validateSignUp } = require('../middlewares/validations');

// ------------------------Роуты----------------------
router.post('/signin', validateSignIn, login); // вход
router.post('/signup', validateSignUp, createUser); // регистрация

router.use(auth); // мидлвара аутентификатор

router.use('/users', userRouter); // пользователи
router.use('/movies', movieRouter); // фильмы

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый адрес отсутствует, укажите существующий путь!!!'));
});

module.exports = router;
