import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pet Adoption API',
      version: '1.0.0',
      description: 'Api para manejar usuarios, mascotas y adopciones'
    },
    servers: [
      {
        url: 'http://localhost:8080'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '69f135b491d984eaa1308c96'
            },
            first_name: {
              type: 'string',
              example: 'Sebastian'
            },
            last_name: {
              type: 'string',
              example: 'Lopez'
            },
            email: {
              type: 'string',
              example: 'seba.lopez@example.com'
            },
            role: {
              type: 'string',
              example: 'user'
            },
            pets: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        },
        UserInput: {
          type: 'object',
          required: ['first_name', 'last_name', 'email', 'password'],
          properties: {
            first_name: {
              type: 'string',
              example: 'Sebastian'
            },
            last_name: {
              type: 'string',
              example: 'Lopez'
            },
            email: {
              type: 'string',
              example: 'seba.lopez@example.com'
            },
            password: {
              type: 'string',
              example: 'Password123!'
            }
          }
        },
        Pet: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '69f135b491d984eaa1308c96'
            },
            name: {
              type: 'string',
              example: 'Firulais'
            },
            specie: {
              type: 'string',
              example: 'dog'
            },
            birthDate: {
              type: 'string',
              format: 'date'
            },
            adopted: {
              type: 'boolean',
              example: false
            },
            image: {
              type: 'string',
              example: 'https://example.com/firulais.jpg'
            },
            owner: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        PetInput: {
          type: 'object',
          required: ['specie'],
          properties: {
            name: {
              type: 'string',
              example: 'Firulais'
            },
            specie: {
              type: 'string',
              example: 'dog'
            },
            birthDate: {
              type: 'string',
              format: 'date'
            },
            image: {
              type: 'string',
              example: 'https://example.com/firulais.jpg'
            }
          }
        },
        Adoption: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '69f135b491d984eaa1308c96'
            },
            owner: {
              $ref: '#/components/schemas/User'
            },
            pet: {
              $ref: '#/components/schemas/Pet'
            }
          }
        },
        AdoptionInput: {
          type: 'object',
          required: ['owner', 'pet'],
          properties: {
            owner: {
              type: 'string',
              example: '69f135b491d984eaa1308c96',
              description: 'ID del usuario'
            },
            pet: {
              type: 'string',
              example: '69f135b491d984eaa1308c97',
              description: 'ID de la mascota'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;