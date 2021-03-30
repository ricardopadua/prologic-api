import { Length, IsNotEmpty, IsEmail } from "class-validator";

export default class UserRegisterRequest {

  constructor(){}

  @IsNotEmpty({ message: 'First Name Is not Empty'})
  @Length(3, 20, { message: 'First Name must be between 3 and 20 characters.'})
  public FirstName: string;

  @IsNotEmpty({ message: 'Last Name Is not Empty'})
  @Length(3, 20, { message: 'Last Name must be between 3 and 20 characters.'})
  public LastName: string;

  @IsNotEmpty({ message: 'Email Is not Empty'})
  @Length(3, 40, { message: 'Email must be between 5 and 40 characters.'})
  @IsEmail()
  public Email: string;

  @IsNotEmpty({ message: 'Password Is not Empty'})
  @Length(8, 40, { message: 'Password must be between 8 and 40 characters.'})
  public Password: string;

}