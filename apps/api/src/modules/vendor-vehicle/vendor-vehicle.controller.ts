import { Request, Response } from 'express'
import * as VehicleService from './vendor-vehicle.service'
import { AuthRequest } from '../../middleware/auth.middleware'

export const createVehicle = async (req: AuthRequest, res: Response) => {
    try {
        const vehicle = await VehicleService.createVehicle(req.user!.id, req.body)
        res.status(201).json({ message: 'Vehicle created successfully', vehicle })
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}

export const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const { city, type, max_price, status } = req.query
        const vehicles = await VehicleService.getAllVehicles({
            city: city as string,
            type: type as string,
            max_price: max_price ? Number(max_price) : undefined,
            status: status as any
        })
        res.status(200).json({ vehicles })
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

export const getVehicleById = async (req: Request, res: Response) => {
    try {
        const vehicle = await VehicleService.getVehicleById(Number(req.params.id))
        res.status(200).json({ vehicle })
    } catch (err: any) {
        res.status(404).json({ message: err.message })
    }
}

export const getVendorVehicles = async (req: AuthRequest, res: Response) => {
    try {
        const vehicles = await VehicleService.getVendorVehicles(req.user!.id)
        res.status(200).json({ vehicles })
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

export const updateVehicle = async (req: AuthRequest, res: Response) => {
    try {
        const vehicle = await VehicleService.updateVehicle(
            Number(req.params.id),
            req.user!.id,
            req.body
        )
        res.status(200).json({ message: 'Vehicle updated successfully', vehicle })
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}

export const deleteVehicle = async (req: AuthRequest, res: Response) => {
    try {
        await VehicleService.deleteVehicle(Number(req.params.id), req.user!.id)
        res.status(200).json({ message: 'Vehicle deleted successfully' })
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}

export const verifyVehicle = async (req: AuthRequest, res: Response) => {
    try {
        const vehicle = await VehicleService.verifyVehicle(Number(req.params.id), req.user!.id)
        res.status(200).json({ message: 'Vehicle verified successfully', vehicle })
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}