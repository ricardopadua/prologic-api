import { IsNotEmpty } from 'class-validator';

export default class FindOnePathologyRequest {
  constructor(id: Number) {
    this.Id = id;
  }

  @IsNotEmpty()
  Id: Number;
}
