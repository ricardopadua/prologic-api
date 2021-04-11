"use strict";
// import express from 'express';
// import swaggerJsDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
class Swagger {
    Definition() {
        return {
            info: {
                title: "Title Api Rest.",
                version: "1.0.0",
                description: "Description Api Rest."
            },
            servers: ["http://localhost:8433"],
            authAction: { JWT: { name: "JWT", schema: { type: "apiKey", in: "header", name: "Authorization", description: "" }, value: "Bearer <JWT>" } }
        };
    }
    Options() {
        const definition = this.Definition();
        return {
            definition,
            authAction: { JWT: { name: "JWT", schema: { type: "apiKey", in: "header", name: "Authorization", description: "" }, value: "Bearer <JWT>" } },
            apis: ["./src/api/controllers/*.ts"]
        };
    }
    ;
    Build() {
        return {
            url: '/swagger',
            serve: swagger_ui_express_1.default.serve,
            setup: swagger_ui_express_1.default.setup(swagger_jsdoc_1.default(this.Options()))
        };
    }
    ;
}
exports.default = new Swagger();
//# sourceMappingURL=Swagger.js.map