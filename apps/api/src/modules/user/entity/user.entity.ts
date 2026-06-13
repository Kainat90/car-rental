import e from 'express'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm'


export enum UserType{
    customer ="customer",
vendor = "vendor",
superadmin="superadmin",

}
export enum RegistrationType {

    online="online",
    walk_in ="walk_in"
}

export enum Status{

    active="active",
    inactive="inactive",
    banned="banned"
}


@Entity('users')

export class User{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'enum', enum: UserType})
    user_type!: UserType

    @Column ({ type: 'enum', enum: Status, default: Status.active })
    status!: Status

    @Column ({ type: 'enum',enum: RegistrationType, nullable:true})
    registration_type!:RegistrationType

    @Column({})
    first_name!: string

    @Column({nullable:true})
    last_name!: string

    @Column({unique:true})
    email!:string

    @Column({nullable:true})
    phone!:string
@Column({unique:true})
cnic!:string

@Column()
password_hash!:string

@Column({nullable:true})
registered_by!:number
@Column({nullable:true})
approved_by!:number

@Column({nullable:true})
business_name!:string

@Column({ nullable: true })
approved_at!: Date
    @CreateDateColumn()
    created_at!: Date


}