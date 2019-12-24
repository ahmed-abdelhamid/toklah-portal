import React from 'react';
import translations from '../translations/arabicTranslation';
import AccountGroupIcon from 'mdi-material-ui/AccountGroup';
import PartyPopperIcon from 'mdi-material-ui/PartyPopper';
import AccountIcon from 'mdi-material-ui/Account';

export const MENU_TABS = [
  { text: translations.USERS, icon: <AccountGroupIcon />, link: '/users' },
  { text: translations.EVENT_REQUESTS, icon: <PartyPopperIcon />, link: '/events' },
  { text: translations.MY_PROFILE, icon: <AccountIcon />, link: '/profile' }
];
