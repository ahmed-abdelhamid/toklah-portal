import axios from 'axios';

const saveEvents = events => ({ type: 'SAVE_ALL_EVENTS', events });

export const getRegisteredEvents = token => async dispatch => {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/admin/getregevents`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch(saveEvents(data));
  } catch (e) {}
};

export const getVolunteeredEvents = token => async dispatch => {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/admin/getvolunteerevents`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch(saveEvents(data));
  } catch (e) {}
};

export const acceptEvent = (token, eventId) => async dispatch => {
  try {
    const { data } = await axios.put(
      `${process.env.API_URL}/admin/${eventId}/acceptEventRequest/${true}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    dispatch({ type: 'UPDATE_EVENT', event: data });
  } catch (e) {}
};

export const changePackageType = (token, eventId, packageType) => async dispatch => {
  console.log(token);
  try {
    const { data } = await axios.put(
      `${process.env.API_URL}/admin/${eventId}/changeeventtype/${packageType}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    dispatch({ type: 'UPDATE_EVENT', event: data });
  } catch (e) {
    console.log(e.message);
  }
};

export const removeEvents = () => ({ type: 'REMOVE_ALL_EVENTS' });
