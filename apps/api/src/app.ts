import express from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import userRoutes from './modules/user/user.routes'
import vehicleRoutes from './modules/vendor-vehicle/vendor-vehicle.routes'
import documentRouter from './documents/document.router'

dotenv.config()

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/vehicles', vehicleRoutes)
app.use('/api/documents', documentRouter)
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'Car rental API is running' })
})

export default app