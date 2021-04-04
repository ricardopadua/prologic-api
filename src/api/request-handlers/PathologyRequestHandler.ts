import { inject, injectable } from 'inversify';
import Pathology from '../../domain/entities/Pathology';
import IPathologyRepository from '../../domain/interfaces/repositories/IPathologyRepository';
import { TYPES } from '../../Types';
import { IOperationResult } from '../operation-result/OperationResult';
import CreatePathologyRequest from '../requests/Pathology/CreatePathologyRequest';
import FindAllPathologyRequest from '../requests/Pathology/FindAllPathologyRequest';
import FindOnePathologyRequest from '../requests/Pathology/FindOnePathologyRequest';
import RemovePathologyRequest from '../requests/Pathology/RemovePathologyRequest';
import UpdatePathologyRequest from '../requests/Pathology/UpdatePathologyRequest';


export interface IPathologyRequestHandler {
    UpdatePathologyRequestHandle(request: UpdatePathologyRequest);
    CreatePathologyRequestHandle(request: CreatePathologyRequest);
    FindOnePathologyRequestHandle(request: FindOnePathologyRequest);
    FindAllPathologyRequestHandle(request: FindAllPathologyRequest);
    RemovePathologyRequestHandle(request: RemovePathologyRequest);
    SendCommand(request: any);
}


@injectable()
export default class PathologyRequestHandler implements IPathologyRequestHandler {
    public constructor(
        @inject(TYPES.OperationResult) private readonly _operationResult: IOperationResult,
        @inject(TYPES.PathologyRepository) private readonly _repository: IPathologyRepository
    ) { }

    public SendCommand(request: any) {
        const Handle = {
            'UpdatePathologyRequest': (request: UpdatePathologyRequest) => this.UpdatePathologyRequestHandle(request),
            'CreatePathologyRequest': (request: CreatePathologyRequest) => this.CreatePathologyRequestHandle(request),
            'FindOnePathologyRequest': (request: FindOnePathologyRequest) => this.FindOnePathologyRequestHandle(request),
            'FindAllPathologyRequest': (request: FindAllPathologyRequest) => this.FindAllPathologyRequestHandle(request),
            'RemovePathologyRequest': (request: RemovePathologyRequest) => this.RemovePathologyRequestHandle(request),
        }

        return Handle[`${request.constructor.name}`](request);
    }

    public UpdatePathologyRequestHandle(request: UpdatePathologyRequest) {
        return this._repository.update(request);
    };

    public async CreatePathologyRequestHandle(request: CreatePathologyRequest) {
        const pathology = new Pathology(request.CID, request.Description);
        const createdPathology = await this._repository.create(pathology);
        return this._operationResult.Created([createdPathology])
    };

    public FindOnePathologyRequestHandle(request: FindOnePathologyRequest) {
        return this._repository.findOne(request.Id);
    };

    public FindAllPathologyRequestHandle(request: FindAllPathologyRequest) {
        return this._repository.findAll(request);
    };

    public RemovePathologyRequestHandle(request: RemovePathologyRequest) {  
        return this._repository.remove(request.Id);
    };
}

