 
 export class address {
    address1: {type: String, required: true};
    address2: {type: String, required: false};
    city: { type: String, required: true};
    state: {type: String, required: true};
    postalCode: { type: String, required: true};
 }
 
 
 export class MemberSearch{
    gmpi: { type: String, required: true};
    firstName: { type: String, required: true};
    lastName: { type: String, required: true};
    membershipDate : { type: Date, required: true};
    status: {type: String, required: false};
    memberAddress: address 
 }

 export class MemberSearchResult{
   members: [MemberSearch];
 }
 
 export class benefitDetail {
   name: {type: String, required: true};
   description:{type: String, required: true};
 }

 export class planDetails{
   name:{type: String, required: true};
   code: {type: String, required: true};
   startDate?: {type: Date, required: false};
   verifiedDate?: {type: Date, required: false};
   endDate?: {type:Date, required: false};
   benefits?: [benefitDetail];
 }
 export class memberEligibility {
    insuranceName: {type: String, required: true};
    insurer: { type: String, required: true};
    pcp: { type: String, required: true};
    memberId: {type:String, required: true};
    planDetails: planDetails
 }

 export class Eligibility{
   gmpi: { type: String, required: true};
   eligibility: [memberEligibility];
 }