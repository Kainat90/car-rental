import { Router } from 'express'
import { register, login, logout,deleteUser } from './user.controller'


const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.delete('/:id',deleteUser)
export default router