import { UserType, RegistrationType } from './entity/user.entity'
export interface IRegisterUser{

    user_type: UserType
    first_name: string
    last_name:string
    email: string
    phone?: string
    password: string
    cnic: string
    business_name?:string
    registration_type:RegistrationType
}

export interface ILoginUser{

    email: string
    password:string

}

export interface IUserResponse{

    id: number
    user_type: string
    phone?:string
    status:string
    created_at: Date
}