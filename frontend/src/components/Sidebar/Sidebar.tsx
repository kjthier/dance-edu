import React from 'react'
import { Link } from 'react-router-dom'
import { RowsIcon, Cross1Icon, GearIcon } from '@radix-ui/react-icons'
import './sidebar.css'

type SidebarProps = {
    userId: string
    isOpen: boolean
    toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ userId, isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button onClick={toggleSidebar} className='burger-icon'>
                {isOpen ? <Cross1Icon /> : <RowsIcon />}
            </button>

            {isOpen && (
                <nav>
                    <ul>
                        <li>
                            <Link to={`/student/${userId}/dashboard`}>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to={`/student/${userId}/school`}>Studio</Link>
                        </li>
                        <li>
                            <Link to={`/student/${userId}/schedule`}>
                                Schedule
                            </Link>
                        </li>
                        <li>
                            <Link to={`/student/${userId}/conditioning`}>
                                Conditioning
                            </Link>
                        </li>
                        <li>
                            <Link to={`/student/${userId}/wellness`}>
                                Wellness
                            </Link>
                        </li>
                        <li>
                            <Link to={`/student/${userId}/questions`}>
                                Questions
                            </Link>
                        </li>
                        <li>
                            <Link to={`/student/${userId}/forum`}>Forum</Link>
                        </li>
                        <li>
                            <Link to={`/student/${userId}/settings`}><GearIcon className='gear-icon'/></Link>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    )
}

export default Sidebar
