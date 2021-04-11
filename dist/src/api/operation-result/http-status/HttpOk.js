"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpOk = void 0;
const HttpResultBase_1 = require("./HttpResultBase");
class HttpOk extends HttpResultBase_1.HttpResultBase {
    constructor(data) {
        super(200, 'Created', 'The request was successful.', []);
        this.Status = true;
        this.Data = data;
    }
}
exports.HttpOk = HttpOk;
//# sourceMappingURL=HttpOk.js.map