import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt' 

export const registerUser = async (req, res) => {
    // Destructure request body to get username, email, and password
    const { username, email, password } = req.body
    try {
        const user = new User ({ username, email, password }) // create new user 
        await user.save() // save the user
        res.status(201).json(user) // user created successfully
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email }) // find user by email
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        // use bcrypt to check provided password with the stored hashed password
        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET) // create a new JWT with user's ID
            return res.json({ userId: user._id, token }) // res with user object and new token
        } else {
            return res.status(400).json({ message: 'Incorrect password' })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getUserById = async (req, res) => {
    console.log("Get User by ID called")
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        res.status(200).json({ firstName: user.firstName })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}