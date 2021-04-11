"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FindAllPathologyRequest {
    constructor(page, limit) {
        this.Page = page ? page : 1;
        this.Limit = limit ? limit : 10;
    }
    pagination() {
        return {
            skip: this.Page == 1 ? 0 : this.Page * this.Limit - this.Limit,
            take: this.Limit,
        };
    }
}
exports.default = FindAllPathologyRequest;
//# sourceMappingURL=FindAllPathologyRequest.js.map