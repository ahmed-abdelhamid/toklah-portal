import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    position: 'fixed',
    zIndex: 10000,
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }
});
