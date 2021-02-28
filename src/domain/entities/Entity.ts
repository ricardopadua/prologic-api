import { IsNotEmpty, Length } from 'class-validator';
import { Column, CreateDateColumn, Entity as Entities, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entities()
export default class Entity {

    @PrimaryGeneratedColumn({ unsigned: true, name: 'id' })
	  public id: number;

    @Column({ name: 'created_at' })
    @CreateDateColumn()
    public CreatedAt: Date;

    @Column({ name: 'updated_at' })
    @UpdateDateColumn()
    public UpdatedAt: Date;

}

