import { injectable, unmanaged } from 'inversify';
import { Repository, getRepository, DeleteResult, UpdateResult } from 'typeorm';
import IPathologyRepository from '../../domain/interfaces/repositories/IPathologyRepository';
import Pathology from '../../domain/entities/Pathology';
import UpdatePathologyRequest from '../../api/requests/Pathology/UpdatePathologyRequest';
import FindAllPathologyRequest from '../../api/requests/Pathology/FindAllPathologyRequest';

 @injectable()
export default class PathologyRepository implements IPathologyRepository  {
  private readonly _context: Repository<Pathology>;

  public constructor(
      @unmanaged() context: Repository<Pathology>
  ) {
      this._context = context;
      this._context = getRepository(Pathology);
  }

    /**
	 * sample documentation
	 * @param skip param sample doc
	 * @param take param sample doc
	 * @returns return sample doc
	 */
  public async  findAll(request: FindAllPathologyRequest): Promise<Pathology[]> {
    return await this._context.find(request.pagination());
  }

  public async  findOne(id: number): Promise<Pathology> {
    return await this._context.findOne(id); 
  }

  public async  create(pathology: Pathology): Promise<Pathology> {
    return await this._context.save(pathology);
  } 

  public async  update(pathology: UpdatePathologyRequest): Promise<UpdateResult> {
    const result = await this._context
      .createQueryBuilder()
      .update(Pathology)
      .set({ CID: pathology.CID, Description: pathology.Description })
      .where("id = :id", { id: pathology.Id })
      .execute();
    return result;
  }

  public async remove(id: number): Promise<DeleteResult> {
    return await this._context.delete(id);
  }
}