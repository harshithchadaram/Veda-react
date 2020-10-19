import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useForm } from '../../common/components/Form/useForm';
import './FindaRestaurant.scss';
const useStyles = makeStyles((theme) => ({

  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function FindaRestaurant() {
  const initialFValues = {
    firstName: "",
    lastName: "",
    businessEmail: "",
    businessNumber: "",
    restaurantName: "",
    restaurantAddress: "",
    query: ""
  };
  const classes = useStyles();
  const loginUser = (event) => {

  }

  const {
    values,
    setValues,
    handleInputChange,
  } = useForm(initialFValues, true);
  return (
    <div className='d-flex flex-column text-center aboutus-overlay justify-content-center h-100vh bg-image-about-us'>
      <div className='overlay h-100vh op-5'></div>
      <div style={{ zIndex: 2, padding: 50 }}>
        <Typography variant="h3" className='bhooky-semibold text-light '>
          Coming soon...
    </Typography>

      </div>
    </div>
  );
}

FindaRestaurant.propTypes = {};

FindaRestaurant.defaultProps = {};

export default FindaRestaurant;
