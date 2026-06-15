import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export enum VehicleType {
    sedan = 'sedan',
    suv = 'suv',
    truck = 'truck',
    hatchback = 'hatchback'
}

export enum VehicleStatus {
    available = 'available',
    unavailable = 'unavailable'
}

export enum TransmissionType {
    automatic = 'automatic',
    manual = 'manual'
}

export enum FuelType {
    petrol = 'petrol',
    diesel = 'diesel',
    electric = 'electric',
    hybrid = 'hybrid'
}

@Entity('vendor_vehicles')
export class VendorVehicle {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    vendor_id!: number

    @Column()
    make!: string

    @Column()
    model!: string

    @Column()
    year!: number

    @Column({ type: 'enum', enum: VehicleType })
    type!: VehicleType

    @Column({ unique: true })
    plate_number!: string

    @Column({ type: 'enum', enum: VehicleStatus, default: VehicleStatus.unavailable })
    status!: VehicleStatus

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price_per_day!: number

    @Column()
    city!: string

    @Column({ nullable: true })
    color!: string

    @Column({ type: 'enum', enum: TransmissionType, nullable: true })
    transmission!: TransmissionType

    @Column({ type: 'enum', enum: FuelType, nullable: true })
    fuel_type!: FuelType

    @Column({ nullable: true })
    seats!: number

    @Column({ nullable: true })
    mileage!: number

    @Column({ nullable: true, type: 'text' })
    description!: string

    @Column({ type: 'json', nullable: true })
    images!: string[]

    @Column({ default: false })
    is_verified!: boolean

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
}