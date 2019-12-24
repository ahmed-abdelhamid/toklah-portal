import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500
  },
  title: {
    fontSize: 50,
    marginBottom: 25
  },
  info: {
    fontSize: '2em',
    paddingTop: 10
  },
  paper: {
    minHeight: '30vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
