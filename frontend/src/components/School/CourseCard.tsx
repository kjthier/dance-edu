import React from 'react'
import { Box, Text } from '@radix-ui/themes'
import { ICourse } from '../../types/ICourse'
import PlaceholderImg from '../../assets/course-card-img.jpg'
import './courseCard.css'

// checking if student is already enrolled - default false
const CourseCard: React.FC<{ course: ICourse; isEnrolled?: boolean; onRegister?: () => void }> = ({ course, isEnrolled, onRegister }) => {

    const cardStyle = {
        // backgroundImage: `url(${course.image})`,
        backgroundImage: `url(${PlaceholderImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    
      return (
        <Box className="course-card" style={cardStyle}> 
          <Box className="course-card-content">

            <Text as="div" className="course-card-title">
                {course.title}
            </Text>

            <Box className="course-card-level-type">
              <Text as="p" className="course-card-programType">
                {course.extendedProps.programType}
              </Text>
              <Text as="span" className="course-card-level">
                Level {course.extendedProps.level}
              </Text>
            </Box>
            
            <Text as="span" className="course-card-time">
                {course.extendedProps.location}
            </Text>

            <Text as="span" className="course-card-time">
                {`${course.extendedProps.duration}`}
            </Text>

            <Text as="p" className="course-card-teacher"> 
                with {course.extendedProps.teacher}
            </Text>

            <Text as="p" className="course-card-description">
                {course.extendedProps.description}
            </Text>
            
            <Box className="action-area">
              {/* check if student is already enrolled */}
              {isEnrolled ? (
                  <span className="action-label enrolled-label">Enrolled</span>
                ) : (
                  <button onClick={onRegister} className="action-label register-btn">Register</button>
              )}
            </Box>
            
          </Box>
        </Box>
      )
    }

export default CourseCard