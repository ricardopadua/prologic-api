import { Length, IsNotEmpty, IsEmail } from "class-validator";

export default class UserLoginRequest {

  constructor(){}

  @IsNotEmpty({ message: 'Client Secret Is not Empty'})
  public ClientSecret: string;

  @IsNotEmpty({ message: 'Email Is not Empty'})
  @IsEmail()
  public Email: string;


  @IsNotEmpty({ message: 'Password Is not Empty'})
  @Length(4, 45)
  public Password: string;

}