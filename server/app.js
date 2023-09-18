import 'dotenv/config'
import express from 'express'
import courseRoutes from './routes/courseRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userEventRoutes from './routes/userEventRoutes.js'
import cors from 'cors'
import dbConnect from './dbConnect.js'

const app = express()
app.use(express.json())
app.use(cors())
dbConnect()

app.get('/', (req, res) => {
    res.send('dance-edu')
})

app.use('/courses', courseRoutes)
app.use('/api/auth', authRoutes)
app.use('/userEvents', userEventRoutes)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`)
})