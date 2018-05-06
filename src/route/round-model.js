'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Round from '../model/round-model';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();

const roundRouter = new Router();

roundRouter.post('api/round', jsonParser, (request, response, next) => {
  if (!request.number) {
    logger.log(logger.ERROR, 'ROUND-ROUTER: Responding with 400 error code');
    return next(new HttpErrors(400, 'Round Number is required'));
  }
  return new Round(request.body).save()
    .then(round => response.json(round))
    .catch(next);
});
roundRouter.get('api/round/:number', (request, response, next) => {
  return Round.findOne(request.params.number)
    .then((round) => {
      if (!round) {
        logger.log(logger.ERROR, 'ROUND-ROUTER: responding with 404 erro code');
        return next(new HttpErrors(404, 'Round not found'));
      }
      return response.json(round);
    })
    .catch(next);
});
// Do we need to delete rounds if they are attached to Games?

export default roundRouter;
