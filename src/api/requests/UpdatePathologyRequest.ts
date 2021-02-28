import { IsEmail, Length, MinLength, IsNotEmpty } from "class-validator";

export default class UpdatePathologyRequest {

  constructor(){
    this.UpdatedAt = new Date();
  }

	id: number;

  @IsNotEmpty()
  CID: string;

  @Length(4, 45)
  Description: string;

  UpdatedAt: Date;

}