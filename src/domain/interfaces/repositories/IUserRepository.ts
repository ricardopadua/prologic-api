import { UpdateResult } from 'typeorm';
import { User } from '../../entities/User';

export default interface IUserRepository {
  FindAll(take: number, skip: number): Promise<{ data: User[]; total: number }>;
  FindOne(email: string): Promise<User>;
  Exist(email: string): Promise<boolean>;
  Authenticate(email: string, password: string): Promise<boolean>;
  Register(user: User): Promise<User>;
  UpdateUserInfo(user: User): Promise<UpdateResult>;
  CheckIfNeedActivation(nickname: string, mark: boolean): Promise<UpdateResult>;
}
