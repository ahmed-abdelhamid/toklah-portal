import React, { useState } from 'react';
import { connect } from 'react-redux';
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
import { changePassword } from '../utils/auth';

const validationSchema = Yup.object({
  oldPassword: Yup.string('').required(translations.REQUIRED_FILED),
  newPassword: Yup.string('').required(translations.REQUIRED_FILED)
});

const ChangePassword = ({
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
      <DialogTitle onClose={onClose}>{translations.CHANGE_PASSWORD}</DialogTitle>
      <DialogContent dividers>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="oldPassword"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={translations.OLD_PASSWORD}
            name="oldPassword"
            helperText={touched.oldPassword ? errors.oldPassword : ''}
            error={touched.oldPassword && !!errors.oldPassword}
            value={values.oldPassword}
            onChange={change.bind(null, 'oldPassword')}
          />
          <TextField
            id="newPassword"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={translations.NEW_PASSWORD}
            name="newPassword"
            helperText={touched.newPassword ? errors.newPassword : ''}
            error={touched.newPassword && !!errors.newPassword}
            value={values.newPassword}
            onChange={change.bind(null, 'newPassword')}
          />
          {errors.wrongOldPassword && (
            <Typography color="secondary" align="center">
              {errors.wrongOldPassword}
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
              {translations.CHANGE_PASSWORD}
            </Button>
            {isSubmitting && <CircularProgress size={24} className={classes.loading} />}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ChangePasswordWithFormik = withFormik({
  displayName: 'changePasswordForm',
  mapPropsToValues: () => ({ oldPassword: '', newPassword: '' }),
  validationSchema,
  handleSubmit: async ({ oldPassword, newPassword }, { setSubmitting, setFieldError, props }) => {
    try {
      await changePassword(props.token, props.adminId, newPassword, oldPassword);
      setSubmitting(false);
    } catch (e) {
      setFieldError('wrongOldPassword', translations.WRONG_OLD_PASSWORD);
      setSubmitting(false);
    }
  }
})(ChangePassword);

const mapStateToProps = ({ auth }) => ({ adminId: auth.adminId });

export default connect(mapStateToProps)(ChangePasswordWithFormik);
