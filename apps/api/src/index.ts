import app from './app'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}).on('error', (err) => {
    console.log('Server error:', err)
})