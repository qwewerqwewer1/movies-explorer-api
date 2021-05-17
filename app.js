const express = require('express');
require('dotenv').config();

const {
  NODE_ENV, PORT, MONGODBURLPROD, MONGODBURLDEV,
} = process.env;

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const { errorHandler } = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateSignIn, validateSignUp } = require('./middlewares/validations');
const { limiter } = require('./utils/limiter');

app.use(limiter);
app.use(cors());
// -------------------MongoDB-------------------------
mongoose.connect(NODE_ENV === 'production' ? MONGODBURLPROD : MONGODBURLDEV, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ---------------------------------------------------
app.use(helmet()); // kill powered-by-express

app.use(requestLogger); // winston

// ------------------------Роуты----------------------
app.post('/signin', validateSignUp, login); // вход
app.post('/signup', validateSignIn, createUser); // регистрация

app.use(auth); // мидлвара аутентификатор
app.use(router); // movies && users
// ---------------------------------------------------

app.use(errors()); // валидация приходящих запросов

app.use(errorLogger); // winston

app.use(errorHandler); // центр. обработчик

app.listen(PORT);
