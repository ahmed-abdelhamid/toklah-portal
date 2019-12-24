import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import UsersTableButtons from './UsersTableButtons';
import translations from '../translations/arabicTranslation';

const UsersTable = ({ users, token }) => {
  return (
    <Table dir="rtl">
      <TableHead>
        <TableRow>
          <TableCell>{translations.NAME}</TableCell>
          <TableCell>{translations.EMAIL}</TableCell>
          <TableCell>{translations.MOBILE_NUMBER}</TableCell>
          <TableCell>{translations.BIRTHDATE}</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {users.map(user => (
          <TableRow key={user.userId}>
            <TableCell>{`${user.firstName} ${user.fatherName} ${user.grandFatherName} ${user.lastName}`}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell dir="ltr">{`${user.countryKey} ${user.mobileNumber}`}</TableCell>
            <TableCell>{user.birthDate}</TableCell>
            <TableCell align="center">
              <UsersTableButtons user={user} token={token} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
