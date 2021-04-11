"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenError = void 0;
const HttpResultBase_1 = require("./HttpResultBase");
class TokenError extends HttpResultBase_1.HttpResultBase {
    constructor(name, error) {
        super(401, name, 'There was a problem with your authorization.', error);
    }
}
exports.TokenError = TokenError;
//# sourceMappingURL=TokenError.js.map