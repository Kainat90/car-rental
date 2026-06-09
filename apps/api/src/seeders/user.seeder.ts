import 'reflect-metadata'
import { AppDataSource } from '../config/database'
import { User, UserType, RegistrationType, Status } from '../modules/user/entity/user.entity'
import bcrypt from 'bcrypt'

const seedUsers = async () => {
    // initialize database connection
    await AppDataSource.initialize()
    
    const userRepository = AppDataSource.getRepository(User)

    // clear existing users
    await userRepository.clear()

    // hash password for all users
    const password_hash = await bcrypt.hash('password123', 10)

    // create users
    const users = userRepository.create([
        {
            user_type: UserType.superadmin,
            email: 'admin@carrental.com',
            password_hash,
            cnic: '11111-1111111-1',
            registration_type: RegistrationType.online,
            status: Status.active
        },
        {
            user_type: UserType.vendor,
            email: 'vendor1@carrental.com',
            password_hash,
            cnic: '22222-2222222-2',
            business_name: 'Fast Cars Rental',
            registration_type: RegistrationType.online,
            status: Status.active
        },
        {
            user_type: UserType.vendor,
            email: 'vendor2@carrental.com',
            password_hash,
            cnic: '33333-3333333-3',
            business_name: 'City Drive Rentals',
            registration_type: RegistrationType.walk_in,
            status: Status.active
        },
        {
            user_type: UserType.customer,
            email: 'customer1@carrental.com',
            password_hash,
            cnic: '44444-4444444-4',
            registration_type: RegistrationType.online,
            status: Status.active
        },
        {
            user_type: UserType.customer,
            email: 'customer2@carrental.com',
            password_hash,
            cnic: '55555-5555555-5',
            registration_type: RegistrationType.online,
            status: Status.active
        },
        {
            user_type: UserType.customer,
            email: 'customer3@carrental.com',
            password_hash,
            cnic: '66666-6666666-6',
            registration_type: RegistrationType.walk_in,
            status: Status.active
        }
    ])

    // save to database
    await userRepository.save(users)

    console.log('✅ Users seeded successfully!')
    console.log('📧 All users password: password123')

    // close connection
    await AppDataSource.destroy()
}

// run seeder
seedUsers().catch((error) => {
    console.log('❌ Seeding failed:', error)
    process.exit(1)
})