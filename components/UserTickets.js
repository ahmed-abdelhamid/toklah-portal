import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from './DialogTitle';
import Loader from './Loader';
import TicketsTable from './TicketsTable';
import { getUserTickets, removeTickets } from '../redux/actions/ticketsActions';
import translations from '../translations/arabicTranslation';

const useStyles = makeStyles({
  textContent: {
    fontSize: '2em',
    fontWeight: 'bold',
    padding: 25
  }
});

const UserTickets = ({ onClose, open, userId, fullName, initials, token }) => {
  const classes = useStyles();
  const userTickets = useSelector(({ tickets }) => tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserTickets(token, userId));

    return () => dispatch(removeTickets());
  }, [dispatch, userId, token]);

  const renderContent = () => {
    if (!userTickets) {
      return <Loader />;
    }

    if (userTickets && userTickets.content.length === 0) {
      return (
        <Typography className={classes.textContent} align="center">
          {translations.NO_USER_TICKETS}
        </Typography>
      );
    }

    return <TicketsTable tickets={userTickets} userId={userId} token={token} />;
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="lg">
      <DialogTitle onClose={onClose} initials={initials}>
        {fullName}
      </DialogTitle>
      <DialogContent dividers>{renderContent()}</DialogContent>
    </Dialog>
  );
};

export default UserTickets;
