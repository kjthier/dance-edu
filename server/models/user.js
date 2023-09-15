import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
})

// Hash the password before saving the user model
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSalt(10)
        this.password = bcrypt.hash(this.password, salt)
    }
    next()
})

export default mongoose.model('User', userSchema)