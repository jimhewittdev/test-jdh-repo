//import * as mongoDB from 'mongodb';
import * as mongoose from 'mongoose'
import { env } from '../config/globals'; 
import { logger } from '../config/logger';

export async function connectToDatabase () {

  try { 
    await mongoose.connect(env.MONGO_URL, { dbName: env.DB_NAME } );
    logger.info(`Successfully connected to database: ${env.DB_NAME} and collection: ${env.COLLECTION_NAME}`);
  } catch(err) {
    logger.error(err);
  }
}

export async function disconnetDatabase() {
  try { 
    mongoose.disconnect();
    logger.info("disconnected from database");
  } catch (err ) {
    logger.error(err);
  }
}