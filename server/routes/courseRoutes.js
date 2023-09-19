import express from 'express'
import { getAllCourses, createCourse, getCourse, updateCourse, updateToEnrolled, updateToUnenrolled, deleteAllCourses } from '../controllers/courseController.js'

const router = express.Router()

router.get('/', getAllCourses)
router.post('/', createCourse)
router.put('/:id/enroll', updateToEnrolled)
router.put('/:id/unenroll', updateToUnenrolled)
router.get('/:id', getCourse)
router.put('/:id', updateCourse)
router.delete('/', deleteAllCourses)

export default router
