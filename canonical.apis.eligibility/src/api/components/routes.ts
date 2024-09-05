import { Router } from 'express';
import { body, param, query } from 'express-validator';

import { IComponentRoutes } from '../helper';
import { EligibilityController } from './controller';

export class EligibilityRoutes implements IComponentRoutes<EligibilityController> {
	readonly name: string = 'eligibility';
	readonly controller: EligibilityController = new EligibilityController();
	readonly router: Router = Router();

	constructor() {
		this.initRoutes();
		
	}
	initRoutes(): void {
		this.router.get(
			'/:gmpi',
			param('gmpi').isNumeric(),
			this.controller.readMemberEligibility
		);
	}
}
