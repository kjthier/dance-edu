import {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
    useRef,
} from 'react'
import { EventClickArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import EventUnenrollModal from '../reusable/EventUnenrollModal'
import CreateUserEventModal from './CreateUserEventModal'
import EditUserEventModal from './EditUserEventModal'
import { ICourse, IUserEvent } from '../../types/ICourse'
import './Schedule.css'

type ScheduleProps = {
    userId: string
    isSidebarOpen: boolean
}

// utility function for expandCoursesToEvents()
const convertTo24Hour = (time) => {
    const [mainTime, period] = time.split(' ')
    let [hours, minutes] = mainTime.split(':')

    if (period === 'PM' && +hours !== 12) {
        hours = +hours + 12
    }

    if (period === 'AM' && +hours === 12) {
        hours = '00'
    }

    return `${hours}:${minutes}`
}

// to render all instances of a course based on its schedule
const expandCoursesToEvents = (courses: ICourse[]): any[] => {
    return courses.flatMap((course) => {
        return course.extendedProps.schedule.map((session) => {
            const startTime24hr = convertTo24Hour(session.startTime)
            const endTime24hr = convertTo24Hour(session.endTime)

            const eventStartDate = new Date(`${session.date}T${startTime24hr}`)
            const eventEndDate = new Date(`${session.date}T${endTime24hr}`)

            console.log('Converted startTime:', startTime24hr)
            console.log('Converted endTime:', endTime24hr)
            console.log('eventStartDate:', eventStartDate)
            console.log('eventEndDate:', eventEndDate)

            return {
                ...course,
                start: eventStartDate,
                end: eventEndDate,
            }
        })
    })
}

const Schedule = forwardRef(({ userId }: ScheduleProps, ref: any) => {
    const calendarRef = useRef<any>(null)
    const [viewMode, setViewMode] = useState('dayGridMonth') // month view by default
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [courses, setCourses] = useState<ICourse[]>([])
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null)
    const [isUserEventModalOpen, setIsUserEventModalOpen] = useState(false)
    const [userEvents, setUserEvents] = useState<IUserEvent[]>([])
    const [selectedUserEvent, setSelectedUserEvent] =
        useState<IUserEvent | null>(null)

    // This hook allows parent component (StudentHome.tsx) to interact with the FullCalendar API by using the ref passed here
    useImperativeHandle(ref, () => ({
        getApi() {
            return calendarRef.current.getApi()
        },
    }))

    // Fetch courses data when component mounts
    useEffect(() => {
        fetch('https://dance-edu.onrender.com/courses')
            .then((response) => response.json())
            .then((data) => {
                setCourses(data)
            })
            .catch((error) => console.log('Error fetching courses:', error))
    }, [])

    // Fetch user events
    useEffect(() => {
        fetch(`https://dance-edu.onrender.com/userEvents`)
            .then((response) => response.json())
            .then((data) => {
                setUserEvents(data)
            })
            .catch((error) => console.log('Error fetching user events:', error))
    }, [])

    // Filter courses where isEnrolled is true
    const enrolledCourses = courses
        .filter((course) => course.extendedProps.isEnrolled)
        // Add an id property to each FullCalendar course object that matches the course id in db
        .map((course) => ({
            ...course,
            id: course._id,
        }))

    // Expand courses into multiple events based on their sessions
    const expandedCourses = expandCoursesToEvents(enrolledCourses)
    console.log('Final expanded courses:', expandedCourses)

    const handleCourseClick = (clickInfo: EventClickArg) => {
        const selectedCourse = enrolledCourses.find(
            (course) => course._id === clickInfo.event.id
        )
        if (selectedCourse) {
            setSelectedCourse(selectedCourse)
            setIsModalOpen(true)
        }
    }

    const handleUserEventClick = (clickInfo: EventClickArg) => {
        const eventId = clickInfo.event.extendedProps._id || 'N/A'

        // Find the selected user event based on _id
        const selectedUserEvent = userEvents.find(
            (userEvent) => userEvent._id === eventId
        )

        if (selectedUserEvent) {
            setSelectedUserEvent(selectedUserEvent)
            setIsUserEventModalOpen(true)
        }
    }

    const eventClickDispatcher = (clickInfo: EventClickArg) => {
        const eventType = clickInfo.event.extendedProps.eventType
        if (eventType === 'custom') {
            handleUserEventClick(clickInfo)
        } else {
            handleCourseClick(clickInfo)
        }
    }

    // Close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <div>
                <button onClick={() => setIsUserEventModalOpen(true)}>
                    Create New Event
                </button>
                {isUserEventModalOpen && (
                    <CreateUserEventModal
                        userId={userId}
                        isOpen={isUserEventModalOpen}
                        onClose={() => setIsUserEventModalOpen(false)}
                        setUserEvents={setUserEvents}
                    />
                )}
            </div>
            <div className='schedule-container'>
                <div
                    className='schedule-container__fullcalendar'
                    id='fullcalendar'
                >
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView={viewMode}
                        events={[...expandedCourses, ...userEvents]}
                        eventClick={eventClickDispatcher}
                        ref={calendarRef}
                        headerToolbar={{
                            left: 'prev,next',
                            center: 'title',
                            right: 'today dayGridDay,dayGridWeek,dayGridMonth',
                        }}
                        viewDidMount={(args) => {
                            const calendarElement: HTMLElement | null =
                                document.getElementById('fullcalendar')
                            if (calendarElement) {
                                if (args.view.type === 'dayGridWeek') {
                                    calendarElement.classList.add('week-view')
                                } else if (args.view.type === 'dayGridDay') {
                                    calendarElement.classList.add('day-view')
                                } else {
                                    calendarElement.classList.remove(
                                        'week-view',
                                        'day-view'
                                    )
                                }
                            }
                            setViewMode(args.view.type)
                        }}
                    />
                    {selectedCourse && isModalOpen && (
                        <>
                            <div className='backdrop'></div>
                            <EventUnenrollModal
                                isOpen={isModalOpen}
                                event={selectedCourse}
                                onClose={handleCloseModal}
                                setCourses={setCourses}
                            />
                        </>
                    )}
                    {selectedUserEvent && isUserEventModalOpen && (
                        <>
                            <div className='backdrop'></div>
                            {/* Replace with your actual UserEventModal component */}
                            <EditUserEventModal
                                event={selectedUserEvent}
                                userId={userId}
                                isOpen={isUserEventModalOpen}
                                onClose={() => setIsUserEventModalOpen(false)}
                                userEvents={userEvents}
                                setUserEvents={setUserEvents}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    )
})

export default Schedule
