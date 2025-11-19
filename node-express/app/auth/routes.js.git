import {Router} from 'express';
import {authenticate, showLogin} from './controller.js';

export const routes = new Router();

routes.get('/', showLogin);
routes.post('/', authenticate);
