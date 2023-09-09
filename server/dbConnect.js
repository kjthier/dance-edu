import mongoose from 'mongoose'

const dbConnect = () => {
    const dbUri = process.env.MONGODB_URI
    mongoose.connect(dbUri)
    .then(() => {
            console.log('Database connected')
    })
    .catch(error => {
        console.error('Error connecting to the database:', error)
    })
}

export default dbConnect
