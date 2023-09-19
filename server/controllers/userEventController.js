import userEvent from '../models/userEvent.js'

export const getAllUserEvents = async (req, res) => {
    try {
        const userEvents = await userEvent.find()
        res.json(userEvents)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createUserEvent = async (req, res) => {
    try {
        const newUserEvent = new userEvent(req.body)
        const savedUserEvent = await newUserEvent.save()
        res.status(201).json(savedUserEvent)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getUserEvent = async (req, res) => {
    try {
        const userEvent = await userEvent.findById(req.params.id)
        res.json(userEvent)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateUserEvent = async (req, res) => {
    try {
        const userEvent = await userEvent.findById(req.params.id)

        if (!userEvent) {
            return res.status(404).json({ message: 'UserEvent not found' })
        }

        Object.assign(userEvent, req.body)
        const updatedUserEvent = await userEvent.save()

        res.status(200).json(updatedUserEvent)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteAllUserEvents = async (req, res) => {
    try {
        await userEvent.deleteMany({})
        res.status(200).json({ message: 'All user events have been deleted.' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
