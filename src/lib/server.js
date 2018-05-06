'use strict';

import express from 'express';
import mongoose from 'mongoose';
import logger from './logger';
import decompileMiddleware from './decompile-middleware';
import compileMiddleware from './compile-middleware';
import gameModel from '../model/game-model';
import roundModel from '../model/round-model';
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<
// import all model routes here
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>

const app = express();
let server = null;

// app.use() for all Model Routes

// construct && deconstruct middleware
app.use(decompileMiddleware);
app.use(compileMiddleware);

// app.use() for all Model Routes
app.use(gameModel);
app.use(roundModel);

// catch all routes
app.all('*', (request, response) => {
  logger.log(logger.INFO, 'SERVER: Returning a 404 from the catch-all/default route');
  return response.sendStatus(404);
});

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      server = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `Server is listening on port ${process.env.PORT}`);
      });
    })
    .catch((err) => {
      logger.log(logger.ERROR, `something happened, ${JSON.stringify(err)}`);
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      server.close(() => {
        logger.log(logger.INFO, 'Server is off');
      });
    })
    .catch((err) => {
      logger.log(logger.ERROR, `something happened, ${JSON.stringify(err)}`);
    });
};

export { startServer, stopServer };
