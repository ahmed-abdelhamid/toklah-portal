import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import nextCookie from 'next-cookies';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountCashIcon from 'mdi-material-ui/AccountCash';
import AccountHeartIcon from 'mdi-material-ui/AccountHeart';

import useStyles from '../styles/pageStyles';
import translations from '../translations/arabicTranslation';
import {
  getRegisteredEvents,
  getVolunteeredEvents,
  removeEvents
} from '../redux/actions/eventsActions';
import EventsTable from '../components/EventsTable';
import Loader from '../components/Loader';

const Events = ({ token }) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const events = useSelector(({ events }) => events);
  const dispatch = useDispatch();

  const findRelatedEvents = useCallback(
    async newValue => {
      setTabValue(newValue);

      switch (newValue) {
        case 1:
          dispatch(getVolunteeredEvents(token));
          break;
        case 0:
        default:
          dispatch(getRegisteredEvents(token));
      }
    },
    [dispatch, token]
  );

  useEffect(() => {
    findRelatedEvents(tabValue);
    return () => dispatch(removeEvents());
  }, [dispatch, tabValue, findRelatedEvents]);

  const renderContent = () => {
    if (!events) {
      return <Loader />;
    }

    if (events && events.length === 0) {
      return (
        <Paper className={classes.paper}>
          <Typography align="center" className={classes.info}>
            {translations.NO_EVENT_REQUESTS}
          </Typography>
        </Paper>
      );
    }

    return <EventsTable events={events} token={token} />;
  };

  return (
    <Container>
      <Typography variant="h1" align="center" className={classes.title}>
        {translations.EVENT_REQUESTS}
      </Typography>

      <Paper>
        <Tabs
          value={tabValue}
          onChange={(_event, newValue) => findRelatedEvents(newValue)}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<AccountCashIcon />} label={translations.ORGANIZE_REQUESTS} />
          <Tab icon={<AccountHeartIcon />} label={translations.VOLUNTEER_REQUESTS} />
        </Tabs>

        {renderContent()}
      </Paper>
    </Container>
  );
};

Events.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);
  return { token };
};

export default Events;
