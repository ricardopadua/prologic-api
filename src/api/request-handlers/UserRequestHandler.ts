import { inject, injectable } from 'inversify';
import environment from '../../../config';
import { User } from '../../domain/entities/User';
import IUserRepository from '../../domain/interfaces/repositories/IUserRepository';
import { TYPES } from '../../Types';
import { IOperationResult } from '../operation-result/OperationResult';
import PaginatedRequest from '../requests/PaginatedRequest';
import UserLoginRequest from '../requests/User/UserLoginRequest';
import UserRegisterRequest from '../requests/User/UserRegisterRequest';
import UserLogoutRequest from '../requests/User/UserLogoutRequest';
import jwt from 'jsonwebtoken';

export interface IUserRequestHandler {
    UserFindAllRequestHandle(request: PaginatedRequest);
    UserLoginRequestHandle(request: UserLoginRequest);
    UserLogoutRequestHandle(request: UserLogoutRequest);
    UserRegisterRequestHandle(request: UserRegisterRequest);
    SendCommand(request: any): any;
}


@injectable()
export default class UserRequestHandler implements IUserRequestHandler {
    public constructor(
        @inject(TYPES.OperationResult) private readonly _operationResult: IOperationResult,
        @inject(TYPES.UserRepository) private readonly _repository: IUserRepository
    ) { }

    public SendCommand(request: any) {
        const Handle = {
            'PaginatedRequest': (request: PaginatedRequest) => this.UserFindAllRequestHandle(request),
            'UserLoginRequest': (request: UserLoginRequest) => this.UserLoginRequestHandle(request),
            'UserLogoutRequest': (request: UserLogoutRequest) => this.UserLogoutRequestHandle(request),
            'UserRegisterRequest': (request: UserRegisterRequest) => this.UserRegisterRequestHandle(request),
        }

        return Handle[`${request.constructor.name}`](request);
    }

    public UserFindAllRequestHandle(request: PaginatedRequest) {
        return this._repository.FindAll(request.Limit, request.Page);
    };

    public async UserLoginRequestHandle(request: UserLoginRequest) {
        const userExist = await this._repository.Exist(request.Email);
        if (!userExist) return this._operationResult.BadRequest([
            'Invalid credentials.',
            'User doesn´t exist.',
        ]);

        const userCredentialsIsValid = await this._repository.Authenticate(request.Email, request.Password);
        if (!userCredentialsIsValid) return this._operationResult.Unauthorized([
            'Invalid credentials.',
            'Password is not Match.',
        ]);

        const user = await this._repository.FindOne(request.Email);

        const token = jwt.sign({
            data: {
                nickname: user.Nickname,
                roles: user.Role,
                avatar: user.Avatar
            }
        }, environment.express.secret, { expiresIn: 900 });

        return { token: token };
    };

    UserLogoutRequestHandle(request: UserLogoutRequest) {
       return this._operationResult.Ok();
    }


    public async UserRegisterRequestHandle(request: UserRegisterRequest) {
        const emailIsValid = !(await this._repository.Exist(request.Email));
        if (!emailIsValid) return this._operationResult.BadRequest([`The email ${request.Email} is already in use.`]);

        const user = new User(request.FirstName, request.LastName, request.Email, null, request.Password);
        const userRegistered = await this._repository.Register(user);

        return this._operationResult.Created([userRegistered])
    };

}



