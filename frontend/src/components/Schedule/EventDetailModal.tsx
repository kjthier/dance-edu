import * as Dialog from '@radix-ui/react-dialog'
import { IEvent } from '../../types/ICourse'
import './schedule.css'

// Define prop types for this component
interface EventDetailModalProps {
  event: IEvent
  onClose: () => void
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {

  return (
    <Dialog.Root>
      
      <Dialog.Content>
        <h2>Event Details</h2>
        <p><strong>Title:</strong> {event.title}</p>

        <Dialog.Close onClick={onClose}>Close</Dialog.Close>
      </Dialog.Content>

    </Dialog.Root>
  )
}

export default EventDetailModal