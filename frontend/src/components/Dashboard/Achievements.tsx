import React from 'react'

const Achievements: React.FC = () => {
    // Mock achievements array
    const achievementsData = [
        {
            id: 2,
            icon: '🌟',
            title: 'YGAP Participant',
            date: 'Spring 2023',
            description: '',
        },
        {
            id: 1,
            icon: '🩰',
            title: 'Level 1 PBT Certification',
            date: '12-2022',
            description: '',
        },

        {
            id: 3,
            icon: '🏆',
            title: 'Award for Excellence in Choreography',
            date: '5-2022',
            description: '',
        },
    ]

    return (
        <div className='list-category'>
            <h3 className='dash-component-title'>Achievements</h3>
            <ul>
                {achievementsData.map((achievement) => (
                    <li key={achievement.id}>
                        <h5 className='dash-component-subheading'>
                            <span>{achievement.icon}</span> {achievement.title},{' '}
                            {achievement.date}
                        </h5>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Achievements
