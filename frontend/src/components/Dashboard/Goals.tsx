import React, { useState, useEffect } from 'react'

const Goals: React.FC = () => {
    const [weeklyGoal, setWeeklyGoal] = useState<string>('')
    const [monthlyGoal, setMonthlyGoal] = useState<string>('')
    const [actions, setActions] = useState<string>('')

    useEffect(() => {
        const savedWeeklyGoal = localStorage.getItem('weeklyGoal')
        const savedMonthlyGoal = localStorage.getItem('monthlyGoal')
        const savedActions = localStorage.getItem('actions')

        if (savedWeeklyGoal) setWeeklyGoal(savedWeeklyGoal)
        if (savedMonthlyGoal) setMonthlyGoal(savedMonthlyGoal)
        if (savedActions) setActions(savedActions)
    }, [])

    useEffect(() => {
        localStorage.setItem('weeklyGoal', weeklyGoal)
        localStorage.setItem('monthlyGoal', monthlyGoal)
        localStorage.setItem('actions', actions)
    }, [weeklyGoal, monthlyGoal, actions])

    return (
        <div>
            <h3 className='dash-component-title'>Your Goals</h3>
            <div>
                <h4 className='dash-component-subheading'>Goal this week:</h4>
                <textarea
                    value={weeklyGoal}
                    onChange={(e) => setWeeklyGoal(e.target.value)}
                    placeholder="What's your goal for this week?"
                />
            </div>

            <div>
                <h4 className='dash-component-subheading'>
                    Goal this month:
                </h4>
                <textarea
                    value={monthlyGoal}
                    onChange={(e) => setMonthlyGoal(e.target.value)}
                    placeholder="What's your goal for this month?"
                />
            </div>

            <div>
                <h4 className='dash-component-subheading'>
                    Actions:
                </h4>
                <textarea
                className='actions-textarea'
                    value={actions}
                    onChange={(e) => setActions(e.target.value)}
                    placeholder='Write 1-3 actions towards achieving your goals.'
                />
            </div>
        </div>
    )
}

export default Goals
