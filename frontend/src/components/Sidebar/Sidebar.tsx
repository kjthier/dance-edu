import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className='sidebar'>
      <nav>
        <ul>
          <li><Link to="dashboard">Dashboard</Link></li>
          <li><Link to="school">School</Link></li>
          <li><Link to="schedule">Schedule</Link></li>
          <li><Link to="progress">Progress</Link></li>
          <li><Link to="questions">Questions</Link></li>
          <li><Link to="about">About</Link></li>
          <li><Link to="contact">Contact</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
