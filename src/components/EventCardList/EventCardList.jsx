import EventCard from '../EventCard/EventCard';
import events from '../../data/event.js';

function EventCardList() {
  return (
    <div className="flex flex-row flex-wrap gap-5 my-8 justify-center">
      {events.map((event) => (
        <EventCard key={event.id} title={event.title} description={event.description} photo={event.photo} />
      ))}
    </div>
  );
}
export default EventCardList;