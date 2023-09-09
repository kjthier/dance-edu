import { Route, Routes } from 'react-router-dom'
import { Box } from '@radix-ui/themes'

//  -------------COMPONENTS-------------
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import CoursesDisplayed from '../../components/School/School'
import Questions from '../../components/Questions/Questions'
import Schedule from '../../components/Schedule/Schedule'


const StudentHome: React.FC = () => {
  
  return (
    <div>
      <Header />
      <div className="main-container">
        <Box className="content-wrapper">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="school" element={<CoursesDisplayed />} />
              <Route path="questions" element={<Questions />} />
              <Route path="schedule" element={<Schedule />} />

            </Routes>
          </div>
        </Box>
      </div>
    
  </div>  
    );
};

export default StudentHome