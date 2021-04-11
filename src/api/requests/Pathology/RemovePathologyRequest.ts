import { IsNotEmpty } from 'class-validator';

export default class RemovePathologyRequest {
  constructor(id: number) {
    this.Id = id;
  }

  @IsNotEmpty()
  Id: number;
}
