import React from 'react'
import { Box, Text } from '@radix-ui/themes'
import { ICourse } from '../../types/ICourse'
import './CourseCard.css'

// checking if student is already enrolled - default false
const CourseCard: React.FC<{
    course: ICourse
    isEnrolled?: boolean
    onRegister?: () => void
}> = ({ course, isEnrolled, onRegister }) => {
    return (
        <Box className='course-card'>
            <Box className='course-card-content'>
                <Text as='div' className='course-card-title'>
                    {course.title}
                </Text>

                <Box className='course-card-level-type'>
                    <Text as='p' className='course-card-programType'>
                        {course.extendedProps.programType}
                    </Text>
                    <Text as='span' className='course-card-level'>
                        Level {course.extendedProps.level}
                    </Text>
                </Box>

                <Text as='span' className='course-card-time'>
                    {course.extendedProps.location}
                </Text>

                <Text as='span' className='course-card-time'>
                    {`${course.extendedProps.duration}`}
                </Text>

                <Text as='p' className='course-card-teacher'>
                    with {course.extendedProps.teacher}
                </Text>

                <Text as='p' className='course-card-description'>
                    {course.extendedProps.description}
                </Text>

                <Box className='action-area'>
                    {/* check if student is already enrolled */}
                    {isEnrolled ? (
                        <span className='action-label enrolled-label'>
                            Enrolled
                        </span>
                    ) : (
                        <button
                            className='action-label secondary-btn register-btn'
                            onClick={onRegister}
                        >
                            More Info
                        </button>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default CourseCard
