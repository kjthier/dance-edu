import React, { useState, useEffect } from 'react'
import { Box } from '@radix-ui/themes'
import { ICourse } from '../../types/ICourse'
import CourseCard from './CourseCard'
import EventRegisterModal from '../Schedule/EventRegisterModal'
import EventUnenrollModal from '../reusable/EventUnenrollModal'
import './School.css'

type CoursesDisplayedProps = {
    courseId: string
}

const useFetchCourses = () => {
    const [courses, setCourses] = useState<ICourse[]>([])

    useEffect(() => {
        fetch('https://dance-edu.onrender.com/courses')
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.log('Error fetching courses:', error))
    }, [])

    return { courses, setCourses }
}

const CoursesDisplayed: React.FC<CoursesDisplayedProps> = () => {
    const { courses, setCourses } = useFetchCourses()
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isUnenrollModalOpen, setIsUnenrollModalOpen] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null)

    const handleMoreInfoClick = (course: ICourse) => {
        setSelectedCourse(course)
        if (course.extendedProps.isEnrolled) {
            setIsUnenrollModalOpen(true)
        } else {
            setIsRegisterModalOpen(true)
        }
    }

    const addToSchedule = () => {
        if (!selectedCourse) return

        const updatedCourses = courses.map((course) =>
            course._id === selectedCourse._id
                ? {
                      ...course,
                      extendedProps: {
                          ...course.extendedProps,
                          isEnrolled: true,
                      },
                  }
                : course
        )

        setCourses(updatedCourses)

        fetch(
            `https://dance-edu.onrender.com/courses/${selectedCourse._id}/enroll`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isEnrolled: true }),
            }
        )
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok')
                return response.json()
            })
            .then((data) => {
                console.log('Course updated successfully:', data)
            })
            .catch((error) => {
                console.error('Fetch error:', error)
            })

        setIsRegisterModalOpen(false)
    }

    const removeFromSchedule = () => {
        if (!selectedCourse) return

        const updatedCourses = courses.map((course) =>
            course._id === selectedCourse._id
                ? {
                      ...course,
                      extendedProps: {
                          ...course.extendedProps,
                          isEnrolled: false,
                      },
                  }
                : course
        )

        setCourses(updatedCourses)

        fetch(
            `https://dance-edu.onrender.com/courses/${selectedCourse._id}/unenroll`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isEnrolled: false }),
            }
        )
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok')
                return response.json()
            })
            .then((data) => {
                console.log('Course unenrolled successfully:', data)
            })
            .catch((error) => {
                console.error('Fetch error:', error)
            })

        setIsUnenrollModalOpen(false)
    }

    const renderEnrolled = (filterFunc: (course: ICourse) => boolean) =>  (
        courses
        ? courses
            .filter(filterFunc)
            .map((course) => (
                <CourseCard
                    key={course._id}
                    course={course}
                    onMoreInfoClick={() => handleMoreInfoClick(course)}
                />
            ))
        : null
    )
    
       

    const renderCourseSection = (
        title: string,
        filterFunc: (course: ICourse) => boolean
    ) => (
        <Box className='available-courses'>
            <h3 className='course-section'>{title}</h3>
            <Box className='course-grid'>{renderEnrolled(filterFunc)}</Box>
        </Box>
    )

    return (
        <>
            <Box className='enrolled-courses'>
                <h2 className='myStudio-heading'>My Studio</h2>
                {/* using !! to convert a truthy/falsy value to a boolean so it is not undefined */}
                <Box className='course-grid'>
                    {renderEnrolled(
                        (course) => !!course.extendedProps.isEnrolled
                    )}
                </Box>
            </Box>

            <Box className='available-courses'>
                <h2 className='course-section-heading'>Live Studio</h2>
                <h3 className='course-section'>Courses</h3>
                <Box className='course-grid'>
                    {renderEnrolled(
                        (course) =>
                            !course.extendedProps.isEnrolled &&
                            course.extendedProps.programType === 'Course' &&
                            course.extendedProps.studioType === 'Live'
                    )}
                </Box>
            </Box>

            {renderCourseSection(
                'Classes',
                (course) =>
                    !course.extendedProps.isEnrolled &&
                    course.extendedProps.programType === 'Class' &&
                    course.extendedProps.studioType === 'Live'
            )}

            {renderCourseSection(
                'Workshops',
                (course) =>
                    !course.extendedProps.isEnrolled &&
                    course.extendedProps.programType === 'Workshop' &&
                    course.extendedProps.studioType === 'Live'
            )}

            {renderCourseSection(
                'Events',
                (course) =>
                    !course.extendedProps.isEnrolled &&
                    course.extendedProps.programType === 'Event'
            )}

            <h2 className='course-section-heading'>Virtual Studio</h2>
            {renderCourseSection(
                'Virtual Courses',
                (course) =>
                    !course.extendedProps.isEnrolled &&
                    course.extendedProps.studioType === 'Virtual' &&
                    course.extendedProps.programType !== 'Event'
            )}

            {selectedCourse && (
                <>
                    {selectedCourse.extendedProps.isEnrolled ? (
                        <EventUnenrollModal
                            event={selectedCourse}
                            isOpen={isUnenrollModalOpen}
                            onClose={() => setIsUnenrollModalOpen(false)}
                            onRemoveFromSchedule={removeFromSchedule}
                        />
                    ) : (
                        <EventRegisterModal
                            event={selectedCourse}
                            isOpen={isRegisterModalOpen}
                            onClose={() => setIsRegisterModalOpen(false)}
                            onAddToSchedule={addToSchedule}
                        />
                    )}
                </>
            )}
        </>
    )
}

export default CoursesDisplayed
