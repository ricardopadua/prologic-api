import { injectable, inject } from 'inversify';
import { JsonController, Param, Body, Get, Post } from 'routing-controllers';
import { Roles as _ } from '../../domain/enums/Roles';
import RegisterRequest from '../requests/User/UserRegisterRequest';
import jwt from 'jsonwebtoken';
import { Authorized } from 'routing-controllers';
import config  from 'config';
import { IUserRequestHandler } from '../request-handlers/UserRequestHandler';
import UserLoginRequest from '../requests/User/UserLoginRequest';

@injectable()
@JsonController('/auth')
export default class AuthenticationController {

  public constructor(@inject('UserRequestHandler') private readonly _handle: IUserRequestHandler) {}

  @Post('/login')
  public Login(@Body({ validate: true }) request: UserLoginRequest) 
  {
    return this._handle.SendCommand(request);
        // const secret: string = config.get('expressSessionOptions.secret');

    // const token = jwt.sign({ 
    //   data: user.Nickname
    // }, secret, { expiresIn: 900});
    return 'login';
  }

  @Authorized(['POST_MODERATOR', 'POST_CREATOR'])
  @Get('/logout')
  public Logout() 
  {
    return 'logout';
  }

  @Post('/register')
  public RegisterUser(@Body({ validate: true }) request: RegisterRequest) 
  {
     return this._handle.SendCommand(request);
  }

  @Get('/my-information')
  public MyInformation(@Param('id') id: Number) 
  {
    
    return 'my information'
  }
}