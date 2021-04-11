"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationResult = void 0;
const inversify_1 = require("inversify");
const BadRequest_1 = require("./http-status/BadRequest");
const Forbidden_1 = require("./http-status/Forbidden");
const HttpCreated_1 = require("./http-status/HttpCreated");
const HttpOk_1 = require("./http-status/HttpOk");
const NotFound_1 = require("./http-status/NotFound");
const Unauthorized_1 = require("./http-status/Unauthorized");
let OperationResult = class OperationResult {
    constructor() { }
    Ok(data) {
        return new HttpOk_1.HttpOk(data !== null && data !== void 0 ? data : []);
    }
    Created(data) {
        return new HttpCreated_1.HttpCreated(data !== null && data !== void 0 ? data : []);
    }
    BadRequest(data) {
        return new BadRequest_1.BadRequest(data !== null && data !== void 0 ? data : []);
    }
    Unauthorized(data) {
        return new Unauthorized_1.Unauthorized(data !== null && data !== void 0 ? data : []);
    }
    Forbidden(data) {
        return new Forbidden_1.Forbidden(data !== null && data !== void 0 ? data : []);
    }
    NotFound(data) {
        return new NotFound_1.NotFound(data !== null && data !== void 0 ? data : []);
    }
};
OperationResult = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], OperationResult);
exports.OperationResult = OperationResult;
//# sourceMappingURL=OperationResult.js.map