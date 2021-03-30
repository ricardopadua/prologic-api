// import express from 'express';
// import swaggerJsDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';

// class Swagger {
//     public Setup: swaggerUi.SwaggerOptions;
//     public Serve: swaggerUi.SwaggerOptions;

//     constructor () {
//       this.Serve = swaggerUi.serve;
//       this.Setup = swaggerUi.setup(swaggerJsDoc(this.Options()))
//     }

//     private Definition (): any {
//       return {
//         info: {
//           title: "Title Api Rest.",
//           version: "1.0.0",
//           description: "Description Api Rest."
//         },
//         servers: ["http://localhost:8433"]
//       }
//     }

//     private Options () {
//       const definition = this.Definition();
//       return {
//         definition,
//         apis: ["./src/api/controllers/*.ts"]
//       }
//     };

// }

// export default new Swagger();


import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

class Swagger {

    private Definition () {
      return {
        info: {
          title: "Title Api Rest.",
          version: "1.0.0",
          description: "Description Api Rest."
        },
        servers: ["http://localhost:8433"],
        authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
      }
    }

    private Options () {
      const definition = this.Definition();
      return {
        definition,
        authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} },
        apis: ["./src/api/controllers/*.ts"]
      }
    };

    public Build () {
      return {
        url: '/swagger',
        serve: swaggerUi.serve,
        setup: swaggerUi.setup(swaggerJsDoc(this.Options()))
      }
    };
}

export default new Swagger();