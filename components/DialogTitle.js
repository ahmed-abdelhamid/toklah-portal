import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from 'mdi-material-ui/Close';
import ClipboardTextIcon from 'mdi-material-ui/ClipboardText';

const useStyles = makeStyles(theme => ({
  title: {
    // textAlign: 'center',
    marginLeft: theme.spacing(5)
  },
  avatar: {
    position: 'absolute',
    left: theme.spacing(1),
    top: 12,
    backgroundColor: '#686A70'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

const DialogTitle = ({ children, onClose, avatarImage, initials }) => {
  const classes = useStyles();

  return (
    <MuiDialogTitle className={classes.title}>
      {avatarImage && <Avatar alt="Avatar" src={avatarImage} className={classes.avatar} />}
      {!avatarImage && initials && (
        <Avatar className={classes.avatar}>{initials.toUpperCase()}</Avatar>
      )}
      {!avatarImage && !initials && (
        <Avatar className={classes.avatar}>
          <ClipboardTextIcon />
        </Avatar>
      )}
      {children}
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
};

export default DialogTitle;
