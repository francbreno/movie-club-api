const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const knexLogger = require('knex-logger');
const routes = require('./routes');
const errorHandlers = require('./handlers/errorHandlers');
const middlewares = require('./middlewares');
const contexts = require('../core');

const app = express();

app.use(compression());
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(knexLogger(require('../config/db')));
}

app.use(middlewares.injectContexts(contexts));
app.use(middlewares.passport.initialize(contexts));

app.use('/', routes);

app.use(errorHandlers.notFound);

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;
