import * as Dialog from '@radix-ui/react-dialog'
import { useState, useEffect } from 'react'
import { IEvent } from '../../types/ICourse'
interface EventEditModalProps {
    event: IEvent
    onClose: () => void
    onSave: (event: IEvent) => void
}

const EventEditModal: React.FC<EventEditModalProps> = ({
    event,
    onClose,
    onSave,
}) => {
    // Initialize state for the edited event
    const [editedEvent, setEditedEvent] = useState<IEvent>(event)

    // Update the editedEvent state if the event prop changes
    useEffect(() => {
        setEditedEvent(event)
    }, [event])

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Create a new object with the updated properties
        setEditedEvent({
            ...editedEvent,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = () => {
        onSave(editedEvent)
        onClose()
    }

    return (
        <Dialog.Root>
            <Dialog.Content
                style={{
                    border: '1px solid black',
                    backgroundColor: 'white',
                    zIndex: 1000,
                }}
            >
                <h2>Edit Event</h2>
                <form>
                    <label>
                        Title:
                        <input
                            name='title'
                            value={editedEvent.title}
                            onChange={handleChange} // Update the state when input changes
                        />
                    </label>
                    {/* Add other fields  */}

                    <button type='button' onClick={handleSubmit}>
                        Save
                    </button>

                    <Dialog.Close type='button'>Cancel</Dialog.Close>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default EventEditModal
