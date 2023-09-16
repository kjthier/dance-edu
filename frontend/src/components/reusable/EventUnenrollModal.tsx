import * as Dialog from '@radix-ui/react-dialog'
import React, { useState, useEffect } from 'react'
import { Box, Text } from '@radix-ui/themes'
import { IEvent } from '../../types/ICourse'
import '../../assets/styles/EventModals.css'

interface EventUnenrollModalProps {
    event: IEvent
    isOpen: boolean
    onClose: () => void
    onRemoveFromSchedule: () => void
}

const EventUnenrollModal: React.FC<EventUnenrollModalProps> = ({
    event,
    onClose,
    isOpen,
}) => {
    const [events, setEvents] = useState<IEvent[]>([])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(
                    'https://dance-edu.onrender.com/courses'
                )
                const data = await response.json()
                setEvents(data)
            } catch (error) {
                console.error('Error fetching courses:', error)
            }
        }

        fetchCourses()
    }, [])

    const handleUnenroll = async () => {
        const { _id } = event

        if (_id) {
            const index = events.findIndex((e) => e._id === _id)

            if (index !== -1) {
                const newEvents = [...events]
                newEvents[index].extendedProps.isEnrolled = false
                setEvents(newEvents)

                try {
                    const response = await fetch(
                        `https://dance-edu.onrender.com/courses/${_id}/unenroll`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ isEnrolled: false }),
                        }
                    )

                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }

                    const data = await response.json()
                    console.log('Course unenrolled successfully:', data)
                } catch (error) {
                    console.error('Fetch error:', error)
                }

                onClose()
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
                        className='action-label primary-btn'
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
