import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from '../styles/loader';

const Loader = ({ title }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loader;
