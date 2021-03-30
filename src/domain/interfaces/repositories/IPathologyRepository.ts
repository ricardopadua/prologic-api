import { UpdateResult } from "typeorm";
import { DeleteResult } from "typeorm";
import CreatePathologyRequest from "../../../api/requests/Pathology/CreatePathologyRequest";
import FindAllPathologyRequest from "../../../api/requests/Pathology/FindAllPathologyRequest";
import UpdatePathologyRequest from "../../../api/requests/Pathology/UpdatePathologyRequest";
import Pathology from "../../../domain/entities/Pathology";

export default interface IPathologyRepository 
{
    findAll(QueryParams: FindAllPathologyRequest): Promise<Pathology[]>     
    findOne(id: Number): Promise<Pathology>;
    create(pathology: CreatePathologyRequest): Promise<Pathology> 
    update(pathology: UpdatePathologyRequest): Promise<UpdateResult> 
    remove(id: number): Promise<DeleteResult> 
}

 