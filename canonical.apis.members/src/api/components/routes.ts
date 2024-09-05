import { Router } from 'express';
import { body, param, query } from 'express-validator';

import { IComponentRoutes } from '../helper';
import { MemberController } from './controller';

export class ApiRoutes implements IComponentRoutes<MemberController> {
	readonly name: string = 'member';
	readonly controller: MemberController = new MemberController();
	readonly router: Router = Router();

	constructor() {
		this.initRoutes();
		
	}
	initRoutes(): void {
		this.router.get(
			'/search/:provider',
			this.controller.searchMember
		);
		this.router.get(
			'/eligibility/:provider/:gmpi',
			this.controller.readMemberEligibility
		);
		this.router.get(
			'/eligibility/verify/:provider/:gmpi',
			this.controller.verifyEligibility
		);

	}
}
