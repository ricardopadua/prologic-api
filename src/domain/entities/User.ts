import { Entity as Entities, Column, Unique } from "typeorm";
import { Length, IsNotEmpty, IsEmail, IsEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import Entity from "./Entity";
import moment from "moment";
  
  @Entities({ name: 'user'})
  @Unique(['Email'])
  export class User extends Entity {
    CheckIfUnencryptedRoleIsValidrole(role: string) {
      throw new Error('Method not implemented.');
    }

    constructor(firstName: string, lastName: string, email: string, avatar: string, password: string, role?: string) {
        super();
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
        this.Avatar = avatar;
        this.Active = false;
        this.Password = password;
        this.Role = role;
    }


    @Length(30)
    @Column({ name: 'nickname' })
    public Nickname: string;

    @Length(6, 20)
    @Column({ name: 'first_name' })
    public FirstName: string;

    @Length(6, 20)
    @Column({ name: 'last_name' })
    public LastName: string;
    
    @IsNotEmpty({ message: 'Email Is not Empty'})
    @IsEmail()
    @Length(4, 40)
    @Column({ name: 'email'})
    public Email: string;

    @Column({nullable: true, default: null })
    public Avatar?: string;

    @Length(4, 40)
    @Column({ name: 'password'})
    public Password: string;
  
    @IsNotEmpty({ message: 'Role Is not Empty'})
    @Column({ name: 'role' })
    public Role: string;


    @IsNotEmpty()
    @Column({ name: 'active' })
    public Active: boolean;
    
  
    public HashPassword(password: string): void {
      this.Password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    public EncryptedRole(role: string): void {
      this.Role = bcrypt.hashSync(role, bcrypt.genSaltSync(10));
    }

    public GenerateNickName(firstName: string, lastName: string): void {
        const uuid = uuidv4().substring(0,23);
        const currentDate = moment().format('[x]x-[d]MMDDYY-[t]hhmmssSSSa');
        const fullName = ''.concat(firstName,'-',lastName).toLowerCase()
        const _nickname =  fullName.concat('-',currentDate,'-',uuid);
        this.Nickname = _nickname;
      }
  
    public CheckIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
      return bcrypt.compareSync(unencryptedPassword, this.Password);
    }

    public CheckIfUnencryptedRoleIsValid(unencryptedRole: string): boolean {
      return bcrypt.compareSync(unencryptedRole, this.Role);
    }
  }