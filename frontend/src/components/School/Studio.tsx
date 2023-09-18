import React, { useState, useEffect } from 'react'
import { Box } from '@radix-ui/themes'
import { ICourse } from '../../types/ICourse'
import CourseCard from './CourseCard'
import EventRegisterModal from '../Schedule/EventRegisterModal'
import EventUnenrollModal from '../reusable/EventUnenrollModal'
import { CaretRightIcon } from '@radix-ui/react-icons'
import './Studio.css'

// fetch all courses from server
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

const CoursesDisplayed: React.FC = () => {
    const { courses, setCourses } = useFetchCourses()
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isUnenrollModalOpen, setIsUnenrollModalOpen] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null)

    // When course card is clicked, open a modal
    const handleCourseCardClick = (course: ICourse) => {
        setSelectedCourse(course)
        if (course.extendedProps.isEnrolled) {
            setIsUnenrollModalOpen(true)
        } else {
            setIsRegisterModalOpen(true)
        }
    }

    // Render enrolled courses
    const renderEnrolled = (filterFunc: (course: ICourse) => boolean) =>
        courses
            ? courses
                  .filter(filterFunc)
                  .map((course) => (
                      <CourseCard
                          key={course._id}
                          course={course}
                          isEnrolled={!!course.extendedProps.isEnrolled}
                          onCourseCardClick={() =>
                              handleCourseCardClick(course)
                          }
                      />
                  ))
            : null

    // Render all other courses (not enrolled in)
    const renderCourseSection = (
        title: string,
        filterFunc: (course: ICourse) => boolean
    ) => (
        <Box className='available-courses'>
            <h3 className='course-section'>
                {title} <CaretRightIcon />
            </h3>
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
            </Box>

            {renderCourseSection(
                'Courses',
                (course) =>
                    !course.extendedProps.isEnrolled &&
                    course.extendedProps.programType === 'Course' &&
                    course.extendedProps.studioType === 'Live'
            )}

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

            {/* based on whether the user is enrolled in the course or not, display the appropriate modal - if enrolled, unenroll modal opens / if unenrolled, register modal opens */}
            {selectedCourse && (
                <>
                    {(isRegisterModalOpen || isUnenrollModalOpen) && (
                        <div className='backdrop'></div>
                    )}
                    {selectedCourse && (
                        <>
                            {isRegisterModalOpen && (
                                <EventRegisterModal
                                    event={selectedCourse}
                                    isOpen={isRegisterModalOpen}
                                    onClose={() =>
                                        setIsRegisterModalOpen(false)
                                    }
                                    setCourses={setCourses}
                                />
                            )}
                            {isUnenrollModalOpen && (
                                <EventUnenrollModal
                                    event={selectedCourse}
                                    isOpen={isUnenrollModalOpen}
                                    onClose={() =>
                                        setIsUnenrollModalOpen(false)
                                    }
                                    setCourses={setCourses}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default CoursesDisplayed
