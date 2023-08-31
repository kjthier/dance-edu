import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StudentUI from './frontend/student-service/src/App'

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/student" element={<StudentUI />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App

