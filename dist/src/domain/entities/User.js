"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const bcrypt = __importStar(require("bcryptjs"));
const uuid_1 = require("uuid");
const Entity_1 = __importDefault(require("./Entity"));
const moment_1 = __importDefault(require("moment"));
let User = class User extends Entity_1.default {
    constructor(firstName, lastName, email, avatar, password, role) {
        super();
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
        this.Avatar = avatar;
        this.Active = false;
        this.Password = password;
        this.Role = role;
    }
    CheckIfUnencryptedRoleIsValidrole(role) {
        throw new Error('Method not implemented.');
    }
    HashPassword(password) {
        this.Password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    EncryptedRole(role) {
        this.Role = bcrypt.hashSync(role, bcrypt.genSaltSync(10));
    }
    GenerateNickName(firstName, lastName) {
        const uuid = uuid_1.v4().substring(0, 23);
        const currentDate = moment_1.default().format('[x]x-[d]MMDDYY-[t]hhmmssSSSa');
        const fullName = ''.concat(firstName, '-', lastName).toLowerCase();
        const _nickname = fullName.concat('-', currentDate, '-', uuid);
        this.Nickname = _nickname;
    }
    CheckIfUnencryptedPasswordIsValid(unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.Password);
    }
    CheckIfUnencryptedRoleIsValid(unencryptedRole) {
        return bcrypt.compareSync(unencryptedRole, this.Role);
    }
};
__decorate([
    class_validator_1.Length(30),
    typeorm_1.Column({ name: 'nickname' }),
    __metadata("design:type", String)
], User.prototype, "Nickname", void 0);
__decorate([
    class_validator_1.Length(6, 20),
    typeorm_1.Column({ name: 'first_name' }),
    __metadata("design:type", String)
], User.prototype, "FirstName", void 0);
__decorate([
    class_validator_1.Length(6, 20),
    typeorm_1.Column({ name: 'last_name' }),
    __metadata("design:type", String)
], User.prototype, "LastName", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Email Is not Empty' }),
    class_validator_1.IsEmail(),
    class_validator_1.Length(4, 40),
    typeorm_1.Column({ name: 'email' }),
    __metadata("design:type", String)
], User.prototype, "Email", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "Avatar", void 0);
__decorate([
    class_validator_1.Length(4, 40),
    typeorm_1.Column({ name: 'password' }),
    __metadata("design:type", String)
], User.prototype, "Password", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Role Is not Empty' }),
    typeorm_1.Column({ name: 'role' }),
    __metadata("design:type", String)
], User.prototype, "Role", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'active' }),
    __metadata("design:type", Boolean)
], User.prototype, "Active", void 0);
User = __decorate([
    typeorm_1.Entity({ name: 'user' }),
    typeorm_1.Unique(['Email']),
    __metadata("design:paramtypes", [String, String, String, String, String, String])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map