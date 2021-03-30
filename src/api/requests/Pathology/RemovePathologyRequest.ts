import { IsNotEmpty } from "class-validator";

export default class RemovePathologyRequest {

  constructor(id: Number){
    this.Id = id;
  }


  @IsNotEmpty()
	Id: Number;

}
