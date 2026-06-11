import { Router } from 'express'
import { register, login, logout,deleteUser,getMeController } from './user.controller'
import { authMiddleware } from '../../middleware/auth.middleware'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout',authMiddleware, logout)
router.delete('/:id',authMiddleware, deleteUser)
router.get('/me',authMiddleware, getMeController)
export default router