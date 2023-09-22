import React, { useEffect, useRef, useState } from 'react'
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
    const [layoutOrder, setLayoutOrder] = useState<string[]>([])

    useEffect(() => {
        const savedLayout = localStorage.getItem('dashboardLayout')
        if (savedLayout) {
            setLayoutOrder(JSON.parse(savedLayout))
        } else {
            setLayoutOrder([
                'today',
                'goals',
                'completedCourses',
                'notes',
                'achievements',
            ])
        }
    }, [])

    useEffect(() => {
        if (dashboardRef.current && layoutOrder.length > 0) {
            const packery = new (Packery as any)(dashboardRef.current, {
                itemSelector: '.dashboard-item',
                gutter: 10,
            })

            packery.on('dragItemPositioned', () => {
                const items: HTMLElement[] = packery.getItemElements()
                const newLayout = items.map(
                    (item: HTMLElement) =>
                        item.getAttribute('data-id') as string
                )
                setLayoutOrder(newLayout)
                localStorage.setItem(
                    'dashboardLayout',
                    JSON.stringify(newLayout)
                )
            })

            // Separate this to ensure packery layout is done before making items draggable
            const items: HTMLElement[] = packery.getItemElements()
            items.forEach((item: HTMLElement) => {
                const draggie = new Draggabilly(item)
                packery.bindDraggabillyEvents(draggie)
            })

            packery.layout()
        }
    }, [layoutOrder])

    return (
        <div ref={dashboardRef} className='dashboard'>
            {layoutOrder.map((id) => {
                let component = null
                switch (id) {
                    case 'today':
                        component = <Today />
                        break
                    case 'goals':
                        component = <Goals />
                        break
                    case 'completedCourses':
                        component = <CompletedCourses />
                        break
                    case 'notes':
                        component = <Notes />
                        break
                    case 'achievements':
                        component = <Achievements />
                        break
                    default:
                        component = null
                }

                return (
                    <div key={id} className='dashboard-item' data-id={id}>
                        {component}
                    </div>
                )
            })}
        </div>
    )
}

export default Dashboard
