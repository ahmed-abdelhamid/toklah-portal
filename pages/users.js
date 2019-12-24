import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import nextCookie from 'next-cookies';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Loader from '../components/Loader';

import useStyles from '../styles/pageStyles';
import translations from '../translations/arabicTranslation';
import { removeAllUsers, getAllUsers } from '../redux/actions/usersActions';
import UsersTable from '../components/UsersTable';

const Users = ({ token }) => {
  const classes = useStyles();
  const users = useSelector(({ users }) => users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers(token));

    return () => dispatch(removeAllUsers());
  }, [dispatch, token]);

  const Heading = () => (
    <Typography variant="h1" align="center" className={classes.title}>
      {translations.USERS}
    </Typography>
  );

  if (!users) {
    return (
      <>
        <Heading />
        <Loader />
      </>
    );
  }

  if (users && users.length === 0) {
    return (
      <>
        <Heading />
        <Paper className={classes.paper}>
          <Typography className={classes.info} align="center" gutterBottom>
            {translations.NO_USERS_AVAILABLE}
          </Typography>
        </Paper>
      </>
    );
  }

  return (
    <Container>
      <Heading />
      <Paper>
        <UsersTable users={users} token={token} />
      </Paper>
    </Container>
  );
};

Users.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);
  return { token };
};

export default Users;
