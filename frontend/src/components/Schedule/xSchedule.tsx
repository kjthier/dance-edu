import {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
    useRef,
} from 'react'
import { EventClickArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import EventEditModal from './EventEditModal'
import EventUnenrollModal from '../reusable/EventUnenrollModal'
import { ICourse, IUserEvent, IEvent } from '../../types/ICourse'
import './Schedule.css'

type ScheduleProps = {
    userId: string
    isSidebarOpen: boolean
}

const Schedule = forwardRef((_: ScheduleProps, ref: any) => {
    const calendarRef = useRef<any>(null)
    const [viewMode, setViewMode] = useState('dayGridMonth') // month view by default
    const [isModalOpen, setIsModalOpen] = useState(true)
    const [courses, setCourses] = useState<ICourse[]>([])
    const [userEvents, setUserEvents] = useState<IUserEvent[]>([])
    const [clickedEvent, setClickedEvent] = useState<IEvent | null>(null)

    useImperativeHandle(ref, () => ({
        getApi() {
            return calendarRef.current.getApi()
        },
    }))

    // Fetch data from API when component mounts
    useEffect(() => {
        fetch('https://dance-edu.onrender.com/courses')
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.log('Error fetching courses:', error))
    }, [])

    // Filter courses where isEnrolled is true
    const enrolledCourses = courses.filter(course => course.extendedProps.isEnrolled === true);

    // merge enrolled courses & custom events for fullcalendar
    const allEvents: IEvent[] = [...enrolledCourses, ...userEvents];

    const handleEventClick = (clickInfo: EventClickArg) => {
        const event: IEvent = {
            _id: clickInfo.event.id,
            title: clickInfo.event.title,
            start: clickInfo.event.start || new Date(),
            allDay: clickInfo.event.allDay,
            url: clickInfo.event.url,
            overlap: true,
            editable:
                'editable' in clickInfo.event
                    ? (clickInfo.event.editable as boolean)
                    : false,
            extendedProps: clickInfo.event
                .extendedProps as unknown as IEvent['extendedProps'],
        }

        setClickedEvent(event) // set clicked event
        console.log('New clickedEvent:', event) // Log new clicked event

        setIsModalOpen(true) // open the modal
        console.log('New isModalOpen:', true) // Log new isModalOpen state
        console.log(clickInfo.event)
    }

    // save the event changes
    const handleEventSave = () => {}

    // close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className='schedule-container'>
            <div className='schedule-container__fullcalendar' id='fullcalendar'>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView={viewMode}
                    events={allEvents}
                    eventClick={handleEventClick}
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

{clickedEvent &&
    (clickedEvent.editable ? (
        <EventEditModal
            event={clickedEvent}
            onSave={handleEventSave}
            onClose={handleCloseModal}
        />
    ) : (
        <EventUnenrollModal
            isOpen={isModalOpen}
            event={clickedEvent} // Make sure clickedEvent is compatible with ICourse
            onClose={handleCloseModal}
            setCourses={setCourses} 
        />
    ))}
            </div>
        </div>
    )
})

export default Schedule
