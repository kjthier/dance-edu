import React, { useEffect, useRef, useState } from 'react'
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
    const [componentsReady, setComponentsReady] = useState(0)

    useEffect(() => {
        const handleComponentReady = () => {
            console.log('Received componentReady event.');
            setComponentsReady(prev => prev + 1)
        }

        const initializePackeryAndDraggabilly = () => {
            if (dashboardRef.current) {
                const packery = new Packery(dashboardRef.current, {
                    itemSelector: '.dashboard-item',
                    gutter: 10,
                })

                const itemElems = packery.getItemElements()

                itemElems.forEach((itemElem: HTMLElement) => {
                    const draggie = new Draggabilly(itemElem)
                    packery.bindDraggabillyEvents(draggie)
                })
            }
        }

        if (componentsReady === 5) { 
            initializePackeryAndDraggabilly()
        }

        document.addEventListener('componentReady', handleComponentReady)

        return () => {
            document.removeEventListener('componentReady', handleComponentReady)
        }
    }, [componentsReady])
    

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
