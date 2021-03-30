import Pathology from "../../../domain/entities/Pathology";

export default interface IPathologyService
{
    verifyPathologyExisitsInHealthcareApi(): Promise<Pathology>;
    sampleInjectableRepositoryPathology(): Promise<Pathology>;    
}