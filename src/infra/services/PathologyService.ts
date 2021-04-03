import { injectable, inject, unmanaged } from "inversify";
import Pathology from "../../domain/entities/Pathology";
import IPathologyRepository from "../../domain/interfaces/repositories/IPathologyRepository";
import IPathologyService from "../../domain/interfaces/services/IPathologyService";
export const typeUserService = Symbol.for('UserService');
import { TYPES } from "../../Types";

@injectable()
export default class PathologyService implements IPathologyService {
  private _repository: IPathologyRepository;

  public constructor(@inject(TYPES.PathologyRepository) repository: IPathologyRepository) 
  {
    this._repository = repository;
  }
  	/**
	 * sample documentation
	 * @param skip param sample doc
	 * @param take param sample doc
	 * @returns return sample doc
	 */
  public async sampleInjectableRepositoryPathology(): Promise<Pathology> {
    return await this._repository.findOne(1);
  }

  public async verifyPathologyExisitsInHealthcareApi(): Promise<Pathology> {
    return Promise.resolve(new Pathology('eeeeeeeee', 'fffffffffffffff'))
  }
}

