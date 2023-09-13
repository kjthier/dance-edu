import * as Dialog from '@radix-ui/react-dialog'
import { Box, Text } from '@radix-ui/themes'
import { IEvent } from '../../types/ICourse'
import './EventUnenrollModal.css'
import axios from 'axios'

// Define prop types for this component
interface EventUnenrollModalProps {
    event: IEvent
    onClose: () => void
    isOpen: boolean
}

const EventUnenrollModal: React.FC<EventUnenrollModalProps> = ({
    event,
    onClose,
    isOpen,
}) => {
    // Assume courseId and userId are either props or obtained some other way
    const courseId = 'someCourseId'
    const userId = 'someUserId'

    const handleUnenroll = async () => {
        try {
            const response = await axios.put(
                `https://your-api.com/courses/${courseId}/unenroll/${userId}`,
                {
                    isEnrolled: false,
                }
            )

            if (response.status === 200) {
                console.log('Successfully unenrolled')
                onClose()
            } else {
                console.error('Failed to unenroll', response)
            }
        } catch (error) {
            console.error('Error unenrolling course:', error)
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
