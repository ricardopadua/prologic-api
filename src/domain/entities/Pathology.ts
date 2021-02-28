import { IsNotEmpty, Length } from 'class-validator';
import { Column, Entity as Entities, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Entity from './Entity';

@Entities()
export default class Pathology extends Entity {

    @Column({ name: 'cid' })
    @IsNotEmpty()
    public CID: string;

    @Column({ name: 'description' })
    @Length(4, 45)
    public Description: string;

}