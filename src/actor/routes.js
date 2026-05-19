import express from 'express';
import controller from './controller.js';

const actorRoutes = express.Router();


actorRoutes.post('/actor', controller.handleInsertActorRequest);
actorRoutes.get('/actores', controller.handleGetActoresRequest);
actorRoutes.get('/actor/:id', controller.handleGetActorRequest);
actorRoutes.put('/actor/:id', controller.handleUpdateActorRequest);
actorRoutes.delete('/actor/:id', controller.handleDeleteActorRequest);

export default actorRoutes;