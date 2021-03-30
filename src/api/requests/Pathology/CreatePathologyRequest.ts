import { Length, IsNotEmpty } from "class-validator";

export default class CreatePathologyRequest {

  constructor(){}

  @IsNotEmpty()
  public CID: string;

  @Length(4, 45)
  public Description: string;


}