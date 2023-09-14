import * as Dialog from '@radix-ui/react-dialog'
import React, { useState, useEffect } from 'react'
import { Box, Text } from '@radix-ui/themes'
import { ICourse } from '../../types/ICourse'
import './EventUnenrollModal.css'
interface EventUnenrollModalProps {
    event: ICourse
    onClose: () => void
    isOpen: boolean
}

const EventUnenrollModal: React.FC<EventUnenrollModalProps> = ({
    event,
    onClose,
    isOpen,
}) => {

    const [courses, setCourses] = useState<ICourse[]>([])

    useEffect(() => {
        fetch('https://dance-edu.onrender.com/courses')
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.log('Error fetching courses:', error))
    }, [])

    const handleUnenroll = () => {
            console.log('Selected event inside handleUnenroll:', event)
        
            if (event && event._id) { // check if event and event._id are available
                const index = courses.findIndex((course) => course._id === event._id)
        
                // check if index is not -1 (meaning a course was found)
                if (index !== -1) {
                    const newCourses = [...courses]
                    newCourses[index].extendedProps.isEnrolled = false
        
                    // Update the courses state locally
                    setCourses(newCourses)
        
                    console.log(`Fetch URL: https://dance-edu.onrender.com/courses/${event._id}/unenroll`)
        
                    fetch(
                        `https://dance-edu.onrender.com/courses/${event._id}/unenroll`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ isEnrolled: false })
                        }
                    )
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok')
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log('Course unenrolled successfully:', data)
                    })
                    .catch((error) => {
                        console.error('Fetch error:', error)
                    });
        
                    onClose(); // Close the modal
                } else {
                    console.error('Course not found in the list.')
                }
            } else {
                console.error('Event or event._id is not available.')
            }
    }        

    const { extendedProps, title } = event

    const formatDate = (isoDateString: string): string => {
        const dateObject = new Date(isoDateString)
        const day = String(dateObject.getDate()).padStart(2, '0')
        const month = String(dateObject.getMonth() + 1).padStart(2, '0') // Months are zero-based
        return `${day}/${month}`
    }

    return (
        <Dialog.Root open={isOpen}>
            {/* to close the modal when the user clicks outside of the modal */}
            <Dialog.Overlay className='dialog-overlay' onClick={onClose} />

            <Dialog.Content className='event-modal'>
                <Box className='event-modal-content'>
                    <Text as='div' className='event-modal-title'>
                        {title}
                    </Text>
                    {extendedProps && (
                        <>
                            <Box className='event-modal-subheading'>
                                <Text as='p' className='event-modal-teacher'>
                                    <em>
                                        {extendedProps.programType} with{' '}
                                        {extendedProps.teacher}
                                    </em>
                                </Text>
                                <Text as='span' className='event-modal-level'>
                                    {extendedProps.level}
                                </Text>
                            </Box>

                            <Text as='p' className='event-modal-description'>
                                {extendedProps.longDescription}
                            </Text>

                            <Text as='p' className='event-modal-location'>
                                <strong>{extendedProps.location}</strong>
                            </Text>

                            {extendedProps.schedule &&
                                extendedProps.schedule.length > 0 && (
                                    <Box className='event-modal-schedule-container'>
                                        {extendedProps.schedule.map(
                                            (session, index) => (
                                                <Box
                                                    key={index}
                                                    className='event-modal-schedule-item'
                                                >
                                                    <Text
                                                        as='p'
                                                        className='event-modal-schedule-label'
                                                    >
                                                        {formatDate(
                                                            session.date
                                                        )}
                                                        : {session.startTime}-
                                                        {session.endTime}
                                                    </Text>
                                                </Box>
                                            )
                                        )}
                                    </Box>
                                )}
                        </>
                    )}
                    <Dialog.Close
                        className='action-label secondary-btn'
                        onClick={handleUnenroll}
                    >
                        Unenroll
                    </Dialog.Close>
                </Box>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default EventUnenrollModal
