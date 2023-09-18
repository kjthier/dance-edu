import React, { useEffect, useRef } from 'react'
import Packery from 'packery'
import Draggabilly from 'draggabilly'
import Today from './Today'
import Goals from './Goals'
import CompletedCourses from './CompletedCourses'
import Notes from './Notes'
import UpcomingPerformances from './UpcomingPerformances'
import './Dashboard.css'

const Dashboard: React.FC = () => {
    const dashboardRef = useRef(null)

    // Init packery
    useEffect(() => {
        if (dashboardRef.current) {
            const packery = new Packery(dashboardRef.current, {
                itemSelector: '.dashboard-item',
                gutter: 10,
            })

            const itemElems = packery.getItemElements()

            // Make each item draggable
            itemElems.forEach((itemElem: HTMLElement) => {
                const draggie = new Draggabilly(itemElem)
                packery.bindDraggabillyEvents(draggie)
            })
        }
    }, [])

    return (
        <div ref={dashboardRef} className='dashboard'>
            <div className='dashboard-item'>
                <Today />
            </div>
            <div className='dashboard-item'>
                <Goals />
            </div>
            <div className='dashboard-item'>
                <CompletedCourses />
            </div>
            <div className='dashboard-item'>
                <Notes />
            </div>
            <div className='dashboard-item'>
                <UpcomingPerformances />
            </div>
        </div>
    )
}

export default Dashboard
