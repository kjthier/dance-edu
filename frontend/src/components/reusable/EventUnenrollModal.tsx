import * as Dialog from '@radix-ui/react-dialog'
import { Box, Text } from '@radix-ui/themes'
import { ICourse } from '../../types/ICourse'
import '../../assets/styles/EventModals.css'

interface EventUnenrollModalProps {
    event: ICourse
    isOpen: boolean
    onClose: () => void
    setCourses: React.Dispatch<React.SetStateAction<ICourse[]>>
}

const EventUnenrollModal: React.FC<EventUnenrollModalProps> = ({
    event,
    onClose,
    isOpen,
    setCourses,
}) => {
    const handleUnenroll = async () => {
        const { _id } = event

        if (_id) {
            try {
                // API request to unenroll
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

                // Update the local state of courses
                setCourses((prevCourses) =>
                    prevCourses.map((course) =>
                        course._id === _id
                            ? {
                                  ...course,
                                  extendedProps: {
                                      ...course.extendedProps,
                                      isEnrolled: false,
                                  },
                              }
                            : course
                    )
                )

                onClose()
            } catch (error) {
                console.error('Fetch error:', error)
            }
        }
    }

    // destructure event to use its properties in the return
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
                                    Level: {extendedProps.level}
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
