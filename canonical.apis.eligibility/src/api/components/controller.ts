import { NextFunction, Request, Response } from 'express';

import { EligibilityModel } from './model';
import { logger } from '../../config/logger';

export class EligibilityController {
	 /**
	 * Read Eligibility
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	async readMemberEligibility(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			logger.info("Received request for gmpi : " + req.params.gmpi);
		    const elig = await EligibilityModel.findOne({ "gmpi" : req.params.gmpi});
			if( elig == null ) {
				res.status(404).send(null);
			} else {
				res.status(200).send(elig);
			}
		} catch (error) {
				res.status(500).send(error.message);
		}
	}
}
