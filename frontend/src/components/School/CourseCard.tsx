import React from 'react'
import { Box, Text } from '@radix-ui/themes'
import { ICourse } from '../../types/ICourse'
import { CheckIcon } from '@radix-ui/react-icons'
import './CourseCard.css'

// checking if student is already enrolled - default false
const CourseCard: React.FC<{
    course: ICourse
    isEnrolled?: boolean
    onCourseCardClick?: () => void
}> = ({ course, isEnrolled, onCourseCardClick }) => {
    const startDate = new Date(course.start)
    const formattedDate = `${startDate.getDate()}/${startDate.getMonth() + 1}`

    return (
        <Box className='course-card' onClick={onCourseCardClick}>
            <Box className='course-card-content'>
                <Text as='div' className='course-card-title'>
                    {course.title}
                </Text>

                <Box className='course-card-level-type'>
                    <Text as='p' className='course-card-programType'>
                        {course.extendedProps.programType}
                    </Text>
                    <Text as='span' className='course-card-level'>
                        Level: {course.extendedProps.level}
                    </Text>
                </Box>

                <Text as='span' className='course-card-location'>
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

                <Text as='p' className='course-card-description'>
                    Begins {formattedDate}
                </Text>

                <Box className='action-area'>
                    {isEnrolled ? (
                        <span className='action-label enrolled-label'>
                            <CheckIcon /> Enrolled 
                        </span>
                    ) : (
                        <button className='action-label secondary-btn register-btn'>
                            More Info
                        </button>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default CourseCard
