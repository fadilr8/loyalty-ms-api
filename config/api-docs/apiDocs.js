const schemas = require('./schemas/index')
const paths = require('./paths/index')

const apiDocs = {
    "definition": {
        "openapi": "3.0.0",
        "info": {
            "title": "Loyalty MS API",
            "description": "Loyalty MS API documentation",
            "version": "1.0.0"
        },
        "servers": [
            {"url": "http://localhost:3001/api"},
        ],
        "components": {
            "securitySchemes": {
                "bearerAuth": {
                    "type": "http",
                    "scheme": "bearer",
                    "description": "JSON web token. Get this from '/users/firebase-auth' endpoint"
                }
            },
            "schemas": {...schemas},           
        },
        "paths": {...paths}
    },
    "apis": ["./routes/*.js"],
}

module.exports = apiDocs