const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const knexLogger = require('knex-logger');
const routes = require('./routes');
const errorHandlers = require('./handlers/errorHandlers');
const middlewares = require('./middlewares');
const useCases = require('../../config/adaptersWiredUseCases');

const app = express();

app.use(compression());
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(knexLogger(require('../../config/db')));
}

app.use(middlewares.injectUseCases(useCases));
app.use(middlewares.passport.initialize(useCases));

app.use('/', routes);

app.use(errorHandlers.notFound);

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;
