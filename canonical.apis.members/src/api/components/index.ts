import { Router } from 'express';
import { ApiRoutes } from './routes';


/**
 * Init component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export function registerApiRoutes(router: Router, prefix: string = ''): void {
	router.use(`${prefix}`, new ApiRoutes().router);
}