import React, { useState } from 'react'
import {
    IUserEvent,
    ISession,
    Location,
    StudioType,
    ProgramType,
} from '../../types/ICourse'
import '../../assets/styles/EventModals.css'

interface CreateUserEventModalProps {
    userId: string
    isOpen: boolean
    onClose: () => void
    setUserEvents: React.Dispatch<React.SetStateAction<IUserEvent[]>>
}

const CreateUserEventModal: React.FC<CreateUserEventModalProps> = ({
    userId,
    isOpen,
    onClose,
    setUserEvents,
}) => {
    const [formData, setFormData] = useState({
        title: '',
        start: new Date().toISOString().split('T')[0],
        startTime: '',
        endTime: '',
        allDay: false,
        longDescription: '',
        location: Location.ONLINE,
        studioType: StudioType.LIVE,
        programType: ProgramType.CLASS,
    })

    const handleChange = (e) => {
        const { name, value, type } = e.target
        const finalValue = type === 'checkbox' ? e.target.checked : value
        setFormData({
            ...formData,
            [name]: finalValue,
        })
    }

    const addUserEvent = async (newEvent: IUserEvent) => {
        let response
        try {
            response = await fetch(
                `https://dance-edu.onrender.com/userEvents`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newEvent),
                }
            )

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const savedEvent: IUserEvent = await response.json()
            setUserEvents((prevEvents) => [...prevEvents, savedEvent])
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const createEvent = async () => {
        const combinedDateTime = new Date(
            `${formData.start}T${formData.startTime}:00`
        )
        const session: ISession = {
            date: formData.start,
            startTime: formData.startTime,
            endTime: formData.endTime,
        }

        const newEvent: IUserEvent = {
            userId,
            title: formData.title,
            start: combinedDateTime,
            allDay: formData.allDay,
            overlap: true,
            editable: true,
            extendedProps: {
                longDescription: formData.longDescription,
                schedule: [session], // adding the session here
                location: formData.location,
                studioType: formData.studioType,
                programType: formData.programType,
                isEnrolled: true,
                eventType: 'custom',
            },
        }
        await addUserEvent(newEvent)
        onClose()
    }

    return isOpen ? (
        <div onClick={onClose} className='dialog-overlay'>
            <div className='event-modal' onClick={(e) => e.stopPropagation()}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        createEvent()
                    }}
                    className='event-modal-content'
                >
                    <input
                        className='edit_event-inputs'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        placeholder='Event Title'
                    />
                    <div className='datetime-container'>
                        <div className='datetime-left'>
                            <input
                                className='edit_event-inputs'
                                name='start'
                                value={formData.start}
                                onChange={handleChange}
                                placeholder='Start Date'
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
                            <input
                                className='edit_event-inputs'
                                name='startTime'
                                value={formData.startTime}
                                onChange={handleChange}
                                placeholder='Start Time'
                                type='time'
                            />
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
                    <textarea
                        className='edit_event-inputs edit_event-description'
                        name='longDescription'
                        value={formData.longDescription}
                        onChange={handleChange}
                        placeholder='Description'
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
                        <button className='primary-btn' type='submit'>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null
}

export default CreateUserEventModal
