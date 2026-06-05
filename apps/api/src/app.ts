import express from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Create Express app instance
const app = express()

// Middleware
app.use(cors())         // allow frontend requests
app.use(helmet())       // add security headers
app.use(express.json()) // parse JSON request body

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'Car rental API is running' })
})

export default app