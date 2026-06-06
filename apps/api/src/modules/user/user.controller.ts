import { Request, Response } from "express";
import { registerUser, loginUser} from './user.service'

export const register = async (req: Request, res: Response) => {

try {

    const user = await registerUser(req.body)
    res.status(201).json({

        success: true,
        message: 'User registered successfully',
        data: user
    })


}   catch (error: any){

    res.status(400).json({
        success:false,
        message: error.message
    })
}




}

export const login = async (req:Request,res:Response) =>{

    try {
        const user = await loginUser(req.body)
        res.status(200).json({
            success:true,
            message: 'Login sucessful',
            data:user


        })
    } catch (error:any){

        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}