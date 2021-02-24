import Pathology from "../../../core/entities/Pathology";

export default interface IPathologyService
{
    verifyPathologyExisitsInHealthcareApi(): Promise<Pathology>;
    sampleInjectableRepositoryPathology(): Promise<Pathology>;    
}