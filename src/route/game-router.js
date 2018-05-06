'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Game from '../model/game-model';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();

const gameRouter = new Router();

gameRouter.post('/api/game', jsonParser, (request, response, next) => {
  if (!request.title) {
    logger.log(logger.ERROR, 'GAME-ROUTER: Responding with 400 error code');
    return next(new HttpErrors(400, 'Game Title is required'));
  }
  return new Game(request.body).save()
    .then(game => response.json(game))
    .catch(next);
});
gameRouter.get('api/game/:title', (request, response, next) => {
  return Game.findOne(request.params.title)
    .then((game) => {
      if (!game) {
        logger.log(logger.ERROR, 'GAME-ROUTER: responding with 404 erro code');
        return next(new HttpErrors(404, 'Game not found'));
      }
      return response.json(game);
    })
    .catch(next);
});
gameRouter.delete('api/game/:title', (request, response, next) => {
  return Game.findOneAndRemove(request.params.title)
    .then((game) => {
      if (!game) {
        logger.log(logger.ERROR, 'GAME-ROUTER: responding with 404 erro code');
        return next(new HttpErrors(404, 'Game not found'));
      }
      return response.sendStatus(204);
    })
    .catch(next);
});

export default gameRouter;
