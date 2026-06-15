import { VehicleType, VehicleStatus, TransmissionType, FuelType } from './entity/vendor_vehicle.entity'

export interface CreateVehicleInput {
    make: string
    model: string
    year: number
    type: VehicleType
    plate_number: string
    price_per_day: number
    city: string
    color?: string
    transmission?: TransmissionType
    fuel_type?: FuelType
    seats?: number
    mileage?: number
    description?: string
    images?: string[]
}

export interface UpdateVehicleInput {
    make?: string
    model?: string
    year?: number
    type?: VehicleType
    plate_number?: string
    status?: VehicleStatus
    price_per_day?: number
    city?: string
    color?: string
    transmission?: TransmissionType
    fuel_type?: FuelType
    seats?: number
    mileage?: number
    description?: string
    images?: string[]
}