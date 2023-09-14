import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StudentHome from './src/pages/StudentHome'
import Auth from './src/components/Auth/Auth'

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/student/*' element={<StudentHome />} />
                    <Route path='/auth' element={<Auth />} />
                    <Route path='/student/:userId/*' element={<StudentHome />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
