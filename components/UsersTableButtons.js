import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import translations from '../translations/arabicTranslation';
import UserDetails from './UserDetails';
import UserTickets from './UserTickets';

const UsersTableButtons = ({ user, token }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [openUserTickets, setOpenUserTickets] = useState(false);
  const { firstName, fatherName, grandFatherName, lastName } = user;
  const fullName = `${firstName} ${fatherName} ${grandFatherName} ${lastName}`;
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return (
    <>
      <Button color="primary" onClick={() => setOpenUserTickets(true)}>
        {translations.SHOW_TICKETS}
      </Button>
      <Button color="primary" onClick={() => setOpenDetails(true)}>
        {translations.SHOW_DETAILS}
      </Button>

      {openUserTickets && (
        <UserTickets
          open={openUserTickets}
          onClose={() => setOpenUserTickets(false)}
          userId={user.userId}
          fullName={fullName}
          initials={initials}
          token={token}
        />
      )}

      {openDetails && (
        <UserDetails open={openDetails} onClose={() => setOpenDetails(false)} user={user} />
      )}
    </>
  );
};

export default UsersTableButtons;
