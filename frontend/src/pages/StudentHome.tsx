import React, { useState, useEffect, useRef } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import { Box } from '@radix-ui/themes'

//  -------------COMPONENTS-------------
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import CoursesDisplayed from '../components/School/Studio'
import Questions from '../components/Questions/Questions'
import Schedule from '../components/Schedule/Schedule'

const StudentHome: React.FC = () => {
    const { userId } = useParams()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const calendarRef = useRef<any>(null) // Newly added line for sharing ref

    useEffect(() => {
        const sidebarElement = document.querySelector('.sidebar')
        const handleTransitionEnd = () => {
            if (calendarRef.current) {
                const calendarApi = calendarRef.current.getApi()
                calendarApi.updateSize()
            }
        }
        sidebarElement?.addEventListener('transitionend', handleTransitionEnd)

        return () => {
            sidebarElement?.removeEventListener('transitionend', handleTransitionEnd)
        }
    }, [])
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div>
            <Header userId={userId!} />
            <div className='main-container'>
                <Box className='content-wrapper'>
                <Sidebar userId={userId!} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className={`main-content ${isSidebarOpen ? 'open' : 'closed'}`}>
                        <Routes>
                            <Route
                                path='school'
                                element={<CoursesDisplayed userId={userId!} />}
                            />
                            <Route
                                path='questions'
                                element={<Questions userId={userId!} />}
                            />
                            <Route
                                path='schedule'
                                element={<Schedule userId={userId!} isSidebarOpen={isSidebarOpen} ref={calendarRef} />}
                                />
                        </Routes>
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default StudentHome
