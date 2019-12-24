import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import ForgetPassword from '../components/ForgetPassword';
import { useStyles } from '../styles/loginPage';
import { login } from '../redux/actions/authActions';
import Loader from '../components/Loader';
import translations from '../translations/arabicTranslation';

const validationSchema = Yup.object({
  mobileOrEmail: Yup.string('').required(translations.REQUIRED_FILED),
  password: Yup.string('').required(translations.REQUIRED_FILED)
});

const Login = ({
  values: { mobileOrEmail, password },
  errors,
  touched,
  handleSubmit,
  handleChange,
  isValid,
  setFieldTouched,
  isSubmitting,
  auth
}) => {
  const classes = useStyles();
  const [openForgetPassword, setOpenForgetPassword] = useState(false);

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  useEffect(() => {
    if (auth) Router.push('/clients');
  }, [auth]);

  if (auth) return <Loader title={translations.LOADING} />;

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <img src="/static/images/logo.png" alt="Company Logo" className={classes.logo} />
          <Typography component="h1" variant="h5">
            {translations.LOGIN}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              id="mobileOrEmail"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label={translations.EMAIL_OR_PHONE}
              name="mobileOrEmail"
              autoFocus
              helperText={touched.mobileOrEmail ? errors.mobileOrEmail : ''}
              error={touched.mobileOrEmail && !!errors.mobileOrEmail}
              value={mobileOrEmail}
              onChange={change.bind(null, 'mobileOrEmail')}
            />
            <TextField
              id="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={translations.PASSWORD}
              type="password"
              helperText={touched.password ? errors.password : ''}
              error={touched.password && !!errors.password}
              value={password}
              onChange={change.bind(null, 'password')}
            />
            {errors.credentials && (
              <Typography color="secondary" align="center">
                {errors.credentials}
              </Typography>
            )}
            <div className={classes.loadingWrapper}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!isValid || isSubmitting}
              >
                {translations.LOGIN}
              </Button>
              {isSubmitting && <CircularProgress size={24} className={classes.loading} />}
            </div>
          </form>
          <Link component="button" variant="body2" onClick={() => setOpenForgetPassword(true)}>
            {translations.FORGET_PASSWORD}
          </Link>
        </div>
      </Container>

      {openForgetPassword && (
        <ForgetPassword open={openForgetPassword} onClose={() => setOpenForgetPassword(false)} />
      )}
    </>
  );
};

const LoginWithFormik = withFormik({
  displayName: 'LoginForm',
  mapPropsToValues: () => ({ mobileOrEmail: '', password: '' }),
  validationSchema,
  handleSubmit: async ({ mobileOrEmail, password }, { setSubmitting, setFieldError, props }) => {
    try {
      await props.login(mobileOrEmail, password);
      Router.push('/users');
    } catch (e) {
      setFieldError('credentials', translations.CREDENTIALS_ERROR);
      setSubmitting(false);
    }
  }
})(Login);

const mapDispatchToProps = dispatch => ({
  login: (mobileOrEmail, password) => dispatch(login(mobileOrEmail, password))
});

export default connect(null, mapDispatchToProps)(LoginWithFormik);
