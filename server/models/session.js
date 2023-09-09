import mongoose from 'mongoose'

const SessionSchema = new mongoose.Schema({
    date: String,
    startTime: String,
    endTime: String
})

export default mongoose.model('Session', SessionSchema)
export { SessionSchema }

