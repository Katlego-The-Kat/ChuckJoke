'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//NPM Packages used in API
const systemEndpoints = require('./path_handlers/systemEndpoints.js'); //system path Handlers
const Joi = require('joi'); //Object validation framework
const jokehandler = require("./path_handlers/jokehandler");
module.exports = [
  
    { /*/System/API_Ping/*/
		method: 'GET',
		path: '/api/System/API_Ping/',
		config: {
		auth: {strategies:['simple']},
		   plugins: {
				disinfect: {
					disinfectQuery: true,
					disinfectParams: true,
					disinfectPayload: true
				},
				'hapi-geo-locate': {
					enabled: false
				},
				policies: ['isAdmin'],
				'hapi-swagger': {
					responses: {
						'200': {
							'description': 'Success with response data',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(200).required().description('HTTP Status Response Code. 200 - Successfull response with data.'),
									result: Joi.object().required().keys({
										body: Joi.string().required().default('Pong').description('API Result Body. Will contain the word - Pong, if successfull.'),
										details: Joi.string().required().default('success').description('API Result Details. Will contain the word - success, if successfull.')
									})
								}).label('Response 200')
						},
						'206': {
							'description': 'Success but no data found',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(206).required().description('HTTP Status Response Code. 206 - Successfull response with no data.'),
									result: Joi.object().required().keys({
										body: Joi.string().required().default('No Data').description('API Result Body. Will not contain data.'),
										details: Joi.string().required().default('No Data found for input parameters provided').description('API Result Details. Will not contain data.')
									})
								}).label('Response 200')
						},
						'400': {
							'description': 'Bad Request',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(400).required().description('HTTP Status Response Code. 400 - Bad Request.'),
									error: Joi.string().required().default('Bad Request').description('Bad Request.')
								}).label('Response 400')
						},
						'401': {
							'description': 'Unauthorized',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(401).required().description('HTTP Status Response Code. 401 - Unauthorized.'),
									error: Joi.string().required().default('Unauthorized').description('Unauthorized access attpempt.'),
									message: Joi.string().required().default('Missing authentication or Bad Token').description('Missing authentication. Credentials not provided or incorrect'),
									attributes: Joi.object().required().keys({
										error: Joi.string().required().default('Bad token').description('Token provided is not valid.')
									})
								}).label('Response 401')
						},						
						'500': {
							'description': 'Internal Server Error',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(500).required().description('HTTP Status Response Code. 500 - Internal Server Error.'),
									error: Joi.string().required().default('Internal Server Error').description('Internal Server Error.'),
									message: Joi.string().required().default('An internal server error occurred').description('An internal server error occurred')
								}).label('Response 500')
						}
					}
				},
			},
			handler:  systemEndpoints.API_Ping,
			description: 'API Heartbeat Monitoring',
			notes : 'Endpoint used for Heartbeat Monitoring. Monitoring will use this endpoint to check if the API is up and available.',
			tags: ['api'] 
		}
	},
	{ /*/Read Joke Categories/*/
		method: 'GET',
		path: '/api/readCategories/',
		config: {
		auth: {strategies:['simple']},
		   plugins: {
				disinfect: {
					disinfectQuery: true,
					disinfectParams: true,
					disinfectPayload: true
				},
				'hapi-geo-locate': {
					enabled: false
				},
				policies: ['isAdmin'],
				'hapi-swagger': {
					responses: {
						'200': {
							'description': 'Success with response data',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(200).required().description('HTTP Status Response Code. 200 - Successfull response with data.'),
									result: Joi.object().required().keys({
										body: Joi.string().required().default('Pong').description('API Result Body. Will contain the word - Pong, if successfull.'),
										details: Joi.string().required().default('success').description('API Result Details. Will contain the word - success, if successfull.')
									})
								}).label('Response 200')
						},
						'206': {
							'description': 'Success but no data found',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(206).required().description('HTTP Status Response Code. 206 - Successfull response with no data.'),
									result: Joi.object().required().keys({
										body: Joi.string().required().default('No Data').description('API Result Body. Will not contain data.'),
										details: Joi.string().required().default('No Data found for input parameters provided').description('API Result Details. Will not contain data.')
									})
								}).label('Response 200')
						},
						'400': {
							'description': 'Bad Request',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(400).required().description('HTTP Status Response Code. 400 - Bad Request.'),
									error: Joi.string().required().default('Bad Request').description('Bad Request.')
								}).label('Response 400')
						},
						'401': {
							'description': 'Unauthorized',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(401).required().description('HTTP Status Response Code. 401 - Unauthorized.'),
									error: Joi.string().required().default('Unauthorized').description('Unauthorized access attpempt.'),
									message: Joi.string().required().default('Missing authentication or Bad Token').description('Missing authentication. Credentials not provided or incorrect'),
									attributes: Joi.object().required().keys({
										error: Joi.string().required().default('Bad token').description('Token provided is not valid.')
									})
								}).label('Response 401')
						},						
						'500': {
							'description': 'Internal Server Error',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(500).required().description('HTTP Status Response Code. 500 - Internal Server Error.'),
									error: Joi.string().required().default('Internal Server Error').description('Internal Server Error.'),
									message: Joi.string().required().default('An internal server error occurred').description('An internal server error occurred')
								}).label('Response 500')
						}
					}
				},
			},
			handler:  jokehandler.readCategories,
			description: 'Read Categories',
			notes : 'Recipe all categories',
			tags: ['api'] 
		}
	},
	{ //Resolve Random Joke/
		method: 'POST',
		path: '/api/resolveRandomJoke/',
		config: {
		   auth: {strategies:['simple']},
		   plugins: {
			   	'hapi-swagger' : {
					payloadType : 'form',  
					validate: {
						payload : {
							category : Joi.string().required()
						}
					},
					responses: {
						'200': {
							'description': 'Success with response data',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(200).required().description('HTTP Status Response Code. 200 - Successfull response with data.'),
									result: Joi.object().required().keys({
										body: Joi.string().required().default('Pong').description('API Result Body. Will contain the word - Pong, if successfull.'),
										details: Joi.string().required().default('success').description('API Result Details. Will contain the word - success, if successfull.')
									})
								}).label('Response 200')
						},
						'206': {
							'description': 'Success but no data found',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(206).required().description('HTTP Status Response Code. 206 - Successfull response with no data.'),
									result: Joi.object().required().keys({
										body: Joi.string().required().default('No Data').description('API Result Body. Will not contain data.'),
										details: Joi.string().required().default('No Data found for input parameters provided').description('API Result Details. Will not contain data.')
									})
								}).label('Response 200')
						},
						'400': {
							'description': 'Bad Request',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(400).required().description('HTTP Status Response Code. 400 - Bad Request.'),
									error: Joi.string().required().default('Bad Request').description('Bad Request.')
								}).label('Response 400')
						},
						'401': {
							'description': 'Unauthorized',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(401).required().description('HTTP Status Response Code. 401 - Unauthorized.'),
									error: Joi.string().required().default('Unauthorized').description('Unauthorized access attpempt.'),
									message: Joi.string().required().default('Missing authentication or Bad Token').description('Missing authentication. Credentials not provided or incorrect'),
									attributes: Joi.object().required().keys({
										error: Joi.string().required().default('Bad token').description('Token provided is not valid.')
									})
								}).label('Response 401')
						},						
						'500': {
							'description': 'Internal Server Error',
							'schema': Joi.object({
									statusCode: Joi.number().integer().default(500).required().description('HTTP Status Response Code. 500 - Internal Server Error.'),
									error: Joi.string().required().default('Internal Server Error').description('Internal Server Error.'),
									message: Joi.string().required().default('An internal server error occurred').description('An internal server error occurred')
								}).label('Response 500')
						}
					}
				},
				disinfect: {
					disinfectQuery: true,
					disinfectParams: true,
					disinfectPayload: true
				},
				'hapi-geo-locate': {
					enabled: false
				},
				policies: ['isAdmin'],
			},
			handler:  jokehandler.resolveRandomJoke,
			description: 'Resolve Random Joke',
			notes : 'Resolve Random Joke with category',
			tags: ['api']
		}
	}
	

	


	
];