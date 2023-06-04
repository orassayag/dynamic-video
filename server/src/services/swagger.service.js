import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import packageJSON from '../../package.json' assert { type: "json" };
import CustomError from '../custom/error.custom.js';

export default class SwaggerService {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Initiate the Swagger service.
   *
   * Get the server's URL and create the parts to initiate the Swagger service.
   * @param url - The server's URL.
   * @return {object}
   */
  static initiate(url) {
    const swaggerOptions = {
      definition: {
        swagger: '2.0',
        info: {
          title: 'Server Swagger',
          version: '0.1.0',
          description:
            'This is a simple CRUD API application made with Express and documented with Swagger',
          license: {
            name: packageJSON.license,
            url: 'https://spdx.org/licenses/MIT.html',
          },
          contact: packageJSON.contributors[0],
        },
        servers: [{ url }],
      },
      apis: ['./src/routes/public/*.js'],
    };
    const swaggerSetup = swaggerJsdoc(swaggerOptions);
    return {
      swaggerUi,
      swaggerSetup,
    };
  }
}
