import { Schema, model, ObjectId } from 'mongoose';

import { env } from '../../config/globals'
// 1. Create an interface representing a document in MongoDB.
export interface IEligibility {
  _id: ObjectId
  firstName: String;
  lastName: String;
  dateOfBirth?: Date;
  gmpi: String;
}

// 2. Create a Schema corresponding to the document interface.
export const eligibilitySchema = new Schema<IEligibility>({
  _id : { type:  Schema.Types.ObjectId, required: true},
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  gmpi: { type:String, required: true},
  dateOfBirth: Date
});

const EligibilityModel = model(env.COLLECTION_NAME, eligibilitySchema);
export {EligibilityModel};