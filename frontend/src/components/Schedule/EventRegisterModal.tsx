import * as Dialog from '@radix-ui/react-dialog'
import { Box, Text } from '@radix-ui/themes'
import { IEvent } from '../../types/ICourse'
import '../reusable/EventDetailModal.css'
import React from 'react'

// Define prop types for this component
interface EventRegisterModalProps {
    event: IEvent
    onClose: () => void
    isOpen: boolean
    onAddToSchedule: () => void
}

const EventRegisterModal: React.FC<EventRegisterModalProps> = ({
    event,
    onClose,
    isOpen,
    onAddToSchedule
}) => {
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
                        onClick={() => {
                            onAddToSchedule()
                            onClose()
                        }}
                    >
                        Add to Schedule
                    </Dialog.Close>
                </Box>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default EventRegisterModal
