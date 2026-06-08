import { Request, Response } from "express";
import { registerUser, loginUser, logoutUser } from './user.service'
import{deleteUser as deleteUserService} from './user.service'

export const register = async (req: Request, res: Response) => {
    try {
        const user = await registerUser(req.body)
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const user = await loginUser(req.body)
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: user
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const result = await logoutUser()
        res.status(200).json({
            success: true,
            message: result.message
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}




export const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await deleteUserService(Number(req.params.id))
        res.status(200).json({
            success: true,
            message: result.message
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
