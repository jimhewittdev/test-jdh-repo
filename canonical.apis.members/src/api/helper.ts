import { Router } from 'express'; 
import { IMemberSearch, IMember, memberSearch, MemberSearchResult, EligibilityModel, IEligibilityModel, EligibilityItemModel, EligibilityBenefit, EligibilityPlan, member, IEligibilityPlan, IEligibilityItem} from './components/model';

export interface IComponentRoutes<T> {
	readonly name: string;
	readonly controller: T;
	readonly router: Router;

	initRoutes(): void;
	initChildRoutes?(): void;
}

export function mapEligibility (member : IMember, getAllRecords : Boolean) : IEligibilityModel {
	let e = new EligibilityModel();
	console.log(JSON.stringify(member));

	e.gmpi = member.gmpi;
	if( member.eligibility !== null){
		e.eligibility = [new EligibilityItemModel()];
		e.eligibility.pop();
		if( getAllRecords) { 
			member.eligibility.forEach( elig => {
				let ei = getEligibility(elig);
				e.eligibility.push(ei);
			});
		}
		else {
			//get the first object 
			let currentEligiblity = member.eligibility.reduce((prev, current) => (prev && prev.plan.startDate > current.plan.startDate) ? prev : current);
			e.eligibility.push(currentEligiblity);
		}
	}
	return e;
}
function getEligibility( elig : IEligibilityItem) : IEligibilityItem {
	let ei = new EligibilityItemModel();
	ei.insurer = elig.insurer;
	ei.memberId = elig.memberId;
	ei.pcp = elig.pcp;
	if( elig.plan !== null ) { 
		ei.plan = new EligibilityPlan();
		ei.plan.code = elig.plan.code;
		ei.plan.name = elig.plan.name;
		ei.plan.endDate = elig.plan.endDate;
		ei.plan.startDate = elig.plan.startDate;
		ei.plan.verifiedDate = elig.plan.verifiedDate;
		if( elig.plan.benefits !== null ) { 
			ei.plan.benefits = [new EligibilityBenefit()];
			ei.plan.benefits.pop();
					
			elig.plan.benefits.forEach( eb => {
				let b = new EligibilityBenefit();
				b.description = eb.description;
				b.name = eb.name;
				elig.plan.benefits.push(b);
			});
		}
	}
	return ei;
}

export function mapMemberSearch(members : IMember []): IMemberSearch {
	let memberResults = new memberSearch( [new MemberSearchResult()]);
	let counter = 0;
	memberResults.members.pop();
	members.forEach(member => {
		var newItem = new MemberSearchResult();
		newItem.gmpi = member.gmpi;
		newItem.lastName = member.lastName;
  		newItem.firstName = member.firstName;
  		newItem.dateOfBirth = member.dateOfBirth;
  		newItem.addresses = member.addresses;
		memberResults.members.push(newItem);
		
	});

	return memberResults;
}


export function isStringValid( str: String ) : Boolean {

	if( str === undefined || str === null || str === "") {
		return false;
	}
	else {
		return true;
	}
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
export function removeEmpty(obj) {
	return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}