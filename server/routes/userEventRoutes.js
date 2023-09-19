import express from 'express'
import { getAllUserEvents, createUserEvent, getUserEvent, updateUserEvent, deleteAllUserEvents } from '../controllers/userEventController.js'

const router = express.Router()

router.get('/', getAllUserEvents)
router.post('/', createUserEvent)
router.get('/:id', getUserEvent)
router.put('/:id', updateUserEvent)
router.delete('/', deleteAllUserEvents)

export default router