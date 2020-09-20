import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../common/components/store/AuthContext';
import { useForm } from '../../common/components/Form/useForm';
import Typography from '@material-ui/core/Typography';
import Controls from "../../common/components/Form/controls/Controls";
import './ContactUs.scss';
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
const AuthContext = React.createContext({});
export const AuthProvider = AuthContext.Provider;
export default function ContactUs(props) {
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
  const appContext = useContext(AppContext);

  const itemTypes = [
    { id: "merchant", title: "Merchant" },
    { id: "user", title: "User" }
  ];

  const {
    values,
    setValues,
    handleInputChange,
  } = useForm(initialFValues, true);
  const alertInfo = {
    success: false,
    severity: "",
    message: ""
  }
  const history = useHistory();
  const loginUser = (event) => {

  }
  return (
    <AppContext.Consumer >
      {() => (
        <Container component="main" maxWidth="xl" className='bg-image p-0'>
          <Grid container className='grid-overlay'>
            <Grid item sm className='ml-4'>
              <div className='contact-form'>
                <Typography component="h4" className='align-self-start' variant="h4">
                  Contact sales
            </Typography>
                <Typography variant="body2" className='align-self-start mt-1 text-secondary' display="block" gutterBottom>
                  Please fill out this form to discuss your needs with our sales team. For technical support, visit the Support Hub.
      </Typography>
                <form className={classes.form} onSubmit={loginUser} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="text"
                    id="firstName"
                    value={values.firstName}
                    label="First Name"
                    name="firstName"
                    onChange={handleInputChange}
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="text"
                    id="lastName"
                    value={values.lastName}
                    label="Last Name"
                    name="lastName"
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
                  <Controls.RadioGroup
                    name="type"

                    value={values.type}
                    onChange={handleInputChange}
                    items={itemTypes}
                  />
                  <Controls.TextArea
                    label="Write your query"
                    name="query"
                    value={values.query}
                    onChange={handleInputChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Submit
          </Button>
                </form>
              </div>
            </Grid>
            <Grid item sm className='d-flex'>
              <Typography variant="h5" className='align-self-center mt-1 text-light p-4 bold' gutterBottom>
                Call Us<br />
                Give our Booky sales team a call at: 00 08000 330 025<br /> Monday—Friday, 10 AM—6 PM IT
            </Typography>
            </Grid>
          </Grid>
          <CssBaseline />

        </Container>
      )
      }
    </AppContext.Consumer >
  );
}