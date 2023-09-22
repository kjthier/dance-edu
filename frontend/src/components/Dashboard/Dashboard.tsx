import React, { useEffect, useRef } from 'react'
import Packery from 'packery'
import Draggabilly from 'draggabilly'
import Today from './Today'
import Goals from './Goals'
import CompletedCourses from './CompletedCourses'
import Notes from './Notes'
import Achievements from './Achievements'
import './Dashboard.css'

const Dashboard: React.FC = () => {
    const dashboardRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (dashboardRef.current) {
            const packery = new (Packery as any)(dashboardRef.current, {
                itemSelector: '.dashboard-item',
                gutter: 10,
            })

            // Load layout from localStorage
            const savedLayout = localStorage.getItem('dashboardLayout')
            if (savedLayout) {
                const layout = JSON.parse(savedLayout)
                layout.forEach((id: string) => {
                    const item = document.querySelector(`[data-id="${id}"]`)
                    if (item && dashboardRef.current) {
                        dashboardRef.current.appendChild(item)
                    }
                })
                packery.layout()
            }

            // Make draggable
            const draggies: Draggabilly[] = []
            const items: HTMLElement[] = packery.getItemElements()
            items.forEach((item: HTMLElement) => {
                const draggie = new Draggabilly(item)
                draggies.push(draggie)
                packery.bindDraggabillyEvents(draggie)
            })

            // Save layout to localStorage
            packery.on('dragItemPositioned', () => {
                const layout = items.map(
                    (item: HTMLElement) =>
                        item.getAttribute('data-id') as string
                )
                localStorage.setItem('dashboardLayout', JSON.stringify(layout))
            })
        }
    }, [])

    return (
        <div ref={dashboardRef} className='dashboard'>
            <div className='dashboard-item' data-id='today'>
                <Today />
            </div>
            <div className='dashboard-item' data-id='goals'>
                <Goals />
            </div>
            <div className='dashboard-item' data-id='completedCourses'>
                <CompletedCourses />
            </div>
            <div className='dashboard-item' data-id='notes'>
                <Notes />
            </div>
            <div className='dashboard-item' data-id='achievements'>
                <Achievements />
            </div>
        </div>
    )
}

export default Dashboard
