import { Route, Routes } from 'react-router-dom'
import { Box } from '@radix-ui/themes'
import { useParams } from 'react-router-dom'

//  -------------COMPONENTS-------------
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import CoursesDisplayed from '../components/School/School'
import Questions from '../components/Questions/Questions'
import Schedule from '../components/Schedule/Schedule'


const StudentHome: React.FC = () => {
  const { userId } = useParams()

  
  return (
    <div>
      <Header userId={userId!} />
      <div className="main-container">
        <Box className="content-wrapper">
          <Sidebar userId={userId!} />
          <div className="main-content">
            <Routes>
              <Route path="school" element={<CoursesDisplayed userId={userId!} />} />
              <Route path="questions" element={<Questions userId={userId!} />} />
              <Route path="schedule" element={<Schedule userId={userId!} />} />

            </Routes>
          </div>
        </Box>
      </div>
    
  </div>  
    )
}

export default StudentHome