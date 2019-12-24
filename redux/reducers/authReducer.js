export default (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.admin;
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
