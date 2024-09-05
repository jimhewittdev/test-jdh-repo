import { NextFunction, Request, Response } from 'express';
import { logger } from '../../config/logger';
import {env } from '../../config/globals'
import { isStringValid, makeBoolean, mapEligibility, mapMemberSearch } from '../helper';
import { query } from 'winston';
import { createEvalAwarePartialHost } from 'ts-node/dist/repl';
import {makeRequest} from "./services"
import { UtilityService } from '../../services/utility';

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
			logger.info(`Received request for provider ${req.params.provider} - and gmpi ${req.params.gmpi}`);
			let isHistorical = false;
			let queryParams = new URLSearchParams();
			if( isStringValid(req.query.isHistorical) ) {
				try {
					isHistorical = makeBoolean(req.query.isHistorical);
					if(isHistorical ){ 
						queryParams.append("getAllRecords", isHistorical ? "true":"false");
					}
				}
				catch(error) {
					res.status(500).send(error.message);
					UtilityService.handleError(error);
					return;
				}

			}
			let url = env.ELIG_URL.replace("{provider}", req.params.provider);
			url = url.replace("{gmpi}", req.params.gmpi);
			
			let eligibility = await makeRequest(url, queryParams);
			if( eligibility === null ){ 
				res.status(404).send(null);
			} else {
				res.status(200).send(mapEligibility(eligibility));
			}
		} catch (error) {
				res.status(500).send(error.message);
				UtilityService.handleError(error);
		}
	}

	async searchMember(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
				logger.info(`Received request for provider ${req.params.provider}`);
				console.log (env.SEARCH_URL);

				let memberSearchUrl = `${env.SEARCH_URL}${req.params.provider}`;
				let members = null;
				let queryParams = new URLSearchParams();
				//seach member by GMPI, MemberId, or First/Last/DOB
				if( isStringValid(req.query.gmpi)) {
					//add search params
					queryParams.append( "gmpi", req.query.gmpi);
				}
				else if( isStringValid(req.query.memberId)){
					queryParams.append( "memberId", req.query.memberId);
				}
				else if( isStringValid(req.query.lastName) && isStringValid(req.query.firstName) && isStringValid(req.query.dateOfBirth) ){
					queryParams.append( "firstName",req.query.firstName);
					queryParams.append( "lastName", req.query.lastName);
					queryParams.append( "dob", req.query.dateOfBirth);
				}

				else {
					res.status(500).send("Request does not have proper search criteria");
					return;
				}
			
				let resp = await makeRequest(memberSearchUrl,queryParams);
				if( !isStringValid(resp) ){
					res.status(404).send(null);
				}
				else {
					res.status(200).send(mapMemberSearch(resp));					
				}
				
		} catch (error) {
				UtilityService.handleError(error);
				res.status(500).send(error.message);
		}
	}

	
}