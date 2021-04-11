"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCreated = void 0;
const HttpResultBase_1 = require("./HttpResultBase");
class HttpCreated extends HttpResultBase_1.HttpResultBase {
    constructor(data) {
        super(201, 'Created', 'The request was successful and that a new resource was created.', []);
        this.Status = true;
        this.Data = data;
    }
}
exports.HttpCreated = HttpCreated;
//# sourceMappingURL=HttpCreated.js.map