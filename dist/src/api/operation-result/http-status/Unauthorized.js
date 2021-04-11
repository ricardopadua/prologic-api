"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = void 0;
const HttpResultBase_1 = require("./HttpResultBase");
class Unauthorized extends HttpResultBase_1.HttpResultBase {
    constructor(error) {
        super(401, 'UnauthorizedError', 'User don´t have credentials valid for access resource or don´t be authenticated.', error);
    }
}
exports.Unauthorized = Unauthorized;
//# sourceMappingURL=Unauthorized.js.map