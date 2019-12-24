import axios from 'axios';

export const getUserTickets = (token, userId, pageSize = 5, pageNumber = 0) => async dispatch => {
  try {
    const {
      data
    } = await axios.get(
      `${process.env.API_URL}/admin/${userId}/getAllTickets?size=${pageSize}&page=${pageNumber}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({ type: 'GET_USER_TICKETS', payload: data });

    return data;
  } catch (e) {}
};

export const removeTickets = () => ({ type: 'REMOVE_TICKETS' });
