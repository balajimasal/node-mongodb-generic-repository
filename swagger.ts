import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'nodejs-mongodb-generic-repo',
      version: '1.0.0',
      description: 'Your API Description',
    },
  },
  apis: ['./src/routes/index.ts'], // Add your route files here
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;