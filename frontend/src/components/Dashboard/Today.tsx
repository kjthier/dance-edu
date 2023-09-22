import React, { useEffect, useState } from 'react'
import { ICourse, IUserEvent } from '../../types/ICourse'
import axios from 'axios'

const TodaySchedule: React.FC = () => {
    const [courses, setCourses] = useState<ICourse[]>([])
    const [userEvents, setUserEvents] = useState<IUserEvent[]>([])
    const [todaysSchedule, setTodaysSchedule] = useState<any[]>([])

    // Fetch courses and user events from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: courseData } = await axios.get(
                    'https://dance-edu.onrender.com/courses'
                )
                const enrolledCourses = courseData.filter(
                    (course: ICourse) => course.extendedProps.isEnrolled
                )
                setCourses(enrolledCourses)

                const { data: userEventData } = await axios.get(
                    'https://dance-edu.onrender.com/userEvents'
                )
                setUserEvents(userEventData)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    // Process and sort today's schedule
    useEffect(() => {
        // Define the time frame for today
        const todayStart = new Date()
        todayStart.setHours(0, 0, 0, 0)
        const tomorrowStart = new Date(todayStart)
        tomorrowStart.setDate(todayStart.getDate() + 1)

        // Convert courses into individual sessions
        const expandedCoursesSessions = courses.flatMap((course) =>
            course.extendedProps.schedule.map((session) => ({
                ...session,
                title: course.title,
            }))
        )

        // Map user events into a similar structure as course sessions
        const userEventsSessions = userEvents.map((event) => ({
            date: event.start,
            startTime: event.extendedProps?.schedule?.[0]?.startTime || '',
            endTime: event.extendedProps?.schedule?.[0]?.endTime || '',
            title: event.title,
        }))

        // Filter and sort all sessions
        const allSessions = [...expandedCoursesSessions, ...userEventsSessions]
            .filter((item) => {
                const itemDate = new Date(item.date)
                return itemDate >= todayStart && itemDate < tomorrowStart
            })
            .sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
            )

        setTodaysSchedule(allSessions)
    }, [courses, userEvents])

    return (
        <div>
            <h3 className='dash-component-title'>Today's Schedule</h3>
            <ul className='todays-schedule-list'>
                {todaysSchedule.map((item, index) => {
                    let formattedTime = ''

                    if (item.endTime === '') {
                        // For UserEvents
                        const eventDate = new Date(item.date)
                        const hours = eventDate.getHours()
                        const minutes = eventDate.getMinutes()

                        formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`
                    } else {
                        // For Courses
                        const startHour = parseInt(item.startTime.split(':')[0], 10)
                        const startMinute = parseInt(item.startTime.split(':')[1], 10)
                        const endHour = parseInt(item.endTime.split(':')[0], 10)
                        const endMinute = parseInt(item.endTime.split(':')[1], 10)
                        
                        const formattedStart = `${startHour % 12 || 12}:${startMinute.toString().padStart(2, '0')}`
                        const formattedEnd = `${endHour % 12 || 12}:${endMinute.toString().padStart(2, '0')}`
                        formattedTime = `${formattedStart}-${formattedEnd}`
                    }
                    
                    return (
                        <li className='todays-schedule-item' key={index}>
                            {formattedTime}: {item.title}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default TodaySchedule
