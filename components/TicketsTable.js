import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import translations from '../translations/arabicTranslation';
import { getUserTickets } from '../redux/actions/ticketsActions';

const TicketsTable = ({ tickets, userId, token }) => {
  const [currentTickets, setCurrentTickets] = useState(tickets.content);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tickets.size);
  const dispatch = useDispatch();

  const handleChangePage = async (_event, newPage) => {
    const userTickets = await dispatch(getUserTickets(token, userId, rowsPerPage, newPage));
    setCurrentTickets(userTickets.content);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async event => {
    setPage(0);
    const userTickets = await dispatch(getUserTickets(token, userId, +event.target.value));
    setCurrentTickets(userTickets.content);
    setRowsPerPage(+event.target.value);
  };

  return (
    <>
      <Table dir="rtl">
        <TableHead>
          <TableRow>
            <TableCell>{translations.TICKET_NUMBER}</TableCell>
            <TableCell>{translations.EVENT_NAME}</TableCell>
            <TableCell>{translations.EVENT_TYPE}</TableCell>
            <TableCell>{translations.EVENT_DATE}</TableCell>
            <TableCell>{translations.START_TIME}</TableCell>
            <TableCell>{translations.END_TIME}</TableCell>
            <TableCell>{translations.EVENT_REWARD}</TableCell>
            <TableCell>{translations.TICKET_VALIDITY}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {currentTickets.map(ticket => (
            <TableRow key={ticket.ticketNumber}>
              <TableCell>{ticket.ticketNumber}</TableCell>
              <TableCell>{ticket.name}</TableCell>
              <TableCell>{ticket.eventType}</TableCell>
              <TableCell>{ticket.date}</TableCell>
              <TableCell>{ticket.startTime}</TableCell>
              <TableCell>{ticket.endTime}</TableCell>
              <TableCell>{ticket.eventReward}</TableCell>
              <TableCell>{ticket.isCanceled ? translations.INVALID : translations.VALID}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={tickets.totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          translations.labelDisplayedRows({ from, to, count })
        }
        labelRowsPerPage={translations.ROWS_PER_PAGE}
      />
    </>
  );
};

export default TicketsTable;
