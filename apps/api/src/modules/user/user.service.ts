import { AppDataSource } from "../../config/database";
import { User } from "./entity/user.entity";
import bcrypt from 'bcrypt'
import { IRegisterUser, ILoginUser } from "./user.types";

const userRepository = AppDataSource.getRepository(User)

export const registerUser = async (data: IRegisterUser) => {
    // check if email already exists
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

    // return safe fields only
    const { password_hash: _, ...safeUser } = user
    return safeUser
}