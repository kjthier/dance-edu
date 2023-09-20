import React, { useEffect } from 'react'

const UpcomingPerformances: React.FC = () => {
    useEffect(() => {
        console.log('About to dispatch componentReady.');

        document.dispatchEvent(new CustomEvent('componentReady'))
    }, [])
    return (
        <div className='upcoming-performances'>
            <h2>Upcoming Performances</h2>
            {/* Content here */}
        </div>
    )
}

export default UpcomingPerformances
