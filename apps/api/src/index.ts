import express from 'express'
import { Request,Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

//Load environment variables from .env file

dotenv.config()

//Create Express app instance - starting app
const app = express()
const PORT = process.env.PORT || 3000

//Midlleware 

app.use(cors()) //allow frontend requets
app.use(helmet())//ad security headers
app.use(express.json())// parse JSON request body 

//Health check endpoint- to verify API is running

app.get('/health',(req:Request,res:Response)=> {
    res.json({status: 'OK',message:'Car rental API is running'})

})

//Start the server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}).on('error', (err) => {
  console.log('Server error:', err)
})