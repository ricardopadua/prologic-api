"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const HttpResultBase_1 = require("./HttpResultBase");
class NotFound extends HttpResultBase_1.HttpResultBase {
    constructor(error) {
        super(404, 'NotFoundError', 'The resource requested couldn´t found in server.', error);
    }
}
exports.NotFound = NotFound;
//# sourceMappingURL=NotFound.js.map