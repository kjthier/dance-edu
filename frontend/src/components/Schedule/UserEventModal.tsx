import React, { useState } from 'react'
import {
    IUserEvent,
    Location,
    StudioType,
    ProgramType,
} from '../../types/ICourse'
import '../../assets/styles/EventModals.css'

interface UserEventModalProps {
    userId: string
    isOpen: boolean
    onClose: () => void
    event?: IUserEvent
    userEvents: IUserEvent[]
    setUserEvents: React.Dispatch<React.SetStateAction<IUserEvent[]>>
}

const UserEventModal: React.FC<UserEventModalProps> = ({
    userId,
    isOpen,
    onClose,
    userEvents,
    setUserEvents,
}) => {
    const [formData, setFormData] = useState({
        title: '',
        start: new Date().toISOString().split('T')[0],
        allDay: false,
        url: '',
        description: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newEvent: IUserEvent = {
            userId,
            title: formData.title,
            start: new Date(formData.start),
            allDay: formData.allDay,
            url: formData.url,
            overlap: true,
            editable: true,
            extendedProps: {
                description: formData.description,
                longDescription: formData.longDescription,
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
            const updatedUserEvents = [...userEvents, savedEvent]

            setUserEvents(updatedUserEvents)
            console.log('Updated user events: ', updatedUserEvents) // Log to debug
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return isOpen ? (
        <div className='dialog-overlay'>
            <div className='event-modal'>
                <form onSubmit={handleSubmit} className='event-modal-content'>
                    <div className='event-modal-title'>Add User Event</div>

                    <input
                        className='event-modal-description'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        placeholder='Event Title'
                    />
                    <input
                        className='event-modal-description'
                        name='start'
                        value={formData.start}
                        onChange={handleChange}
                        placeholder='Start Date'
                        type='date'
                    />
                    <div className='event-modal-subheading'>
                        <input
                            type='checkbox'
                            name='allDay'
                            checked={formData.allDay}
                            onChange={handleChange}
                        />
                        All Day
                    </div>
                    <input
                        className='event-modal-description'
                        name='url'
                        value={formData.url}
                        onChange={handleChange}
                        placeholder='URL'
                    />
                    <textarea
                        className='event-modal-description'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        placeholder='Description'
                    />
                    <textarea
                        className='event-modal-description'
                        name='longDescription'
                        value={formData.longDescription}
                        onChange={handleChange}
                        placeholder='Long Description'
                    />

                    {Object.values(Location).map((loc) => (
                        <label key={loc}>
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
                    {Object.values(StudioType).map((type) => (
                        <label key={type}>
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
                    {Object.values(ProgramType).map((type) => (
                        <label key={type}>
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

                    <button type='submit'>Save</button>
                    <button onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    ) : null
}

export default UserEventModal
