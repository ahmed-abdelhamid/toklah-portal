import axios from 'axios';

export const getAllUsers = token => async dispatch => {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/admin/getallusers`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch({ type: 'GET_ALL_USERS', users: data });
  } catch (e) {}
};

export const removeAllUsers = () => ({ type: 'REMOVE_ALL_USERS' });
