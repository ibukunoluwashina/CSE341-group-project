const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Book Store Application',
        description: 'APIs endpoints documentation for the App'
    }, 
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFile, doc);