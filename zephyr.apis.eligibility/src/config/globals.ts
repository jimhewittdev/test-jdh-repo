// Environment variables imported from .env file
export const env = {
	ELIG_URL: process.env.ELIG_URL ||  "http://localhost:3000/api/v1/members/eligibility/{provider}/{gmpi}",
	SEARCH_URL: process.env.SEARCH_URL || "http://localhost:3000/api/v1/members/search/",
	NODE_ENV: process.env.NODE_ENV || 'development',
	NODE_PORT: process.env.NODE_PORT || process.env.PORT || 3001,
	DOMAIN: process.env.DOMAIN,
};
