import { Router } from 'express';
import { createGuitar, deleteGuitar, editGuitar, listGuitars, showGuitar, 
		storeGuitar, updateGuitar } from './controller.js';

export const routes = new Router();

// Setup a route for the default request
routes.get('/', listGuitars);

// Setup to support the post after the form save
routes.post('/', storeGuitar);
 
// Setup a route to add new guitars.  Note, this is simular to the
// /:id route, so it must be first or we will get match on the
// id route and we won't process the create properly 
routes.get('/create', createGuitar);

// Setup a rout to handle the edit.  This must be before the generic id route
routes.get('/:id/edit', editGuitar);

// Setup a rout to handle the delete.  This must be before the generic id route
routes.get('/:id/delete', deleteGuitar);

// Setup a route for the generic list using URL parameters
routes.get('/:id', showGuitar);

// Setup a route actually push the new data back
routes.post('/:id', updateGuitar);

