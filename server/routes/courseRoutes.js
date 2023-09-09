import express from 'express'
import { getAllCourses, createCourse, getCourse, updateCourse } from '../controllers/courseController.js'

const router = express.Router()

router.get('/', getAllCourses)
router.post('/', createCourse)
router.get('/:id', getCourse)
router.put('/:id', updateCourse)




export default router
