import {Router} from 'express';
import {authenticate, logout, showLogin} from './controller.js';

export const routes = new Router();

// export these routes to the main program
routes.get('/login', showLogin);
routes.post('/login', authenticate);
routes.get('/logout', logout);
