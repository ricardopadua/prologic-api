import { injectable, inject } from 'inversify';
import { JsonController, Body, Get, Post } from 'routing-controllers';
import { Roles } from '../../domain/enums/Roles';
import RegisterRequest from '../requests/User/UserRegisterRequest';
import { Authorized } from 'routing-controllers';
import { IUserRequestHandler } from '../request-handlers/UserRequestHandler';
import UserLoginRequest from '../requests/User/UserLoginRequest';
import { TYPES } from '../../Types';
import UserLogoutRequest from '../requests/User/UserLogoutRequest';

@injectable()
@JsonController('/auth')
export default class AuthenticationController {
  public constructor(
    @inject(TYPES.UserRequestHandler) private readonly _handle: IUserRequestHandler,
  ) {}

  @Post('/login')
  public Login(@Body({ validate: true }) request: UserLoginRequest) {
    return this._handle.SendCommand(request);
  }

  @Authorized([Roles.User, Roles.Guest])
  @Get('/logout')
  public Logout(request = new UserLogoutRequest()) {
    return this._handle.SendCommand(request);
  }

  @Post('/register')
  public RegisterUser(@Body({ validate: true }) request: RegisterRequest) {
    return this._handle.SendCommand(request);
  }
}
