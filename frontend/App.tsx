import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './src/pages/student/Dashboard'

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/student" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App

