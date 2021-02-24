import { IsNotEmpty, Length } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class Pathology {

    @PrimaryGeneratedColumn({ unsigned: true })
	public id: number;

    @Column({ name: 'cid' })
    @IsNotEmpty()
    public CID: string;

    @Column({ name: 'description' })
    @Length(4, 45)
    public Description: string;

    @Column({ name: 'created_at' })
    @CreateDateColumn()
    public CreatedAt: Date;

    @Column({ name: 'updated_at' })
    @UpdateDateColumn()
    public UpdatedAt: Date;

}