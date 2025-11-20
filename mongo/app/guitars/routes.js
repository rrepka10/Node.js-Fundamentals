import { Router } from 'express';
import { createGuitar, deleteGuitar, editGuitar, listGuitars, showGuitar, 
		storeGuitar, updateGuitar } from './controller.js';
import { checkAuth } from '../auth/controller.js';
export const routes = new Router();

// /guitars

// Setup a route for the default request
routes.get('/', listGuitars);

// Setup to support the post after the form save with authentication
routes.post('/', checkAuth, storeGuitar);

// Setup a route to add new guitars.  Note, this is simular to the
// /:id route, so it must be first or we will get match on the
// id route and we won't process the create properly 
routes.get('/create',checkAuth, createGuitar);

// Setup a rout to handle the edit with authentication.  This must be before the generic id route
routes.get('/:id/edit', checkAuth, editGuitar);

// Setup a rout to handle the delete with authentication.  This must be before the generic id route
routes.get('/:id/delete', checkAuth, deleteGuitar);

// Setup a route for the generic list using URL parameters 
routes.get('/:id', showGuitar);

// Setup a route actually push the new data back with authentication. 
routes.post('/:id', checkAuth, updateGuitar);
