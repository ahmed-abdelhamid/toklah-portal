export default (state = null, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return action.users;
    case 'REMOVE_ALL_USERS':
      return null;
    default:
      return state;
  }
};
