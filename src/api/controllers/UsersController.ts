import { JsonController, Get, Param } from 'routing-controllers';
import { Roles as _ } from '../../domain/enums/Roles';

@JsonController('/users')
export default class UsersController {

  @Get('/:id')
  public findAll(@Param('id') id: number) 
  {
    return `userId: ${id}`;
  }
}