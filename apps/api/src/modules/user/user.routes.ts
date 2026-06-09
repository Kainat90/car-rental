import { Router } from 'express'
import { register, login, logout,deleteUser } from './user.controller'
import { authMiddleware } from '../../middleware/auth.middleware'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout',authMiddleware, logout)
router.delete('/:id',authMiddleware, deleteUser)

export default router