import app from './app'
import dotenv from 'dotenv'
import 'reflect-metadata'
import { AppDataSource } from './config/database'

dotenv.config()

const PORT = process.env.PORT || 3000

AppDataSource.initialize().then(() =>{

    console.log('Database connected successfully')
    app.listen(PORT, ()=>{
        console.log('Server running on port ${PORT}')
    })
})
.catch((error) => {
    console.log('Database connection failed:', error)
})
