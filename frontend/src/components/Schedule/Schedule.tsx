import React, { useState, useEffect } from 'react'
import { EventClickArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import EventEditModal from './EventEditModal'
import EventDetailModal from './EventDetailModal'
import { ICourse, IUserEvent, IEvent } from '../../types/ICourse'
import { mockUserEvents } from '../../data/mockCourses'
import './schedule.css'

type ScheduleProps = {
  userId: string
}

const Schedule: React.FC<ScheduleProps> = () => {
  const [viewMode, setViewMode] = useState('dayGridMonth') // week view by default
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [courses, setCourses] = useState<ICourse[]>([])
  const [userEvents, setUserEvents] = useState<IUserEvent[]>(mockUserEvents)
  const [clickedEvent, setClickedEvent] = useState<IEvent | null>(null)

  useEffect(() => {
    // Fetch data from API when component mounts
    fetch('https://dance-edu.onrender.com/courses')
        .then(response => response.json())
        .then(data => setCourses(data))
        .catch(error => console.log('Error fetching courses:', error))
  }, [])

  // merge courses & custom events for fullcalendar
  const allEvents: IEvent[] = [...courses, ...userEvents]

  const handleEventClick = (clickInfo: EventClickArg) => { 
    const event: IEvent = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start || new Date(),
      allDay: clickInfo.event.allDay,
      url: clickInfo.event.url,
      overlap: true, 
      editable: 'editable' in clickInfo.event ? (clickInfo.event.editable as boolean) : false,
      extendedProps: (clickInfo.event.extendedProps as unknown) as IEvent['extendedProps'],
    }
  
    setClickedEvent(event) // set clicked event
    console.log("New clickedEvent:", event) // Log new clicked event

    setIsModalOpen(true) // open the modal
    console.log("New isModalOpen:", true) // Log new isModalOpen state

    console.log(clickInfo.event)
  }

// save the event changes
  const handleEventSave = () => {
  }

  // close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false) 
  }

  return (
    <div className='schedule-container'>
      <div className="schedule-container__fullcalendar" id='fullcalendar'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView={viewMode}
          events={allEvents}
          eventClick={handleEventClick}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'today dayGridDay,dayGridWeek,dayGridMonth'
          }}
          viewDidMount={(args) => {
            setViewMode(args.view.type)
          }}
        />

        {clickedEvent && (
        clickedEvent.editable 
          ? <EventEditModal
              event={clickedEvent}
              onSave={handleEventSave}
              onClose={handleCloseModal}
            />
          : <EventDetailModal
              isOpen={isModalOpen}
              event={clickedEvent}
              onClose={handleCloseModal}
            />
      )}
      </div>
    </div>
  )
}

export default Schedule