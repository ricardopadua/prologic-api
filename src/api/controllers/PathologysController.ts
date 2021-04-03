import { JsonController, Param, Body, Get, Post, Put, Authorized, QueryParams, Delete } from 'routing-controllers';
import { injectable, inject } from "inversify";
import UpdatePathologyRequest from '../requests/Pathology/UpdatePathologyRequest';
import { Roles, Roles as _ } from '../../domain/enums/Roles';
import { IPathologyRequestHandler } from '../request-handlers/PathologyRequestHandler';
import CreatePathologyRequest from '../requests/Pathology/CreatePathologyRequest';
import FindOnePathologyRequest from '../requests/Pathology/FindOnePathologyRequest';
import FindAllPathologyRequest from '../requests/Pathology/FindAllPathologyRequest';
import RemovePathologyRequest from '../requests/Pathology/RemovePathologyRequest';


@injectable()
@JsonController('/pathology')
export default class PathologysController {

  public constructor(@inject('PathologyRequestHandler') private readonly _handle: IPathologyRequestHandler) {}

  @Authorized([Roles.Admin, Roles.Manager, Roles.Guest])
  @Get('/')
  public findAll(@QueryParams() request: FindAllPathologyRequest) 
  {
    return this._handle.SendCommand(request);
  }

  @Authorized([Roles.Admin, Roles.Manager, Roles.Guest])
  @Get('/:id')
  public findOne(@Param('id') id: Number) 
  {
    
    return this._handle.SendCommand(new FindOnePathologyRequest(id));
  }

  @Authorized([Roles.Admin, Roles.Manager])
  @Post("/")
  public createPathology(@Body({ validate: true }) request: CreatePathologyRequest) 
  {
    return this._handle.SendCommand(request);
  }

  @Authorized([Roles.Admin, Roles.Manager])
  @Put('/:id/edit')
  public updatePathology(@Param('id') id: number, @Body({ validate: true }) request: UpdatePathologyRequest) 
  {
    return this._handle.SendCommand(request);
  }

  @Authorized([Roles.Admin])
  @Delete('/:id/remove')
  public removePathology(@Param('id') id: number) {
    return this._handle.SendCommand(new RemovePathologyRequest(id));
  }
}