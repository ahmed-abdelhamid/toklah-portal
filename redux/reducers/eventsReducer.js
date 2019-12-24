import { sortEvents } from '../../utils/events';

export default (state = null, action) => {
  let sortedEvents;
  switch (action.type) {
    case 'SAVE_ALL_EVENTS':
      sortedEvents = sortEvents(action.events);
      return sortedEvents;
    case 'UPDATE_EVENT':
      const oldEvents = state.filter(({ eventId }) => eventId !== action.event.eventId);
      sortedEvents = sortEvents([...oldEvents, action.event]);
      return sortedEvents;
    case 'REMOVE_ALL_EVENTS':
      return null;
    default:
      return state;
  }
};
