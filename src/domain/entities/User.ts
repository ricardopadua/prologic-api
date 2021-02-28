import { Entity as Entities, Column, Unique } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { v5 as uuidv5 } from 'uuid';
import Entity from "./Entity";
  
  @Entities()
  @Unique(["users"])
  export class User extends Entity {

    @Length(30)
    @Column({ name: 'nickname' })
    public nickname: string;

    @Length(6, 20)
    @Column({ name: 'first_name' })
    public firstName: string;

    @Length(6, 20)
    @Column({ name: 'last_name' })
    public lastName: string;

    @Length(4, 40)
    @Column({ name: 'password' })
    public password: string;
  
    @IsNotEmpty()
    @Column({ name: 'role' })
    public role: string;
  
    public hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }

    public generateNickName() {
        let currentDate = new Date();
        const uuid = uuidv5;
        let _nickname =  currentDate.toString().concat(uuid.toString());
        _nickname = bcrypt.hashSync(this.firstName, 8);
        this.nickname = this.firstName.concat(_nickname);
      }
  
    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
  }