"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaginatedRequest {
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
exports.default = PaginatedRequest;
//# sourceMappingURL=PaginatedRequest.js.map