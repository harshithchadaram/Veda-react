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
    <div className='d-flex bg-image w-100'>
      {
        false &&
        <Grid container spacing={1} className='grid-overlay'>
          <Grid item sm className='ml-4'>
            <div className='contact-form'>
              <Typography component="h4" className='align-self-start' variant="h4">
                Get Started
            </Typography>
              <form className={classes.form} onSubmit={loginUser} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="text"
                  id="restaurantName"
                  value={values.restaurantName}
                  label="Name"
                  name="restaurantName"
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="text"
                  id="restaurantAddress"
                  value={values.restaurantAddress}
                  label="Address"
                  name="restaurantAddress"
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="text"
                  id="bemail"
                  value={values.businessEmail}
                  label="Business Email"
                  name="businessEmail"
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="number"
                  id="businessNumber"
                  value={values.businessNumber}
                  label="Business Phone Number"
                  name="businessNumber"
                  onChange={handleInputChange}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Find
          </Button>
              </form>
            </div>
          </Grid>
          <Grid item sm className='d-flex'>
            {/* <Typography component="h6" className='align-self-start' variant="h6">
            Call Us
            </Typography> */}
            <Typography variant="body1" className='align-self-center mt-1 text-light' gutterBottom>
              Save loads of time on expensing<br />
            No receipts or headaches. Put everyone on one team account.<br />
            Arrange and pay for others’ rides<br />
            Coordinate easily from the web – even if riders don’t have a smartphone.<br />
            Increase foot traffic<br />
            Use vouchers to create marketing campaigns that bring people to your door.
      </Typography>

          </Grid>
        </Grid>}
      <CssBaseline />

    </div>

  );
}

FindaRestaurant.propTypes = {};

FindaRestaurant.defaultProps = {};

export default FindaRestaurant;
