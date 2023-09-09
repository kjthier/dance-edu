import { useState } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import './schedule.css'

interface ScheduleProps {
    // Add any props you expect this component to receive
}

const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate()   // Day 0 is the last day in the previous month
}  

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]

const Schedule: React.FC<ScheduleProps> = () => {
  const [viewMode, setViewMode] = useState('week')
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() // JS months are zero-based
  const currentYear = currentDate.getFullYear()
  const currentDay = currentDate.getDate()

  // Generate days of the month
  const daysOfMonth = Array.from({ length: getDaysInMonth(currentMonth, currentYear) }, (_, i) => i + 1)

  // Generate time slots for calendar cells
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}:00 - ${i+1}:00`)

  return (
    <div className='schedule-container'>

        {/* toggle for day, week, and month views */}
        <div className='header-container'>

          {/* Title based on viewMode */}
          <h2>
            {viewMode === 'month' 
              ? `${monthNames[currentMonth]} ${currentYear}` 
              : viewMode === 'week' 
              ?`Week of ${monthNames[currentMonth]} ${currentDay}, ${currentYear}`
              :`${monthNames[currentMonth]} ${currentDay}, ${currentYear}`}
          </h2>

          {/* code to toggle between views */}
          <ToggleGroup.Root
            className='ToggleGroup'
            type='single'
            value={viewMode} 
            onValueChange={setViewMode}
          >
            <ToggleGroup.Item 
            className='ToggleGroupItem'  
            value='day' 
            aria-label='Day view'
          >
            Day
          </ToggleGroup.Item>
          <ToggleGroup.Item 
            className='ToggleGroupItem'  
            value='week' 
            aria-label='Week view'
          >
            Week
          </ToggleGroup.Item>
          <ToggleGroup.Item
            className='ToggleGroupItem'
            value='month'
            aria-label='Month view'
          >
            Month
          </ToggleGroup.Item>
        </ToggleGroup.Root>

      </div>

      {/* calendar grid */}
      <div className={`calendar-grid ${viewMode}`}>

        {viewMode === 'day' && timeSlots.map((timeSlot) => (
          <div key={timeSlot} className="day-cell cell-day-view">
            {timeSlot}
          </div>
        ))}
        {viewMode === 'week' && daysOfWeek.map((day) => (
          <div key={day} className="day-cell cell-week-view">
            {day}
          </div>
        ))}
        {viewMode === 'month' && daysOfMonth.map((day) => (
          <div key={day} className="day-cell cell-month-view">
            {day}
          </div>
        ))}
        
      </div>

    </div>
  )
}

export default Schedule
