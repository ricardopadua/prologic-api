import { inject, injectable } from 'inversify';
import IPathologyRepository from '../../domain/interfaces/repositories/IPathologyRepository';
import CreatePathologyRequest from '../requests/Pathology/CreatePathologyRequest';
import FindAllPathologyRequest from '../requests/Pathology/FindAllPathologyRequest';
import FindOnePathologyRequest from '../requests/Pathology/FindOnePathologyRequest';
import UpdatePathologyRequest from '../requests/Pathology/UpdatePathologyRequest';

 
export interface IPathologyRequestHandler {
    UpdatePathologyRequestHandle(request: UpdatePathologyRequest): Promise<any>;
    CreatePathologyRequestHandle(request: CreatePathologyRequest): Promise<any>;
    FindOnePathologyRequestHandle(request: FindOnePathologyRequest): Promise<any>; 
    FindAllPathologyRequestHandle(request: FindAllPathologyRequest): Promise<any>;
    SendCommand(request: any): any;
}


@injectable()
export default class PathologyRequestHandler implements IPathologyRequestHandler {
    public constructor(@inject('PathologyRepository') private readonly _repository: IPathologyRepository) {}

    public SendCommand(request: any) {
        const Handle = {
            'UpdatePathologyRequest': (request: UpdatePathologyRequest) => this.UpdatePathologyRequestHandle(request),
            'CreatePathologyRequest': (request: CreatePathologyRequest) => this.CreatePathologyRequestHandle(request),
            'FindOnePathologyRequest': (request: FindOnePathologyRequest) => this.FindOnePathologyRequestHandle(request),
            'FindAllPathologyRequest': (request: FindAllPathologyRequest) => this.FindAllPathologyRequestHandle(request),
          
        }

        return Handle[`${request.constructor.name}`](request);
    }

    public UpdatePathologyRequestHandle(request: UpdatePathologyRequest) {
        return this._repository.update(request);  
    };

    public CreatePathologyRequestHandle(request: CreatePathologyRequest) {
    
        return this._repository.create(request) 
    };

    public FindOnePathologyRequestHandle(request: FindOnePathologyRequest) {
    
        return this._repository.findOne(request.Id);
    };

    public FindAllPathologyRequestHandle(request: FindAllPathologyRequest) {
    
        return this._repository.findAll(request);
    };
  
}

