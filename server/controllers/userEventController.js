import UserEvent from '../models/userEvent.js'

export const getAllUserEvents = async (req, res) => {
    try {
        const userEvents = await UserEvent.find()
        res.json(userEvents)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createUserEvent = async (req, res) => {
    try {
        const newUserEvent = new UserEvent(req.body)
        const savedUserEvent = await newUserEvent.save()
        res.status(201).json(savedUserEvent)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getUserEvent = async (req, res) => {
    try {
        const foundUserEvent = await UserEvent.findById(req.params.id)
        res.json(foundUserEvent)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateUserEvent = async (req, res) => {
    try {
        const foundUserEvent = await UserEvent.findById(req.params.id)

        if (!foundUserEvent) {
            return res.status(404).json({ message: 'UserEvent not found' })
        }

        Object.assign(foundUserEvent, req.body)
        const updatedUserEvent = await foundUserEvent.save()
        res.status(200).json(updatedUserEvent)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteAllUserEvents = async (req, res) => {
    try {
        await UserEvent.deleteMany({})
        res.status(200).json({ message: 'All user events have been deleted.' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteUserEvent = async (req, res) => {
    try {
        const foundUserEvent = await UserEvent.findById(req.params.id)
        if (!foundUserEvent) {
            return res.status(404).json({ message: 'UserEvent not found' })
        }
        await foundUserEvent.remove()
        res.status(200).json({ message: 'UserEvent has been deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
