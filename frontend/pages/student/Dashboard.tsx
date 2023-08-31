import React from 'react'
import '.../index.css'

const Dashboard: React.FC = () => {
  return (
    <h1>Hello world</h1>
    // <div className="dashboard">
    //   <ScheduleOverview />
    //   <EnrolledCourses />
    //   <ProgressGoals />
    //   <Level />
    // </div>
  );
};

export default Dashboard

// import { useState, useEffect } from 'react'
// import { Course } from '/types/Course'

// const EnrolledCourses: React.FC = () => {
//     const [courses, setCourses] = useState<Course[]>([])

//     // fetch all enrolled courses 
//     useEffect(() => {
//         fetch('/api/courses/enrolled')
//             .then(res => res.json())
//             .then(data => setCourses(data))
//             .catch(err => console.error('Error fetching enrolled courses:', err))
//     }, [])
    

//     // display them in a list
//     return (
//         <div className="enrolled-courses">
//             <h2>Enrolled Courses</h2>
//             <ul>
//                 {courses.map(course => (
//                     <li key={course.id}>{course.title}</li>
//                 ))}
//             </ul>
//         </div>
//     )
            
// }

// export default EnrolledCourses
