import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Course = {
    id: string
    title: string
    start: string
    isEnrolled: boolean
}

type UserEvent = {
    id: string
    title: string
    start: string
}

const TodaySchedule: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const [userEvents, setUserEvents] = useState<UserEvent[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesResponse = await axios.get(
                    'https://dance-edu.onrender.com/courses'
                )
                const enrolledCourses = coursesResponse.data.filter(
                    (course: Course) => course.isEnrolled
                )

                const userEventsResponse = await axios.get(
                    'https://dance-edu.onrender.com/userEvents'
                )

                setCourses(enrolledCourses)
                setUserEvents(userEventsResponse.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const tomorrowStart = new Date(todayStart)
    tomorrowStart.setDate(todayStart.getDate() + 1)

    const todaysSchedule = [...courses, ...userEvents].filter((item) => {
        const itemDate = new Date(item.start)
        return itemDate >= todayStart && itemDate < tomorrowStart
    })

    const sortedArray = todaysSchedule.sort((a, b) => {
        const dateA = new Date(a.start)
        const dateB = new Date(b.start)
        return dateA.getTime() - dateB.getTime()
    })

    return (
        <div>
            <h3 className='dash-component-title'>Today's Schedule</h3>
            <ul className='todays-schedule-list'>
                {sortedArray.map((item, index) => (
                    <li className='todays-schedule-item' key={index}>
                        {new Date(item.start).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                        })}
                        : {item.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodaySchedule
