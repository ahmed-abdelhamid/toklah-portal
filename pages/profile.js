import React, { useState, useEffect } from 'react';
import nextCookie from 'next-cookies';
import Router from 'next/router';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import ChangePassword from '../components/ChangePassword';
import { editAccount } from '../redux/actions/authActions';
import translations from '../translations/arabicTranslation';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  email: Yup.string().required(translations.REQUIRED_FILED),
  mobile: Yup.string()
    .matches(phoneRegExp, translations.ENTER_MOBILE)
    .required(translations.REQUIRED_FILED)
});

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 50,
    marginBottom: 25
  },
  formContainer: {
    width: '40%'
  },
  loadingWrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  loading: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    color: '#757575'
  },
  changePassword: {
    width: '100%',
    textAlign: 'center'
  }
}));

const Profile = ({
  values: { email, mobile },
  errors,
  touched,
  handleSubmit,
  handleChange,
  isValid,
  setFieldTouched,
  isSubmitting,
  token
}) => {
  const classes = useStyles();
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <>
      <Container>
        <Typography variant="h1" align="center" className={classes.title}>
          {translations.MY_PROFILE}
        </Typography>
        <div className={classes.formContainer}>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label={translations.EMAIL}
              name="email"
              helperText={touched.email ? errors.email : ''}
              error={touched.email && !!errors.email}
              value={email}
              onChange={change.bind(null, 'email')}
            />
            <TextField
              id="mobile"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              name="mobile"
              label={translations.MOBILE_NUMBER}
              helperText={touched.mobile ? errors.mobile : ''}
              error={touched.mobile && !!errors.mobile}
              value={mobile}
              onChange={change.bind(null, 'mobile')}
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
                {translations.SAVE}
              </Button>
              {isSubmitting && <CircularProgress size={24} className={classes.loading} />}
            </div>
          </form>
          <Link
            className={classes.changePassword}
            component="button"
            variant="body2"
            onClick={() => setOpenChangePassword(true)}
          >
            {translations.CHANGE_PASSWORD}
          </Link>
        </div>
      </Container>

      {openChangePassword && (
        <ChangePassword
          open={openChangePassword}
          onClose={() => setOpenChangePassword(false)}
          token={token}
        />
      )}
    </>
  );
};

Profile.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);
  return { token };
};

const ProfileWithFormik = withFormik({
  displayName: 'LoginForm',
  mapPropsToValues: ({ admin }) => ({ email: admin.email, mobile: admin.mobile }),
  validationSchema,
  handleSubmit: async ({ email, mobile }, { setSubmitting, setFieldError, props }) => {
    try {
      await props.editAccount(props.token, props.admin.adminId, { email, mobile });
      Router.push('/profile');
    } catch (e) {
      setFieldError('credentials', translations.SOMETHING_WRONG);
    }
    setSubmitting(false);
  }
})(Profile);

const mapDispatchToProps = dispatch => ({
  editAccount: (token, id, admin) => dispatch(editAccount(token, id, admin))
});

const mapStateToProps = ({ auth }) => ({ admin: auth });

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWithFormik);
