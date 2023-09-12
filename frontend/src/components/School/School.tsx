import React, { useState, useEffect } from 'react'
import { Box } from '@radix-ui/themes'
import { ICourse } from '../../types/ICourse'
import CourseCard from './CourseCard'
import './school.css'

type CoursesDisplayedProps = {
  userId: string
}

const CoursesDisplayed: React.FC<CoursesDisplayedProps> = () => {

  // Initialize state with empty array
  const [courses, setCourses] = useState<ICourse[]>([])

  useEffect(() => {
    // Fetch data from API when component mounts
    fetch('https://dance-edu.onrender.com/courses')
        .then(response => response.json())
        .then(data => setCourses(data))
        .catch(error => console.log('Error fetching courses:', error))
  }, [])

  // Derive enrolled and available courses
  const enrolledCourses = courses.filter(course => course.extendedProps.isEnrolled)
  const availableCourses = courses.filter(course => !course.extendedProps.isEnrolled)

  const handleRegister = (courseId: string) => {
    setCourses(prevCourses =>
      prevCourses.map(course => 
        (course.id === courseId 
          ? { ...course, isEnrolled: true } 
          : course))
    )
  }

  return (
    <>
      {/* Enrolled courses */}
      <Box className="enrolled-courses">
          <h2 className="myStudio-heading">
            My Studio
          </h2>
          <Box className="course-grid">
          {enrolledCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course}
                isEnrolled={course.extendedProps.isEnrolled}
              />
          ))}
          </Box>
      </Box>
        
        {/* Available Live Courses: Courses */}
      <Box className="available-courses">
        <h2 className="course-section-heading">
          Live Studio
        </h2>
        <h3 className="course-section">Courses</h3>
        <Box className="course-grid">
          {availableCourses
            .filter((course) => course.extendedProps.programType === 'Course' && course.extendedProps.studioType === 'Live')
            .map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onRegister={() => handleRegister(course.id)}
              />
            ))}
        </Box>
      </Box>

      {/* Available Live Courses: Classes */}
      <Box className="available-courses">
        <h3 className="course-section">Classes</h3>
        <Box className="course-grid">
          {availableCourses
            .filter((course) => course.extendedProps.programType === 'Class' && course.extendedProps.studioType === 'Live')
            .map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onRegister={() => handleRegister(course.id)}
              />
            ))}
        </Box>
      </Box>

      {/* Available Live Courses: Workshops */}
      <Box className="available-courses">
        <h3 className="course-section">Workshops</h3>
        <Box className="course-grid">
          {availableCourses
            .filter((course) => course.extendedProps.programType === 'Workshop' && course.extendedProps.studioType === 'Live')
            .map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onRegister={() => handleRegister(course.id)}
              />
            ))}
        </Box>
      </Box>

      {/* Available Events */}
      <Box className="available-courses">
        <h2 className="course-section-heading">
          Events
        </h2>
        <Box className="course-grid">
          {availableCourses
            .filter((course) => course.extendedProps.programType === 'Event')
            .map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onRegister={() => handleRegister(course.id)}
              />
            ))}
        </Box>
      </Box>

      {/* Available Virtual Courses */}
      <h2 className="course-section-heading">
          Virtual Studio
      </h2>
      <Box className="available-courses">
        <Box className="course-grid">
          {availableCourses
            .filter((course) => course.extendedProps.studioType === 'Virtual' && course.extendedProps.programType !== 'Event')
            .map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onRegister={() => handleRegister(course.id)}
              />
            ))}
        </Box>
      </Box>
    </>
  )
}

export default CoursesDisplayed

// button with a popup form to request a private session
// add filter function
// add search function




