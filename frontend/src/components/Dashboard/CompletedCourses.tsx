import React, { useEffect } from 'react'

const CompletedCourses: React.FC = () => {
    useEffect(() => {
        console.log('About to dispatch componentReady.');
        document.dispatchEvent(new CustomEvent('componentReady'))
    }, [])

    return (
        <div className='completed-courses'>
            <h2>Completed Courses</h2>
            {/* Content here */}
        </div>
    )
}

export default CompletedCourses
