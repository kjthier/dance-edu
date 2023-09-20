import express from 'express'
import {
    getAllUserEvents,
    createUserEvent,
    getUserEvent,
    updateUserEvent,
    deleteAllUserEvents,
    deleteUserEvent,
} from '../controllers/userEventController.js'

const router = express.Router()

router.get('/', getAllUserEvents)
router.post('/', createUserEvent)
router.delete('/', deleteAllUserEvents)

router.get('/:id', getUserEvent)
router.put('/:id', updateUserEvent)
router.delete('/:id', deleteUserEvent)

export default router
