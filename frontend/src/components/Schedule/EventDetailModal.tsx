import * as Dialog from '@radix-ui/react-dialog'
import { IEvent } from '../../types/ICourse'

// Define prop types for this component
interface EventDetailModalProps {
  event: IEvent
  onClose: () => void
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {

  return (
    <Dialog.Root>
      
      <Dialog.Content style={{border: '1px solid black', backgroundColor: 'white', zIndex: 1000}}>
        <h2>Event Details</h2>
        <p><strong>Title:</strong> {event.title}</p>

        <Dialog.Close onClick={onClose}>Close</Dialog.Close>
      </Dialog.Content>

    </Dialog.Root>
  )
}

export default EventDetailModal