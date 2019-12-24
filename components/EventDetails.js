import React from 'react';
import { useDispatch } from 'react-redux';

import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import EmailIcon from 'mdi-material-ui/Email';
import CellphoneAndroidIcon from 'mdi-material-ui/CellphoneAndroid';
import DomainIcon from 'mdi-material-ui/Domain';
import FileDocumentIcon from 'mdi-material-ui/FileDocument';
import CalendarIcon from 'mdi-material-ui/Calendar';
import HumanMaleFemaleIcon from 'mdi-material-ui/HumanMaleFemale';
import CounterIcon from 'mdi-material-ui/Counter';
import PartyPopperIcon from 'mdi-material-ui/PartyPopper';
import PhoneIcon from 'mdi-material-ui/Phone';
import ClockOutlineIcon from 'mdi-material-ui/ClockOutline';
import CurrencyUsdIcon from 'mdi-material-ui/CurrencyUsd';
import MapMarkerIcon from 'mdi-material-ui/MapMarker';

import translations from '../translations/arabicTranslation';
import { changePackageType } from '../redux/actions/eventsActions';
import DialogTitle from './DialogTitle';

const useStyles = makeStyles({
  dialogeContent: {
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.3)',
      outline: '1px solid slategrey'
    }
  },
  image: {
    width: '100%',
    borderRadius: 10,
    display: 'block',
    margin: '25px auto',
    boxShadow: '7px 7px 10px 0px rgba(76,76,79,0.4)'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 25,
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  button: {
    marginRight: 15
  }
});

const EventDetails = ({ event, onClose, open, token }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const LIST_ITEMS = [
    { name: translations.COMPANY_ACTIVITY, value: event.companyActivityType, icon: <DomainIcon /> },
    { name: translations.CR_NUMBER, value: event.companyCrNumber, icon: <FileDocumentIcon /> },
    { name: translations.EVENT_TITLE, value: event.eventTitle, icon: <DomainIcon /> },
    { name: translations.EVENT_TYPE, value: event.eventType, icon: <PartyPopperIcon /> },
    {
      name: translations.EVENT_TARGET_GROUP,
      value: event.eventTargetGroup,
      icon: <HumanMaleFemaleIcon />
    },
    { name: translations.EMAIL, value: event.companyEmail, icon: <EmailIcon /> },
    {
      name: translations.MOBILE_NUMBER,
      value: event.contactNumber1,
      icon: <CellphoneAndroidIcon />
    },
    {
      name: translations.ANOTHER_CONTACT_NUMBER,
      value: event.contactNumber2,
      icon: <PhoneIcon />
    },
    { name: translations.EVENT_DATE, value: event.eventDate, icon: <CalendarIcon /> },
    { name: translations.FROM, value: event.eventStartTime, icon: <ClockOutlineIcon /> },
    { name: translations.TO, value: event.eventEndtTime, icon: <ClockOutlineIcon /> },
    {
      name: translations.NUMBER_OF_ORGANIZERS,
      value: event.eventOrganizerNumber,
      icon: <CounterIcon />
    },
    {
      name: translations.EVENT_REWARD,
      value: event.eventReward,
      icon: <CurrencyUsdIcon />
    },
    {
      name: translations.BRIEF_SUMMARY,
      value: event.eventSummary,
      icon: <FileDocumentIcon />
    }
  ];

  const renderLocation = () => {
    return (
      <Link
        href={`https://www.google.com/maps/search/?api=1&query=${event.lat},${event.lng}`}
        target="_blank"
      >
        <IconButton color="secondary" style={{ padding: 0 }}>
          <MapMarkerIcon />
        </IconButton>
      </Link>
    );
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
      <DialogTitle onClose={onClose} avatarImage={event.eventImage}>
        {event.companyName}
      </DialogTitle>
      <DialogContent dividers className={classes.dialogeContent}>
        <Grid container spacing={2}>
          <Grid item sm={4}>
            {event.eventImage && (
              <img src={event.eventImage} alt="Event" className={classes.image} />
            )}
            <div className={classes.buttonContainer}>
              {`${translations.PACKAGE_TYPE} : `}
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => dispatch(changePackageType(token, event.eventId, !event.isPremium))}
              >
                {event.isPremium ? translations.PREMIUM_PACKAGE : translations.BASIC_PACKAGE}
              </Button>
            </div>
          </Grid>
          <Grid item sm={8}>
            <List>
              {LIST_ITEMS.map(({ name, value, icon }) => (
                <ListItem key={name}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>
                    <Grid container spacing={2}>
                      <Grid item sm={6}>
                        {name}:
                      </Grid>
                      <Grid
                        item
                        sm={6}
                        dir={typeof value === 'string' && value.includes('+966') ? 'ltr' : 'rtl'}
                      >
                        {value}
                      </Grid>
                    </Grid>
                  </ListItemText>
                </ListItem>
              ))}
              <ListItem>
                <ListItemIcon>
                  <MapMarkerIcon />
                </ListItemIcon>
                <ListItemText>
                  <Grid container spacing={2}>
                    <Grid item sm={6}>
                      {translations.LOCATION}:
                    </Grid>
                    <Grid item sm={6}>
                      {renderLocation()}
                    </Grid>
                  </Grid>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetails;
