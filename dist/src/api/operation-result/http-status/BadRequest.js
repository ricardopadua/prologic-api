"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const HttpResultBase_1 = require("./HttpResultBase");
class BadRequest extends HttpResultBase_1.HttpResultBase {
    constructor(error) {
        super(400, 'BadRequestError', 'The server cannot or will not process the your request.', error);
    }
}
exports.BadRequest = BadRequest;
//# sourceMappingURL=BadRequest.js.map