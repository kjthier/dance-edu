import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body

        // Check if user already exists (email and username should be unique)
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        })
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
        }) // create new user

        await newUser.save() // save the user

        // Create JWT token
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'Internal server error' })
        }
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
        console.log('New user registered:', newUser)

        res.status(201).json({ userId: newUser._id, token }) // user created successfully
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'User already exists' })
        }
        console.error('An error occurred:', error)
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
