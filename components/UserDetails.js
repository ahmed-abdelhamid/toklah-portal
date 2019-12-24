import React from 'react';

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
import FileDocumentIcon from 'mdi-material-ui/FileDocument';
import PencilIcon from 'mdi-material-ui/Pencil';
import CalendarIcon from 'mdi-material-ui/Calendar';
import HumanMaleFemaleIcon from 'mdi-material-ui/HumanMaleFemale';
import WorkerIcon from 'mdi-material-ui/Worker';
import SchoolIcon from 'mdi-material-ui/School';
import TshirtCrewIcon from 'mdi-material-ui/TshirtCrew';
import BankIcon from 'mdi-material-ui/Bank';
import AccountStartIcon from 'mdi-material-ui/AccountStar';
import CounterIcon from 'mdi-material-ui/Counter';

import translations from '../translations/arabicTranslation';
import DialogTitle from './DialogTitle';

const useStyles = makeStyles({
  dialogeContent: {
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.3)',
      outline: '1px solid slategrey',
    },
  },
  image: {
    width: '100%',
    borderRadius: 10,
    display: 'block',
    margin: '25px auto',
    boxShadow: '7px 7px 10px 0px rgba(76,76,79,0.4)',
  },
});

const UserDetails = ({ user, onClose, open }) => {
  console.log(user);
  const classes = useStyles();
  const fullName = `${user.firstName} ${user.fatherName} ${user.grandFatherName} ${user.lastName}`;
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  const mobile = `${user.countryKey} ${user.mobileNumber}`;
  const LIST_ITEMS = [
    { name: translations.EMAIL, value: user.email, icon: <EmailIcon /> },
    { name: translations.MOBILE_NUMBER, value: mobile, icon: <CellphoneAndroidIcon /> },
    { name: translations.BIRTHDATE, value: user.birthDate, icon: <CalendarIcon /> },
    { name: translations.GENDER, value: user.gender, icon: <HumanMaleFemaleIcon /> },
    { name: translations.OCCUPATION, value: user.occupation, icon: <WorkerIcon /> },
    { name: translations.SPECIALIZATION, value: user.specialization, icon: <WorkerIcon /> },
    { name: translations.EDUCATION_LEVEL, value: user.educationalLevel, icon: <SchoolIcon /> },
    { name: translations.T_SHIRT_SIZE, value: user.t_shirtSize, icon: <TshirtCrewIcon /> },
    { name: translations.IBAN_NUMBER, value: user.ibanNumber, icon: <BankIcon /> },
    { name: translations.LANGUAGES, value: user.language, icon: <PencilIcon /> },
    { name: translations.SKILLS, value: user.skill, icon: <AccountStartIcon /> },
    { name: translations.TALK_ABOUT_YOURSELF, value: user.aboutMe, icon: <FileDocumentIcon /> },
    {
      name: translations.HOW_MANY_ORGANIZED,
      value: user.organizingEventNumber,
      icon: <CounterIcon />,
    },
    {
      name: translations.HOW_MANY_VOLUNTEERED,
      value: user.volunteeringEventNumber,
      icon: <CounterIcon />,
    },
  ];

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
      <DialogTitle onClose={onClose} avatarImage={user.userImage} initials={initials}>
        {fullName}
      </DialogTitle>
      <DialogContent dividers className={classes.dialogeContent}>
        <Grid container spacing={2}>
          {user.userImage && (
            <Grid item sm={4}>
              <img src={user.userImage} alt="Profile" className={classes.image} />
            </Grid>
          )}
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
                      <Grid item sm={6} dir={typeof value === 'string' && value.includes('+966') ? 'ltr' : 'rtl'}>
                        {value}
                      </Grid>
                    </Grid>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetails;
