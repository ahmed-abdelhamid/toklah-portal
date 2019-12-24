export default (state = null, action) => {
  switch (action.type) {
    case 'GET_USER_TICKETS':
      return action.payload;
    case 'REMOVE_TICKETS':
      return null;
    default:
      return state;
  }
};
