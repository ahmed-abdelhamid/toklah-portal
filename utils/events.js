export const sortEvents = events => {
  return events.sort((a, b) => (a.isValid === b.isValid ? 0 : a.isValid ? 1 : -1));
};
