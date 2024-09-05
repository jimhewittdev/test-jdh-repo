import { Router } from 'express'; 
import { benefitDetail, Eligibility, memberEligibility, MemberSearch, MemberSearchResult, planDetails } from './components/model';
import { address } from './components/model'
export interface IComponentRoutes<T> {
	readonly name: string;
	readonly controller: T;
	readonly router: Router;

	initRoutes(): void;
	initChildRoutes?(): void;
}

export function isStringValid(val) {
	if( val == undefined || val == null || val === "") 	{
		return false;
	}

	return true;
}

export function mapMemberSearch(inMembers ): MemberSearchResult {
	var outMembers = new MemberSearchResult();
	if( inMembers == null || inMembers == undefined ) {
		return outMembers;
	}

	if( inMembers.members == null || inMembers.members == undefined ) {
		return outMembers;
	}

	outMembers.members = [ new MemberSearch()];
	outMembers.members.pop();
	inMembers.members.forEach(member => {
		var m = new MemberSearch();
	
		m.firstName = member.firstName;
		m.lastName = member.lastName;
		m.gmpi = member.gmpi;
		m.membershipDate = member.membershipDate;
		if( member.addresses !== undefined && member.addresses !== null ){ 
			m.memberAddress =  new address();
			m.memberAddress.address1 = member.addresses[0].addressLine1;
			m.memberAddress.address2 = member.addresses[0].streetLine2;
			m.memberAddress.city = member.addresses[0].city;
			m.memberAddress.state = member.addresses[0].stateOrProvince;
			m.memberAddress.postalCode = member.addresses[0].postalCode;
		}

		outMembers.members.push(m);
		
	});
	return outMembers;
}

export function mapEligibility(inElig) : Eligibility {
	let elig = new Eligibility();
	elig.gmpi = inElig.gmpi;
	elig.eligibility = [new memberEligibility()];
	elig.eligibility.pop();
	
	if(inElig.eligibility) {
		inElig.eligibility.forEach(elg => {
			let e = buildElig(elg);
			elig.eligibility.push(e);
		});
	}
	return elig;

}

function buildElig(inElig) : memberEligibility {
	let eligibility = new memberEligibility();
	eligibility.insurer = inElig.insurer;
    eligibility.pcp = inElig.pcp;
    eligibility.memberId = inElig.memberId;
    eligibility.planDetails = new planDetails();
	eligibility.planDetails.name = inElig.plan.name;
    eligibility.planDetails.code = inElig.plan.code;
    eligibility.planDetails.startDate = inElig.plan.startDate;
    eligibility.planDetails.verifiedDate = inElig.plan.verifiedDate;
    eligibility.planDetails.endDate = inElig.plan.endDate;
	if( inElig.plan.benefits !== null && inElig.plan.benefits !== undefined ) { 
		eligibility.planDetails.benefits = [ new benefitDetail()];
		inElig.plan.benefits.forEach(inB => {
			let b = new benefitDetail();
			b.name = inB.name;
			b.description = inB.description;		
			if( eligibility.planDetails.benefits.length == 1 ) {
				eligibility.planDetails.benefits[0] = b;
			} 
			else {
				eligibility.planDetails.benefits.push(b);
			}
		});
	}
	return eligibility;
}

export function makeBoolean(str :String) : boolean {
	if (isStringValid(str)){
		if(str.trim().toLowerCase() == "true" ||
		   str.trim().toLowerCase() == "t" ||
		   str.trim().toLowerCase() == "1" ) {
			return true;
		   }
	}
	return false;
}