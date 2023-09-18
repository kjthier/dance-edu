import React, { useState, useEffect } from 'react'
import { TextArea } from '@radix-ui/themes'

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
            <h2 className='dash-component-title'>Your Goals</h2>
            <div>
                <h3 className='dash-component-subheading'>This Week's Goal</h3>
                <TextArea
                    className='textarea'
                    value={weeklyGoal}
                    onChange={(e) => setWeeklyGoal(e.target.value)}
                    placeholder="What's your goal for this week?"
                />
            </div>

            <div>
                <h3 className='dash-component-subheading'>This Month's Goal</h3>
                <TextArea
                    className='textarea'
                    value={monthlyGoal}
                    onChange={(e) => setMonthlyGoal(e.target.value)}
                    placeholder="What's your goal for this month?"
                />
            </div>

            <div>
                <h3 className='dash-component-subheading'>
                    Actions Towards Goals
                </h3>
                <TextArea
                    className='textarea'
                    value={actions}
                    onChange={(e) => setActions(e.target.value)}
                    placeholder='Write 1-3 actions towards achieving your goals.'
                />
            </div>
        </div>
    )
}

export default Goals
