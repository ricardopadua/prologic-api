import { UpdateResult } from "typeorm";
import { DeleteResult } from "typeorm";
import PathologyRequest from "../../../api/requests/PathologyRequest";
import Pathology from "../../../core/entities/Pathology";

export default interface IPathologyRepository 
{
    findAll(): Promise<Pathology[]> 
    findOne(id: number): Promise<Pathology>;
    create(pathology: Pathology): Promise<Pathology> 
    update(pathology: PathologyRequest): Promise<UpdateResult> 
    remove(id: number): Promise<DeleteResult> 
}

