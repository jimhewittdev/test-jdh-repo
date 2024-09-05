// Environment variables imported from .env file
export const env = {
	MONGO_URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=Zephyr.APIS.Eligibility",
	DB_NAME: process.env.DB_NAME || "canonicalModels",
	COLLECTION_NAME: process.env.COLLECTION_NAME || "eligibility",
	NODE_ENV: process.env.NODE_ENV || 'development',
	NODE_PORT: process.env.NODE_PORT || process.env.PORT || 3000,
	DOMAIN: process.env.DOMAIN,
};
