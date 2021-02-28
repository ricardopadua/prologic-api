import { injectable, unmanaged } from 'inversify';
import { Repository, getRepository, DeleteResult, UpdateResult } from 'typeorm';
import IPathologyRepository from '../../domain/interfaces/repositories/IPathologyRepository';
import Pathology from '../../domain/entities/Pathology';
import UpdatePathologyRequest from '../../api/requests/UpdatePathologyRequest';

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
  public async  findAll(): Promise<Pathology[]> {
    return await this._context.find();
  }

  public async  findOne(id: number): Promise<Pathology> {
    return await this._context.findOne(id);
  }

  public async  create(pathology: Pathology): Promise<Pathology> {
    return await this._context.create(pathology);
  }

  public async  update(pathology: UpdatePathologyRequest): Promise<UpdateResult> {
    const result = await this._context
      .createQueryBuilder()
      .update(Pathology)
      .set({ CID: pathology.CID, Description: pathology.Description, UpdatedAt: new Date() })
      .where("id = :id", { id: pathology.id })
      .execute();
    return result;
  }

  public async remove(id: number): Promise<DeleteResult> {
    const result = await this._context
      .createQueryBuilder()
      .delete()
      .from(Pathology)
      .where("id = :id", { id: id })
      .execute();
    return result;
  }

}