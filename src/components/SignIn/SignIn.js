import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../api/axios';
import AppContext from '../../common/components/store/AuthContext';
import { useForm } from '../../common/components/Form/useForm';
import GoogleBtn from '../../common/components/GoogleButton';
import FacebookButton from '../../common/components/FacebookButton';
import { useGoogleLogin } from 'react-google-login'
import MuiPhoneNumber from "material-ui-phone-number";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const responseGoogle = (response) => {
  console.log(response);
}

const AuthContext = React.createContext({});
export const AuthProvider = AuthContext.Provider;
export default function SignIn(props) {
  const initialFValues = {
    mobile: "",
    password: ""
  };

  const { globalState, globalDispatch } = useContext(AppContext);
  // const { isSignedIn } = useGoogleLogin();
  // console.log(isSignedIn);
  const classes = useStyles();
  const appContext = useContext(AppContext);
  const onSuccessfulGoogleLogin = (response) => {

    console.log(response);
    window.localStorage.setItem('accessToken', response.accessToken);
    window.localStorage.setItem('profileObj', JSON.stringify(response.profileObj));
    globalDispatch({ type: "LOGIN" })
    history.push('/restaurants');
  }
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
        <Container component="main" maxWidth="xs" className='mt-5'>
          <CssBaseline />
          <div className={classes.paper}>
            {/* <Typography component="h1" variant="h5">
              Merchant Sign in
        </Typography> */}
            <form className={classes.form} onSubmit={loginUser} noValidate>
              <MuiPhoneNumber
                defaultCountry='us'
                onlyCountries={['in', 'us']}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="mobile"
                value={values.mobile}
                placeholder='Phone Number'
                label="Mobile"
                name="mobile"
                autoComplete="mobile"
                countryCodeEditable={false}
                onChange={event => handleInputChange({ target: { name: 'mobile', value: event } })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={values.password}
                onChange={handleInputChange}
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
          </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
              </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <div className='d-flex mt-4 justify-content-between'>
                <GoogleBtn className='w-100' handleLogin={onSuccessfulGoogleLogin} />
                <FacebookButton />
              </div> */}

            </form>
          </div>
        </Container>
      )}
    </AppContext.Consumer>
  );
}