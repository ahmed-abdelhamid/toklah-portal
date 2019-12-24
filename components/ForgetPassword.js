import React, { useState } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import translations from '../translations/arabicTranslation';
import DialogTitle from './DialogTitle';
import { useStyles } from '../styles/loginPage';
import { forgetPassword } from '../utils/auth';

const validationSchema = Yup.object({
  email: Yup.string('')
    .email(translations.WRONG_EMAIL)
    .required(translations.REQUIRED_FILED)
});

const ForgetPassword = ({
  onClose,
  open,
  handleSubmit,
  errors,
  touched,
  values,
  handleChange,
  setFieldTouched,
  isSubmitting,
  isValid
}) => {
  const classes = useStyles();

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogTitle onClose={onClose}>{translations.RESET_PASSWORD}</DialogTitle>
      <DialogContent dividers>
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
            value={values.email}
            onChange={change.bind(null, 'email')}
          />
          {errors.wrongEmail && (
            <Typography color="secondary" align="center">
              {errors.wrongEmail}
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
              {translations.RESET_PASSWORD}
            </Button>
            {isSubmitting && <CircularProgress size={24} className={classes.loading} />}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default withFormik({
  displayName: 'ForgtePasswordForm',
  mapPropsToValues: () => ({ email: '' }),
  validationSchema,
  handleSubmit: async ({ email }, { setSubmitting, setFieldError }) => {
    try {
      await forgetPassword(email);
      setSubmitting(false);
    } catch (e) {
      setFieldError('wrongEmail', translations.WRONG_EMAIL);
      setSubmitting(false);
    }
  }
})(ForgetPassword);
