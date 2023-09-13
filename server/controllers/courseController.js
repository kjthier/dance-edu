import Course from '../models/course.js'

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        res.json(courses)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createCourse = async (req, res) => {
    try {
        const newCourse = new Course(req.body)
        const savedCourse = await newCourse.save()
        res.status(201).json(savedCourse)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        res.json(course)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)

        if (!course) {
            return res.status(404).json({ message: 'Course not found' })
        }

        Object.assign(course, req.body)
        const updatedCourse = await course.save()

        res.status(200).json(updatedCourse)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateToEnrolled = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)

        if (!course) {
            return res.status(404).json({ message: 'Course not found' })
        }

        // Explicitly set the isEnrolled property to true
        course.extendedProps.isEnrolled = true;

        const updatedCourse = await course.save()

        res.status(200).json(updatedCourse)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}




