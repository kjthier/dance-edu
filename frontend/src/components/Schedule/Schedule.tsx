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
import UserEventModal from './UserEventModal'
import { ICourse, IUserEvent } from '../../types/ICourse'
import './Schedule.css'

type ScheduleProps = {
    userId: string
    isSidebarOpen: boolean
}

const Schedule = forwardRef(({ userId }: ScheduleProps, ref: any) => {
    const calendarRef = useRef<any>(null)
    const [viewMode, setViewMode] = useState('dayGridMonth') // month view by default
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [courses, setCourses] = useState<ICourse[]>([])
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null)
    const [isUserEventModalOpen, setIsUserEventModalOpen] = useState(false)
    const [userEvents, setUserEvents] = useState<IUserEvent[]>([])

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
                console.log('Fetched courses:', data)
                setCourses(data)
            })
            .catch((error) => console.log('Error fetching courses:', error))
    }, [])

    // Fetch user events
    useEffect(() => {
        fetch(`https://dance-edu.onrender.com/userEvents`)
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched user events:', data)
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

    // When course is clicked, open unenroll modal
    const handleCourseClick = (clickInfo: EventClickArg) => {
        const selectedCourse = enrolledCourses.find(
            (course) => course._id === clickInfo.event.id
        )
        if (selectedCourse) {
            setSelectedCourse(selectedCourse)
            setIsModalOpen(true)
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
                    <UserEventModal
                        userId={userId}
                        isOpen={isUserEventModalOpen}
                        onClose={() => setIsUserEventModalOpen(false)}
                        userEvents={userEvents}
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
                        events={[...enrolledCourses, ...userEvents]}
                        eventClick={handleCourseClick}
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
                    {selectedCourse && (
                        <>
                            {isModalOpen && <div className='backdrop'></div>}
                            {selectedCourse && (
                                <EventUnenrollModal
                                    isOpen={isModalOpen}
                                    event={selectedCourse}
                                    onClose={handleCloseModal}
                                    setCourses={setCourses}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
})

export default Schedule
