import { NextFunction, Request, Response } from 'express';
import { mapEligibility, mapMemberSearch, isStringValid, removeEmpty, makeBoolean} from '../helper';
import { getMember, searchGMPI, searchMemberId, searchExtended  } from "./repository"
import { logger } from '../../config/logger';
import { UtilityService } from '../../services/utility';
import { EligibilityVerification } from './model';

export class MemberController {
    
	constructor() {
		this.verifyEligibility = this.verifyEligibility.bind(this);
		this.readMemberEligibility = this.readMemberEligibility.bind(this);
	}
	async verifyEligibility(req: Request, res: Response, next: NextFunction) : Promise<Response|void> {
		try { 
			const elig = await getMember(req.params.provider, req.params.gmpi);
			let checkDate = req.query.checkDate;
			let queryDate = null;
			if(!isStringValid(checkDate)){
				queryDate = new Date();
			} else {
				queryDate = Date.parse(checkDate);
			}

			let verification = new EligibilityVerification();
			verification.isEligibile = false;
			if( elig !== null && elig !== undefined ) { 
				if(elig.eligibility !== null && elig.eligibility.length > 0 ){
					//first will have latest
					if( elig.eligibility[0].plan !== null ) { 
						verification.startDate = elig.eligibility[0].plan.startDate;
						verification.endDate = elig.eligibility[0].plan.endDate;
						verification.isEligibile = ( elig.eligibility[0].plan.startDate < queryDate && elig.eligibility[0].plan.endDate >= queryDate);
					}
				}

				if( verification == null ) {
					res.status(404).send(null);
				} else {
					res.status(200).send(verification);
				}
			} else {
				res.status(404).send(null);
			}
		}
		catch(error) {
			res.status(500).send(error.message);
		}

	}

	async readMemberEligibility(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			logger.info(`Received request for ${req.params.provider} - gmpi: ${req.params.gmpi}` );
			let getAllRecords = false;
			if( isStringValid(req.query.getAllRecords)) {
				try {
					getAllRecords = makeBoolean(req.query.getAllRecords);
				} catch(error) {
					res.status(500).send(error.message);
					UtilityService.handleError(error);
					return;
				}
			}
		    const member = await getMember(req.params.provider, req.params.gmpi);
			if( member == null ) {
				res.status(404).send(null);
			} else {
				res.status(200).send(mapEligibility(member, getAllRecords));
			}
		} catch (error) {
				res.status(500).send(error.message);
		}
	}

	async searchMember(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {

			if( !isStringValid(req.params.provider) ){
				res.status(500).send("No provider specified");
			}

			logger.info(`Received request for ${req.params.provider}`);
		    let members = null; 
			 
			if ( isStringValid(req.query.gmpi ) ) { 
				members = await searchGMPI(req.params.provider, req.query.gmpi);
			}
			else if( isStringValid(req.query.memberId)){
				members = await searchMemberId(req.params.provider, req.query.memberId);
			}
			else if( isStringValid(req.query.lastName) && isStringValid(req.query.firstName) && isStringValid(req.query.dob)){
				members = await searchExtended(req.param.provider, req.query.lastName, req.query.firstName, req.query.dob);
			}
			else {
				res.status(500).send("No valid search criteria provided");
			}
			if( members == null || members.length == 0 ) {
				res.status(404).send(null);
			} else {
				res.status(200).send(removeEmpty(mapMemberSearch(members)));
			}
		} catch (error) {
				res.status(500).send(error.message);
		}
	}

	
}
