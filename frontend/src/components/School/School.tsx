import React, { useState, useEffect } from 'react'
import { Box } from '@radix-ui/themes'
import { ICourse } from '../../types/ICourse'
import CourseCard from './CourseCard'
import EventRegisterModal from '../Schedule/EventRegisterModal'
import './School.css'

type CoursesDisplayedProps = {
    _id: string
    // userId: string
}

const CoursesDisplayed: React.FC<CoursesDisplayedProps> = () => {
    const [courses, setCourses] = useState<ICourse[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null)

    useEffect(() => {
        fetch('https://dance-edu.onrender.com/courses')
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.log('Error fetching courses:', error))
    }, [])

    // Derive enrolled and available courses
    const enrolledCourses = courses.filter(
        (course) => course.extendedProps.isEnrolled
    )
    const availableCourses = courses.filter(
        (course) => !course.extendedProps.isEnrolled
    )

    const handleMoreInfoClick = (course: ICourse) => {
        console.log("Setting selected course:", course)

        setSelectedCourse(course)
        setIsModalOpen(true)
    }

    const addToSchedule = () => {
        console.log("Selected course inside addToSchedule:", selectedCourse)

        if (selectedCourse) {
            const index = courses.findIndex(
                (course) => course._id === selectedCourse._id
            )
            const newCourses = [...courses]
            newCourses[index].extendedProps.isEnrolled = true

            // Update the courses state locally
            setCourses(newCourses)

            console.log(`Fetch URL: https://dance-edu.onrender.com/courses/${selectedCourse?._id}/enroll`)

            fetch(
                `https://dance-edu.onrender.com/courses/${selectedCourse._id}/enroll`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ isEnrolled: true })
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.json()
                })
                .then((data) => {
                    console.log('Course updated successfully:', data)
                })
                .catch((error) => {
                    console.error('Fetch error:', error)
                })

            setIsModalOpen(false)
        }
    }

    return ( 
        <>
            {/* Enrolled courses */}
            <Box className='enrolled-courses'>
                <h2 className='myStudio-heading'>My Studio</h2>
                <Box className='course-grid'>
                    {enrolledCourses.map((course) => (
                        <CourseCard
                            key={course._id}
                            course={course}
                            isEnrolled={course.extendedProps.isEnrolled}
                            onMoreInfoClick={() => handleMoreInfoClick(course)}

                        />
                    ))}
                </Box>
            </Box>

            {/* Available Live Courses: Courses */}
            <Box className='available-courses'>
                <h2 className='course-section-heading'>Live Studio</h2>
                <h3 className='course-section'>Courses</h3>
                <Box className='course-grid'>
                    {availableCourses
                        .filter(
                            (course) =>
                                course.extendedProps.programType === 'Course' &&
                                course.extendedProps.studioType === 'Live'
                        )
                        .map((course) => (
                            <CourseCard
                                key={course._id}
                                course={course}
                                onMoreInfoClick={() => handleMoreInfoClick(course)}
                            />
                        ))}
                </Box>
            </Box>

            {/* Available Live Courses: Classes */}
            <Box className='available-courses'>
                <h3 className='course-section'>Classes</h3>
                <Box className='course-grid'>
                    {availableCourses
                        .filter(
                            (course) =>
                                course.extendedProps.programType === 'Class' &&
                                course.extendedProps.studioType === 'Live'
                        )
                        .map((course) => (
                            <CourseCard
                                key={course._id}
                                course={course}
                                onMoreInfoClick={() => handleMoreInfoClick(course)}

                                // onRegister={() => handleRegister(course.id)}
                            />
                        ))}
                </Box>
            </Box>

            {/* Available Live Courses: Workshops */}
            <Box className='available-courses'>
                <h3 className='course-section'>Workshops</h3>
                <Box className='course-grid'>
                    {availableCourses
                        .filter(
                            (course) =>
                                course.extendedProps.programType ===
                                    'Workshop' &&
                                course.extendedProps.studioType === 'Live'
                        )
                        .map((course) => (
                            <CourseCard
                                key={course._id}
                                course={course}
                                onMoreInfoClick={() => handleMoreInfoClick(course)}
                            />
                        ))}
                </Box>
            </Box>

            {/* Available Events */}
            <Box className='available-courses'>
                <h2 className='course-section-heading'>Events</h2>
                <Box className='course-grid'>
                    {availableCourses
                        .filter(
                            (course) =>
                                course.extendedProps.programType === 'Event'
                        )
                        .map((course) => (
                            <CourseCard
                                key={course._id}
                                course={course}
                                onMoreInfoClick={() => handleMoreInfoClick(course)}
                            />
                        ))}
                </Box>
            </Box>

            {/* Available Virtual Courses */}
            <h2 className='course-section-heading'>Virtual Studio</h2>
            <Box className='available-courses'>
                <Box className='course-grid'>
                    {availableCourses
                        .filter(
                            (course) =>
                                course.extendedProps.studioType === 'Virtual' &&
                                course.extendedProps.programType !== 'Event'
                        )
                        .map((course) => (
                            <CourseCard
                                key={course._id}
                                course={course}
                                onMoreInfoClick={() => handleMoreInfoClick(course)}
                            />
                        ))}
                </Box>

                {selectedCourse && (
                    <EventRegisterModal
                        event={selectedCourse}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onAddToSchedule={addToSchedule}
                    />
                )}
            </Box>
        </>
    )
}

export default CoursesDisplayed