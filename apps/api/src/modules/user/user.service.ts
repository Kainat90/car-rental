import { AppDataSource } from "../../config/database";
import { User } from "./entity/user.entity";
import bcrypt from 'bcrypt'
import { IRegisterUser, ILoginUser } from "./user.types";
import jwt from "jsonwebtoken";

export interface IUpdateUser {
  phone?: string;
  business_name?: string;
  first_name?:string
  last_name:string
}


export const registerUser = async (data: IRegisterUser) => {
    // check if email already exists
     const userRepository = AppDataSource.getRepository(User)
    const existingUser = await userRepository.findOne({
        where: { email: data.email }
    })

    if (existingUser) {
        throw new Error('Email already exists')
    }

    // hash the password
    const password_hash = await bcrypt.hash(data.password, 10)

    // create user object
    const user = userRepository.create({
        first_name:data.first_name,
        last_name:data.last_name,
        user_type: data.user_type,
        email: data.email,
        phone: data.phone,
        password_hash,
        cnic: data.cnic,
        business_name: data.business_name,
        registration_type: data.registration_type
    })

    // save to database
    const savedUser = await userRepository.save(user)

    // return safe fields only
    const { password_hash: _, ...safeUser } = savedUser
    return safeUser
}

export const loginUser = async (data: ILoginUser) => {
    // find user by email
     const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
        where: { email: data.email }
    })

    if (!user) {
        throw new Error('Invalid email or password!')
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(data.password, user.password_hash)

    if (!isPasswordValid) {
        throw new Error('Invalid email or password!')
    }

    //generate access token

    const accessToken = jwt.sign(
        {id: user.id,email:user.email,user_type: user.user_type},
        process.env.JWT_SECRET as string,
        {expiresIn: '15m'}
    )
 // generate refresh token
    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '7d' }
    )

    // return safe fields + tokens
    const { password_hash: _, ...safeUser } = user
    return {
        user: safeUser,
        accessToken,
        refreshToken
    }

    

}

 export const logoutUser = async () => {
    // without Redis, just return success
    // client is responsible for deleting the token
    return { message: 'Logged out successfully' }
}

export const deleteUser = async (id: number) => {
    const userRepository = AppDataSource.getRepository(User)
    await userRepository.delete({ id })
    return { message: 'Deleted successfully' }
}

export const getMe= async (id: number) => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: {id}
    })

    if (!user){
        throw new Error ('User Not Found')
    }

    const {password_hash:_,...safeUser} = user 
    return safeUser
}

export const updateMe = async (id: number, data: IUpdateUser) => {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: { id }
    })

    if (!user) {
        throw new Error('User not found')
    }

    // whitelist allowed fields
    const allowedFields: (keyof IUpdateUser)[] = [
        "first_name",
        "last_name",
        "phone",
        "business_name"

    ]

    for (const key of allowedFields) {
        const value = data[key]

        if (value !== undefined) {
            user[key] = value
        }
    }

    const updatedUser = await userRepository.save(user)

    const { password_hash: _, ...safeUser } = updatedUser
    return safeUser
}


    //use refresh token to generate new access token

    export const refreshTokenService = async (token:string)=>{

        try{
            const decoded = jwt.verify(
                token,
                process.env.REFRESH_TOKEN_SECRET as string
            ) as {id: number}

            const userRepository = AppDataSource.getRepository(User)
            const user = await userRepository.findOne({
                where: { id: decoded.id}
            })

            if (!user){

                throw new Error('User not found')
            }

            const accessToken = jwt.sign(

                {id: user.id, email: user.email,user_type: user.user_type},
                process.env.JWT_SECRET as string,
                {expiresIn: '15m'}

            )

            return {accessToken}
        } catch (error){
            throw new Error('Invalid or expired refresh token')
        }


    }
