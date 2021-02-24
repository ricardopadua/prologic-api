import { JsonController, Param, Body, Get, Post, Put, Delete, Authorized } from 'routing-controllers';
import { injectable, inject } from "inversify";
import IPathologyService from '../../domain/interfaces/services/IPathologyService';
import PathologyRequest from '../requests/PathologyRequest';
import IPathologyRepository from '../../domain/interfaces/repositories/IPathologyRepository';
import { Roles as _ } from '../../domain/enums/Roles';
import Pathology from '../../domain/entities/Pathology';

@Authorized([_.User])
@injectable()
@JsonController('/pathology')
export default class PathologyController {
  private readonly _service: IPathologyService;
  private readonly _repository: IPathologyRepository;

  public constructor
  (
    @inject('PathologyService') service: IPathologyService,
    @inject('PathologyRepository') repository: IPathologyRepository
  ) 
  {
    this._service = service;
    this._repository = repository
  }

  @Get('/')
  public findAll() 
  {
    return this._repository.findAll();
  }

  @Get('/:id')
  public findOne(@Param('id') id: number) 
  {
    return this._repository.findOne(id);
  }

  @Get('/cid/:id')
  public verifyPathologyExisitsInHealthcareApi() 
  {
    return this._service.verifyPathologyExisitsInHealthcareApi();
  }

  @Post("/")
  public createPathology(@Body({ validate: true }) pathology: Pathology) 
  {
    return this._repository.create(pathology)
  }

  @Put('/:id/update')
  public updatePathology(@Param('id') id: number, @Body({ validate: true }) pathology: PathologyRequest) 
  {
    return this._repository.update(pathology);
  }

  @Delete('/:id/remove')
  public removePathologyById(@Param('id') id: number) {
    return this._repository.remove(id);
  }
}