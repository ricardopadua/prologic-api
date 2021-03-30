import { inject, injectable } from 'inversify';
import { User } from '../../domain/entities/User';
import IUserRepository from '../../domain/interfaces/repositories/IUserRepository';
import { IOperationResult } from '../operation-result/OperationResult';
import PaginatedRequest from '../requests/PaginatedRequest';
import UserLoginRequest from '../requests/User/UserLoginRequest';
import UserRegisterRequest from '../requests/User/UserRegisterRequest';
 
export interface IUserRequestHandler {
    UserFindAllRequestHandle(request: PaginatedRequest);
    UserLoginRequestHandle(request: UserLoginRequest);
    UserRegisterRequestHandle(request: UserRegisterRequest);
    SendCommand(request: any): any;
}


@injectable()
export default class UserRequestHandler implements IUserRequestHandler {
    public constructor(
        @inject('OperationResult') private readonly _operationResult: IOperationResult,
        @inject('UserRepository') private readonly _repository: IUserRepository
    ) {}


    public SendCommand(request: any) {
        const Handle = {
            'PaginatedRequest': (request: PaginatedRequest) => this.UserFindAllRequestHandle(request),
            'UserLoginRequest': (request: UserLoginRequest) => this.UserLoginRequestHandle(request),
            'UserRegisterRequest': (request: UserRegisterRequest) => this.UserRegisterRequestHandle(request),
        }

        return Handle[`${request.constructor.name}`](request);
    }

    public UserFindAllRequestHandle(request: PaginatedRequest) {
        return this._repository.FindAll(request.Limit, request.Page);
    };

    public async UserLoginRequestHandle(request: UserLoginRequest) {
        const userExist = await this._repository.Exist(request.Email);
        if(!userExist) return this._operationResult.BadRequest([
            'Invalid credentials.',
            'User doesn´t exist.',
        ]);

        const userCredentialsIsValid = await this._repository.Authenticate(request.Email, request.Password);
        if(!userCredentialsIsValid) return this._operationResult.BadRequest([
            'Invalid credentials.',
            'Password is not Match.',
        ]);

        // todo
        const user = this._repository.FindOne(request.Email);

        return this._repository.Authenticate(request.Email, request.Password);
    };

    public async UserRegisterRequestHandle(request: UserRegisterRequest) {
        const emailIsValid = !(await this._repository.Exist(request.Email));
        if(!emailIsValid) return this._operationResult.BadRequest([`The email ${request.Email} is already in use.`]);

        const userRegistred =   await this._repository.Register(new User(
            request.FirstName,
            request.LastName,
            request.Email,
            null,
            request.Password,
        ));

        return this._operationResult.Created([userRegistred])
      
    };
  
}



