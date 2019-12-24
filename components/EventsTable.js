import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import EventsTableButtons from './EventsTableButtons';
import translations from '../translations/arabicTranslation';

const ClientsTable = ({ events, token }) => {
  return (
    <Table dir="rtl">
      <TableHead>
        <TableRow>
          <TableCell>{translations.COMPANY_NAME}</TableCell>
          <TableCell>{translations.COMPANY_ACTIVITY}</TableCell>
          <TableCell>{translations.EVENT_TITLE}</TableCell>
          <TableCell>{translations.EVENT_TYPE}</TableCell>
          <TableCell>{translations.EVENT_TARGET_GROUP}</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {events.map(event => (
          <TableRow key={event.eventId}>
            <TableCell>{event.companyName}</TableCell>
            <TableCell>{event.companyActivityType}</TableCell>
            <TableCell>{event.eventTitle}</TableCell>
            <TableCell>{event.eventType}</TableCell>
            <TableCell>{event.eventTargetGroup}</TableCell>
            <TableCell align="center">
              <EventsTableButtons event={event} token={token} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientsTable;
