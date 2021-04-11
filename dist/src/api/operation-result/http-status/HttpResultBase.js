"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResultBase = void 0;
class HttpResultBase {
    constructor(httpCode, name, message, error) {
        this.Status = false;
        this.HttpCode = httpCode;
        this.Name = name;
        this.Message = message;
        this.Error = error;
    }
}
exports.HttpResultBase = HttpResultBase;
//# sourceMappingURL=HttpResultBase.js.map