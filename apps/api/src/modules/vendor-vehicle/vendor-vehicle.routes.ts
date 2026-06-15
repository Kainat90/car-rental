import { Router } from 'express'
import * as VehicleController from './vendor-vehicle.controller'
import { authMiddleware, requireRole } from '../../middleware/auth.middleware'
import { UserType } from '../user/entity/user.entity'

const router = Router()

// Public — anyone can browse verified vehicles
router.get('/', VehicleController.getAllVehicles)
router.get('/:id', VehicleController.getVehicleById)

// Vendor only
router.post('/', authMiddleware, requireRole(UserType.vendor), VehicleController.createVehicle)
router.get('/my/listings', authMiddleware, requireRole(UserType.vendor), VehicleController.getVendorVehicles)
router.patch('/:id', authMiddleware, requireRole(UserType.vendor), VehicleController.updateVehicle)
router.delete('/:id', authMiddleware, requireRole(UserType.vendor), VehicleController.deleteVehicle)

// Superadmin only
router.patch('/:id/verify', authMiddleware, requireRole(UserType.superadmin), VehicleController.verifyVehicle)

export default router