import { injectable, unmanaged } from 'inversify';
import { Repository, getRepository, UpdateResult, InsertResult } from 'typeorm';
import { User } from '../../domain/entities/User';
import IUserRepository from '../../domain/interfaces/repositories/IUserRepository';

@injectable()
export default class UserRepository implements IUserRepository {
  private readonly _context: Repository<User>;

  public constructor(
    @unmanaged() context: Repository<User>
  ) {
    this._context = context;
    this._context = getRepository(User);
  }

  /**
   * User FindAll documentation
   * @param take: informs the total number of items per result
   * @param skip: receives the page and calculates the initial amount to be ignored
   * @returns return paginated User
   */
  public async FindAll(take: number, skip: number): Promise<{ data: User[], total: number }> {
    const [data, total] = await this._context.findAndCount({ take, skip });
    return { data, total };
  }

  /**
   * User Exist documentation
   * @param email param for search user by email
   * @returns return true when the user is found
   */
  public async Exist(email: string): Promise<boolean> {
    const user = await this._context.createQueryBuilder()
      .where("email = :email", { email: email })
      .execute();
    return user.length === 1;
  }

  /**
   * User Exist documentation
   * @param email param for search user by email
   * @returns return true when the user is found
   */
  public async FindOne(email: string): Promise<User> {
    const user = await this._context.createQueryBuilder()
      .where("email = :email", { email: email })
      .getOne();
    return user;
  }

  /**
   * User Authenticate documentation (Obect param LoginRequest)
   * @param email param for search user by email
   * @param password param for validate user by password
   * @returns return true when the email and password is valid
   */
  public async Authenticate(email: string, password: string) {
    const user = await this._context.createQueryBuilder()
      .where("email = :email", { email: email })
      .getOne();
    return (user && user.CheckIfUnencryptedPasswordIsValid(password));
  }

  /**
   * User Register documentation
   * @param user param for creating new User
   * @returns return Promisse<User> 
   */

  public async Register(user: User): Promise<any> {
    user.EncryptedRole(user.Role ?? ['GUEST'].toString());
    user.HashPassword(user.Password.trim())
    user.GenerateNickName(user.FirstName.trim(), user.LastName.trim())
    const _data = await this._context.save(user);
    const { Id, Nickname, Role, FirstName, LastName, Email } = _data;
    return { Id, Nickname, Role, FirstName, LastName, Email };
  }

  /**
   * User Authenticate documentation (Obect param User)
   * @param FirstName param for update user first_name
   * @param LastName param for update user last_name
   * @param Avatar param for update user avatar
   * @returns return true when the email and password is valid
   */

  public async UpdateUserInfo(user: User): Promise<UpdateResult> {
    const result = await this._context.createQueryBuilder()
      .update(User)
      .set({ FirstName: user.FirstName, LastName: user.LastName, Avatar: user.Avatar, UpdatedAt: new Date() })
      .where("nickname = :nickname", { nickname: user.Nickname })
      .execute();
    return result;
  }

  /**
   * User CheckIfNeedActivation documentation
   * @param nickname param for search user by nickname
   * @param mark param for update user active
   * @returns return UpdateResult when the user active is updated
   */

  public async CheckIfNeedActivation(nickname: string, mark: boolean): Promise<UpdateResult> {
    const result = await this._context.createQueryBuilder()
      .update(User)
      .set({ Active: mark, UpdatedAt: new Date() })
      .where("nickname = :nickname", { nickname: nickname })
      .execute();
    return result;
  }

}