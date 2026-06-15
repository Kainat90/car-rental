import { AppDataSource } from '../../config/database'
import { VendorVehicle, VehicleStatus } from './entity/vendor_vehicle.entity'
import { CreateVehicleInput, UpdateVehicleInput } from './vendor-vehicle.type'

const vehicleRepo = AppDataSource.getRepository(VendorVehicle)

export const createVehicle = async (vendor_id: number, data: CreateVehicleInput) => {
    const existing = await vehicleRepo.findOne({ where: { plate_number: data.plate_number } })
    if (existing) throw new Error('A vehicle with this plate number already exists')

    const vehicle = vehicleRepo.create({
        ...data,
        vendor_id,
        status: VehicleStatus.unavailable,
        is_verified: false
    })

    return await vehicleRepo.save(vehicle)
}

export const getAllVehicles = async (filters: {
    city?: string
    type?: string
    max_price?: number
    status?: VehicleStatus
}) => {
    const query = vehicleRepo.createQueryBuilder('vehicle')
        .where('vehicle.is_verified = :verified', { verified: true })

    if (filters.city) {
        query.andWhere('vehicle.city = :city', { city: filters.city })
    }
    if (filters.type) {
        query.andWhere('vehicle.type = :type', { type: filters.type })
    }
    if (filters.max_price) {
        query.andWhere('vehicle.price_per_day <= :max_price', { max_price: filters.max_price })
    }
    if (filters.status) {
        query.andWhere('vehicle.status = :status', { status: filters.status })
    }

    return await query.getMany()
}

export const getVehicleById = async (id: number) => {
    const vehicle = await vehicleRepo.findOne({ where: { id } })
    if (!vehicle) throw new Error('Vehicle not found')
    return vehicle
}

export const getVendorVehicles = async (vendor_id: number) => {
    return await vehicleRepo.find({ where: { vendor_id } })
}

export const updateVehicle = async (id: number, vendor_id: number, data: UpdateVehicleInput) => {
    const vehicle = await vehicleRepo.findOne({ where: { id, vendor_id } })
    if (!vehicle) throw new Error('Vehicle not found or unauthorized')

    Object.assign(vehicle, data)
    return await vehicleRepo.save(vehicle)
}

export const deleteVehicle = async (id: number, vendor_id: number) => {
    const vehicle = await vehicleRepo.findOne({ where: { id, vendor_id } })
    if (!vehicle) throw new Error('Vehicle not found or unauthorized')

    await vehicleRepo.remove(vehicle)
}

export const verifyVehicle = async (id: number, approved_by: number) => {
    const vehicle = await vehicleRepo.findOne({ where: { id } })
    if (!vehicle) throw new Error('Vehicle not found')

    vehicle.is_verified = true
    vehicle.status = VehicleStatus.available
    return await vehicleRepo.save(vehicle)
}