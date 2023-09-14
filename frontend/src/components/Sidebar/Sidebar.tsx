import { Link } from 'react-router-dom'
import './Sidebar.css'

type SidebarProps = {
    userId: string
}

const Sidebar: React.FC<SidebarProps> = ({ userId }) => {
    return (
        <div className='sidebar'>
            <nav>
                <ul>
                    <li>
                        <Link to={`/student/${userId}/dashboard`}>Dashboard</Link>
                    </li>
                    <li>
                        <Link to={`/student/${userId}/school`}>School</Link>
                    </li>
                    <li>
                        <Link to={`/student/${userId}/schedule`}>Schedule</Link>
                    </li>
                    <li>
                        <Link to={`/student/${userId}/progress`}>Progress</Link>
                    </li>
                    <li>
                        <Link to={`/student/${userId}/conditioning`}>Conditioning</Link>
                    </li>
                    <li>
                        <Link to={`/student/${userId}/wellness`}>Wellness</Link>
                    </li>
                    <li>
                        <Link to={`/student/${userId}/questions`}>Questions</Link>
                    </li>
                    <li>
                        <Link to={`/student/forum`}>Forum</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
