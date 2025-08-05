import swaggerJsdoc from 'swagger-jsdoc';

// -- Swagger setup --
const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GOX ANALYTICS - User Behavior Analytics API',
            version: '1.0.0',
            description: 'A user behavior analytics platform that allows you to track and analyze user events.',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.routes.ts'],
};
const swaggerConfig = swaggerJsdoc(options);

export default swaggerConfig;