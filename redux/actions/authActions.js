import axios from 'axios';
import cookie from 'js-cookie';

const saveAdminData = admin => ({ type: 'LOGIN', admin });

export const login = (mobileOrEmail, password) => async dispatch => {
  try {
    const { data } = await axios.post(`${process.env.API_URL}/admin/login`, {
      mobileOrEmail,
      password
    });

    const { adminId, email, mobile, token } = data;
    cookie.set('token', token, { expires: 1 });

    dispatch(saveAdminData({ adminId, email, mobile }));
  } catch (e) {
    throw new Error(e);
  }
};

export const getAdmin = token => async dispatch => {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/admin/getprofile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const { adminId, email, mobile } = data;
    dispatch(saveAdminData({ adminId, email, mobile }));
  } catch (e) {
    throw new Error('Not Authorized');
  }
};

export const logout = () => {
  cookie.remove('token');
  // To support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  return { type: 'LOGOUT' };
};

export const editAccount = (token, id, admin) => async dispatch => {
  try {
    const { data } = await axios.put(
      `${process.env.API_URL}/admin/${id}/editAdmin`,
      { email: admin.email, mobile: admin.mobile },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { adminId, email, mobile, token: newToken } = data;
    cookie.set('token', newToken, { expires: 1 });
    dispatch(saveAdminData({ adminId, email, mobile }));
  } catch (e) {
    throw new Error(e);
  }
};
