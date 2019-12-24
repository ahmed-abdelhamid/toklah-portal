import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    margin: theme.spacing(2),
    width: '70%',
    height: '30%',
    borderRadius: '10px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  loadingWrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  loading: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    color: '#757575'
  }
}));
