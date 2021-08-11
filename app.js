const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const { errorHandler } = require('./middlewares/error-handler');
// eslint-disable-next-line no-unused-vars
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/limiter');
const {
  MONGODBURLDEV, PORTDEV,
} = require('./utils/config');

// app.use(requestLogger); // winston

app.use(limiter);

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://dmitriykovyazin_portfolio.nomoredomains.icu',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept'],
  credentials: true,
};

app.use(cors(options));
// -------------------MongoDB-------------------------
mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGODBURLPRODUCTION : MONGODBURLDEV, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ---------------------------------------------------
app.use(helmet()); // kill powered-by-express

app.use(router); // movies && users

app.use(errors()); // валидация приходящих запросов

app.use(errorLogger); // winston

app.use(errorHandler); // центр. обработчик
// ---------------------------------------------------
app.listen(process.env.NODE_ENV === 'production' ? process.env.PORTPROD : PORTDEV);
