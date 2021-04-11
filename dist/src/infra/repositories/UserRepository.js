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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const User_1 = require("../../domain/entities/User");
let UserRepository = class UserRepository {
    constructor(context) {
        this._context = context;
        this._context = typeorm_1.getRepository(User_1.User);
    }
    /**
     * User FindAll documentation
     * @param take: informs the total number of items per result
     * @param skip: receives the page and calculates the initial amount to be ignored
     * @returns return paginated User
     */
    async FindAll(take, skip) {
        const [data, total] = await this._context.findAndCount({ take, skip });
        return { data, total };
    }
    /**
     * User Exist documentation
     * @param email param for search user by email
     * @returns return true when the user is found
     */
    async Exist(email) {
        const user = await this._context
            .createQueryBuilder()
            .where('email = :email', { email: email })
            .execute();
        return user.length === 1;
    }
    /**
     * User Exist documentation
     * @param email param for search user by email
     * @returns return true when the user is found
     */
    async FindOne(email) {
        const user = await this._context
            .createQueryBuilder()
            .where('email = :email', { email: email })
            .getOne();
        return user;
    }
    /**
     * User Authenticate documentation (Obect param LoginRequest)
     * @param email param for search user by email
     * @param password param for validate user by password
     * @returns return true when the email and password is valid
     */
    async Authenticate(email, password) {
        const user = await this._context
            .createQueryBuilder()
            .where('email = :email', { email: email })
            .getOne();
        return user && user.CheckIfUnencryptedPasswordIsValid(password);
    }
    /**
     * User Register documentation
     * @param user param for creating new User
     * @returns return Promisse<User>
     */
    async Register(user) {
        var _a;
        user.EncryptedRole((_a = user.Role) !== null && _a !== void 0 ? _a : ['GUEST'].toString());
        user.HashPassword(user.Password.trim());
        user.GenerateNickName(user.FirstName.trim(), user.LastName.trim());
        const _data = await this._context.save(user);
        const { Id, Nickname, Role, FirstName, LastName, Email } = _data;
        return { Id, Nickname, Role, FirstName, LastName, Email };
    }
    /**
     * User Authenticate documentation (Obect param User)
     * @param FirstName param for update user first_name
     * @param LastName param for update user last_name
     * @param Avatar param for update user avatar
     * @returns return true when the email and password is valid
     */
    async UpdateUserInfo(user) {
        const result = await this._context
            .createQueryBuilder()
            .update(User_1.User)
            .set({
            FirstName: user.FirstName,
            LastName: user.LastName,
            Avatar: user.Avatar,
            UpdatedAt: new Date(),
        })
            .where('nickname = :nickname', { nickname: user.Nickname })
            .execute();
        return result;
    }
    /**
     * User CheckIfNeedActivation documentation
     * @param nickname param for search user by nickname
     * @param mark param for update user active
     * @returns return UpdateResult when the user active is updated
     */
    async CheckIfNeedActivation(nickname, mark) {
        const result = await this._context
            .createQueryBuilder()
            .update(User_1.User)
            .set({ Active: mark, UpdatedAt: new Date() })
            .where('nickname = :nickname', { nickname: nickname })
            .execute();
        return result;
    }
};
UserRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.unmanaged()),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserRepository);
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map