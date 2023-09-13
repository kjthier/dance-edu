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
                    <li><Link to={`/student/${userId}/dashboard`}>Dashboard</Link></li>
                    <li><Link to={`/student/${userId}/school`}>School</Link></li>
                    <li><Link to={`/student/${userId}/schedule`}>Schedule</Link></li>
                    <li><Link to={`/student/${userId}/progress`}>Progress</Link></li>
                    <li><Link to={`/student/${userId}/questions`}>Questions</Link></li>
                    <li><Link to={`/student/${userId}/about`}>About</Link></li>
                    <li><Link to={`/student/${userId}/contact`}>Contact</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
