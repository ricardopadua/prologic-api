import { Length, IsNotEmpty } from "class-validator";

export default class UserInfoUpdateRequest {

  constructor(){
    this.UpdatedAt = new Date();
  }

  @IsNotEmpty({ message: 'Nickname Is not Empty'})
  public Nickname: number;
  
  public Avatar: string;

  public UpdatedAt: Date;

  @IsNotEmpty({ message: 'First Name Is not Empty'})
  @Length(3, 20, { message: 'First Name must be between 3 and 20 characters.'})
  public FirstName?: string;

  @IsNotEmpty({ message: 'Last Name Is not Empty'})
  @Length(3, 20, { message: 'Last Name must be between 3 and 20 characters.'})
  public LastName: string;

}