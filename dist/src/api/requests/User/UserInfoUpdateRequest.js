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
const class_validator_1 = require("class-validator");
class UserInfoUpdateRequest {
    constructor() {
        this.UpdatedAt = new Date();
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Nickname Is not Empty' }),
    __metadata("design:type", Number)
], UserInfoUpdateRequest.prototype, "Nickname", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'First Name Is not Empty' }),
    class_validator_1.Length(3, 20, { message: 'First Name must be between 3 and 20 characters.' }),
    __metadata("design:type", String)
], UserInfoUpdateRequest.prototype, "FirstName", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Last Name Is not Empty' }),
    class_validator_1.Length(3, 20, { message: 'Last Name must be between 3 and 20 characters.' }),
    __metadata("design:type", String)
], UserInfoUpdateRequest.prototype, "LastName", void 0);
exports.default = UserInfoUpdateRequest;
//# sourceMappingURL=UserInfoUpdateRequest.js.map