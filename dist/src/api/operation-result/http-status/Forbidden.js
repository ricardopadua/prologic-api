"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = void 0;
const HttpResultBase_1 = require("./HttpResultBase");
class Forbidden extends HttpResultBase_1.HttpResultBase {
    constructor(error) {
        super(403, 'ForbiddenError', 'User don´t have privilege level for access resource.', error);
    }
}
exports.Forbidden = Forbidden;
//# sourceMappingURL=Forbidden.js.map