import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useForm } from '../../common/components/Form/useForm';
import './BecomeaPartner.scss';
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
function BecomeaPartner() {
  const initialFValues = {
    name: "",
    email: "",
    address: "",
    businessNumber: "",
    website: "",
    licenseNumber: "",
    yourName: "",
    yourNumber: ""
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
      <Grid container spacing={1} className='grid-overlay'>
        <Grid item sm className='ml-4 mb-4'>
          <div className='contact-form'>
            <Typography component="h4" className='align-self-start' variant="h4">
              Get Started
          </Typography>
            <form className={classes.form} onSubmit={loginUser} noValidate>
              <Typography component="h6" className='align-self-start' variant="h6">
                Merchant Information
            </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                id="name"
                value={values.name}
                label="Name"
                name="name"
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                id="address"
                value={values.address}
                label="Address"
                name="address"
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                id="email"
                value={values.email}
                label="Email"
                name="email"
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
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                id="website"
                value={values.website}
                label="Website"
                name="website"
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                id="licenseNumber"
                value={values.licenseNumber}
                label="License Number"
                name="licenseNumber"
                onChange={handleInputChange}
              />
              <Typography component="h6" className='align-self-start mt-1' variant="h6">
                Your Information
            </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                id="yourName"
                value={values.yourName}
                label="Name"
                name="yourName"
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="number"
                id="yourNumber"
                value={values.yourNumber}
                label="Phone Number"
                name="yourNumber"
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
          <Typography variant="h5" className='align-self-center mt-1 text-light p-4 bold' gutterBottom>
            Sell bulk directly to consumer<br /><br />
            Bring in income by selling
            whatever is left directly to the
            consumer before business close<br /><br />
            Reduce waste<br /><br />
            Convert unused inventory into
            cash
    </Typography>

        </Grid>
      </Grid>
      <CssBaseline />

    </div>
  );
}

BecomeaPartner.propTypes = {};

BecomeaPartner.defaultProps = {};

export default BecomeaPartner;
