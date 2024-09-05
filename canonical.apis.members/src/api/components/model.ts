import { Schema, model, ObjectId } from 'mongoose';

import { env } from '../../config/globals'
// // 1. Create an interface representing a document in MongoDB.
// export interface IEligibility {
//   _id: ObjectId
//   firstName: String;
//   lastName: String;
//   dateOfBirth?: Date;
//   gmpi: String;
//   provider: String;
// }

// // 2. Create a Schema corresponding to the document interface.
// export const eligibilitySchema = new Schema<IEligibility>({
//   _id : { type:  Schema.Types.ObjectId, required: true},
//   lastName: { type: String, required: true },
//   firstName: { type: String, required: true },
//   gmpi: { type:String, required: true},
//   provider: {type:String, required: true},
//   dateOfBirth: Date
// });

// const EligibilityModel = model(env.COLLECTION_NAME, eligibilitySchema);
// export {EligibilityModel};

// search model
export interface IAddress {
  addressLine1: String;
    addressLine2: String;
    city: String;
    stateOrProvince: String;
    postalCode: String;
}

export const address = new Schema<IAddress> ({
  addressLine1: { type: String, required: true },
  addressLine2: { type: String, required: false },
  city: {type: String, required: true},
  stateOrProvince: { type: String, required: true},
  postalCode: { type: String, required: true }
});

export interface IMemberSearch {
  members?: [IMemberSearchResult]
  
}

export interface IMemberSearchResult {
  gmpi: String;
  lastName: String;
  firstName: String;
  dateOfBirth: Date;
  addresses: [IAddress]
}

export class MemberSearchResult implements IMemberSearchResult {
   
  gmpi: String;
  lastName: String;
  firstName: String;
  dateOfBirth: Date;
  addresses: [IAddress];
   
}

export class memberSearch implements IMemberSearch{
  constructor(members:[MemberSearchResult])
  {
    this.members = members
  }

  members?: [IMemberSearchResult];
  
}

export interface IEligibilityBenefit{
  name: String;
  description: String;
}

export class EligibilityBenefit implements IEligibilityBenefit{
  name: String;
  description: String;

}

export const EligibilityBenefitSchema = new Schema<IEligibilityBenefit>({
  name: String,
  description: {type: String, required: false}
})

export interface IEligibilityPlan {
  name: String;
  code: String;
  startDate? : Date;
  endDate? : Date;
  verifiedDate?: Date;
  benefits: [IEligibilityBenefit];
}

export class EligibilityPlan implements IEligibilityPlan{
  name: String;
  code: String;
  startDate?: Date;
  endDate?: Date;
  verifiedDate?: Date;
  benefits: [IEligibilityBenefit];

}

export const EligibilityPlanSchema = new Schema<IEligibilityPlan>(
  {
    name: String,
    code: String,
    startDate: Date,
    endDate: Date,
    verifiedDate: Date,
    benefits: [EligibilityBenefitSchema],
  }
)

export interface IEligibilityItem{
  insurer: String;
  pcp: String;
  memberId: String;
  plan: IEligibilityPlan;
}

export const EligibilityItemSchema = new Schema<IEligibilityItem>({
  insurer: String,
  pcp: String,
  memberId: String,
  plan: EligibilityPlanSchema
})

export class EligibilityItemModel implements IEligibilityItem{
  insurer: String;
  pcp: String;
  memberId: String;
  plan: IEligibilityPlan;
}

export interface IEligibilityModel{
  gmpi: String;
  eligibility: [IEligibilityItem];
}

export class EligibilityModel implements IEligibilityModel{
  gmpi: String;
  eligibility: [IEligibilityItem];
}

export interface IMember {
  gmpi: String;
  provider: String;
  lastName: String;
  firstName: String;
  dateOfBirth: Date;
  memberId: String;
  phoneNumber: String;
  addresses: [IAddress];
  eligibility: [IEligibilityItem];
}


export const member = new Schema<IMember>(
  {
    gmpi: {type: String, required: true},
    provider: {type: String, required:true},
    lastName: {type: String, required: true },
    firstName: {type: String, required: true},
    dateOfBirth: {type: Date, required: false},
    memberId: {type: String, required:false } ,
    phoneNumber: {type:String,required:false},
    addresses: [address],
    eligibility: [EligibilityItemSchema]
 });


 export interface IEligibilityVerification {
  isEligibile: Boolean,
  startDate?: Date,
  endDate?: Date
 }

 export class EligibilityVerification implements IEligibilityVerification{
   isEligibile: Boolean;
   startDate?: Date;
   endDate?: Date;

 }
const MemberModel = model("member", member);

export {MemberModel};
 

