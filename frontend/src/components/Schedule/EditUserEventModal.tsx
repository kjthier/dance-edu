import React, { useState, useEffect } from 'react'
import {
    IUserEvent,
    Location,
    StudioType,
    ProgramType,
} from '../../types/ICourse'

interface EditUserEventModalProps {
    userId: string
    isOpen: boolean
    onClose: () => void
    event: IUserEvent
    userEvents: IUserEvent[]
    setUserEvents: React.Dispatch<React.SetStateAction<IUserEvent[]>>
}

const EditUserEventModal: React.FC<EditUserEventModalProps> = ({
    // userId,
    isOpen,
    onClose,
    event,
    userEvents,
    setUserEvents,
}) => {
    const dateToString = (date: any) => {
        if (date instanceof Date) {
            return `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        }
        console.error('Invalid date:', date)
        return ''
    }

    // Convert ISO string to the date string format that <input type='date'> expects ("YYYY-MM-DD").
    const isoStringToDateInputValue = (isoString: string): string => {
        const date = new Date(isoString)
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            '0'
        )}-${String(date.getDate()).padStart(2, '0')}`
    }

    const [formData, setFormData] = useState({
        title: event.title,
        start:
            event.start instanceof Date
                ? dateToString(event.start)
                : isoStringToDateInputValue(event.start),
        startTime: event.extendedProps.schedule?.[0]?.startTime || '09:00',
        endTime: event.extendedProps.schedule?.[0]?.endTime || '10:00',
        allDay: event.allDay,
        longDescription: event.extendedProps.longDescription,
        location: event.extendedProps.location,
        studioType: event.extendedProps.studioType,
        programType: event.extendedProps.programType,
    })

    useEffect(() => {
        setFormData({
            title: event.title,
            start:
                event.start instanceof Date
                    ? dateToString(event.start)
                    : isoStringToDateInputValue(event.start),
            startTime: event.extendedProps.schedule?.[0]?.startTime || '09:00',
            endTime: event.extendedProps.schedule?.[0]?.endTime || '10:00',
            allDay: event.allDay,
            longDescription: event.extendedProps.longDescription,
            location: event.extendedProps.location,
            studioType: event.extendedProps.studioType,
            programType: event.extendedProps.programType,
        })
    }, [event])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target

        // Type guard to specify that e.target is HTMLInputElement for 'checkbox'
        let finalValue: string | boolean = value
        if (type === 'checkbox' && 'checked' in e.target) {
            finalValue = (e.target as HTMLInputElement).checked
        }

        setFormData({
            ...formData,
            [name]: finalValue,
        })
    }

    const editEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const updatedEvent = {
            ...event,
            title: formData.title,
            start: formData.start,
            allDay: formData.allDay,
            extendedProps: {
                ...event.extendedProps,
                schedule: [
                    {
                        date: event.extendedProps.schedule?.[0]?.date || '',
                        startTime: formData.startTime,
                        endTime: formData.endTime,
                    },
                ],
                longDescription: formData.longDescription,
                location: formData.location,
                studioType: formData.studioType,
                programType: formData.programType,
            },
        }

        const response = await fetch(
            `https://dance-edu.onrender.com/userEvents/${event?._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEvent),
            }
        )

        if (response.ok) {
            const savedEvent = await response.json()

            const updatedUserEvents = userEvents.map((ue) =>
                ue._id === savedEvent._id ? savedEvent : ue
            )
            setUserEvents(updatedUserEvents)
            onClose()
        } else {
            console.log('Failed to update event')
        }
    }

    const handleDelete = async () => {
        const response = await fetch(
            `https://dance-edu.onrender.com/userEvents/${event._id}`,
            {
                method: 'DELETE',
            }
        )

        if (response.ok) {
            const updatedUserEvents = userEvents.filter(
                (ue) => ue._id !== event._id
            )
            setUserEvents(updatedUserEvents)
            onClose()
        } else {
            console.log('Failed to delete event')
        }
    }

    return isOpen ? (
        <div className='dialog-overlay' onClick={onClose}>
            <div className='event-modal' onClick={(e) => e.stopPropagation()}>
                <form onSubmit={editEvent} className='event-modal-content'>
                    <input
                        className='edit_event-inputs'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        placeholder='event'
                    />
                    <div className='datetime-container'>
                        <div className='datetime-left'>
                            <input
                                className='edit_event-inputs'
                                name='start'
                                value={formData.start}
                                onChange={handleChange}
                                placeholder='date'
                                type='date'
                            />
                            <div className='allday'>
                                <input
                                    type='checkbox'
                                    name='allDay'
                                    checked={formData.allDay}
                                    onChange={handleChange}
                                />
                                <span>all-day</span>
                            </div>
                        </div>
                        <div className='datetime-right'>
                            <div className='time-wrapper'>
                                <span>starts:</span>
                                <input
                                    className='edit_event-inputs'
                                    name='startTime'
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    placeholder='Start Time'
                                    type='time'
                                />
                            </div>
                            <div className='time-wrapper'>
                                <span>ends:</span>
                                <input
                                    className='edit_event-inputs'
                                    name='endTime'
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    placeholder='End Time'
                                    type='time'
                                />
                            </div>
                        </div>
                    </div>
                    <textarea
                        className='edit_event-inputs edit_event-description'
                        name='longDescription'
                        value={formData.longDescription}
                        onChange={handleChange}
                        placeholder=''
                    />

                    <div className='radio-container'>
                        <div className='radio-column'>
                            <h4>Location</h4>
                            {Object.values(Location).map((loc) => (
                                <label key={loc} className='label-radio'>
                                    <input
                                        type='radio'
                                        name='location'
                                        value={loc}
                                        checked={formData.location === loc}
                                        onChange={handleChange}
                                    />
                                    {loc}
                                </label>
                            ))}
                            <h4>Studio Type</h4>
                            {Object.values(StudioType).map((type) => (
                                <label key={type} className='label-radio'>
                                    <input
                                        type='radio'
                                        name='studioType'
                                        value={type}
                                        checked={formData.studioType === type}
                                        onChange={handleChange}
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                        <div className='radio-column'>
                            <h4>Program Type</h4>
                            {Object.values(ProgramType).map((type) => (
                                <label key={type} className='label-radio'>
                                    <input
                                        type='radio'
                                        name='programType'
                                        value={type}
                                        checked={formData.programType === type}
                                        onChange={handleChange}
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className='button-row'>
                        <button
                            className='primary-btn warning-btn'
                            type='button'
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button className='primary-btn' type='submit'>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null
}

export default EditUserEventModal
