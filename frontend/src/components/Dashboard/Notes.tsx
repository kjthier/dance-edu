import React, { useEffect } from 'react'

const Notes: React.FC = () => {
    useEffect(() => {
        console.log('About to dispatch componentReady.');

        document.dispatchEvent(new CustomEvent('componentReady'))
    }, [])

    return (
        <div className='notes'>
            <h2>Notes</h2>
            {/* Content here */}
        </div>
    )
}

export default Notes
