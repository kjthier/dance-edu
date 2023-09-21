import React, { useState, useEffect } from 'react'
import { TextArea } from '@radix-ui/themes'

const Notes: React.FC = () => {
    const [notes, setNotes] = useState('')

    useEffect(() => {
        const savedNotes = localStorage.getItem('userNotes')
        if (savedNotes) {
            setNotes(savedNotes)
        }
    }, [])

    // Write to local storage when notes change
    useEffect(() => {
        localStorage.setItem('userNotes', notes)
    }, [notes])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value)
    }

    return (
        <div className='notes'>
            <h3 className='dash-component-title'>Notes</h3>
            <textarea
                className='notes-textarea'
                value={notes}
                onChange={handleChange}
                placeholder='Write any notes here...'
            />
        </div>
    )
}

export default Notes
