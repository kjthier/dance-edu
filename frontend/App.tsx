import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StudentHome from './src/pages/student/StudentHome'

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/student/*" element={<StudentHome />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App

