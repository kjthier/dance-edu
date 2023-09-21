import React, { useEffect, useState } from 'react'
import { ICourse } from '../../types/ICourse'
import { CaretRightIcon } from '@radix-ui/react-icons'


const CompletedCourses: React.FC = () => {
    const [allCourses, setAllCourses] = useState<ICourse[]>([])

    useEffect(() => {
        fetch('https://dance-edu.onrender.com/courses')
            .then((response) => response.json())
            .then((data) => setAllCourses(data))
            .catch((error) => console.error('Error fetching courses:', error))
    }, [])

    // Filter out the completed courses where end date is in the past
    const completedCourses = allCourses.filter(
        (course) =>
            new Date(course.start) < new Date() &&
            course.extendedProps.isEnrolled
    )

    // Sort by most recent
    completedCourses.sort((a, b) => +new Date(b.start) - +new Date(a.start))

    // Limit to the most recent 5
    const recentCompletedCourses = completedCourses.slice(0, 5)

    return (
        <div className='list-category'>
            <h3 className='dash-component-title'>Completed Courses</h3>
            <ul>
                {recentCompletedCourses.map((course) => (
                    <li key={course._id}>
                        <h5 className='dash-component-subheading'>
                            {course.title} - {' '}
                            {new Date(course.start).toLocaleDateString()}
                        </h5>
                    </li>
                ))}
            </ul>
            <button
                className='view-all-btn'
                onClick={() => {
                    /* Link to the page showing all completed courses */
                }}
            >
                <span>view all</span><CaretRightIcon className='caret-icon' />
            </button>
        </div>
    )
}

export default CompletedCourses
