import { Column, CreateDateColumn, Entity as Entities, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entities()
export default class Entity {

    @PrimaryGeneratedColumn({ unsigned: true, name: 'id' })
	  public Id: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'LOCALTIMESTAMP' })
    public CreatedAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'LOCALTIMESTAMP' })
    public UpdatedAt!: Date;

}

