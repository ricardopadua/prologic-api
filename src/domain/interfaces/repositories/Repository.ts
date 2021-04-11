// import User from "../../../entities/User";

import Pathology from '../../entities/Pathology';

export type Query<T> = {
  [P in keyof T]?: T[P] | { $regex: RegExp };
};

export interface Repository<T> {
  save(doc: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  findManyById(ids: string[]): Promise<T[]>;
  findManyByQuery(query?: Query<T>): Promise<T[]>;
}

export type UserRepository = Repository<Pathology>;
