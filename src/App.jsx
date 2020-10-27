import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createMuiTheme, createStyles, makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import axios from './api/axios';
import "./App.scss";
import { AppProvider } from "./common/components/store/AuthContext";
import Header from "./common/components/Header/Header";
import BhookyUserHome from "./components/BhookyUserHome/BhookyUserHome";
import Home from "./components/Home/Home";
import BecomeaPartner from "./components/BecomeaPartner/BecomeaPartner";
import AboutUs from "./components/AboutUs/AboutUs";
import FindaRestaurant from "./components/FindaRestaurant/FindaRestaurant";
import ContactUs from "./components/ContactUs/ContactUs";
import SignIn from "./components/SignIn/SignIn";
import Footer from "./common/components/Footer/footer";
import { Container } from "@material-ui/core";
import { PrivateRoute } from "./common/components/auth/PrivateRoute";
import RestaurantCheckout from "./components/RestaurantCheckOut/RestaurantCheckOut";
import Profile from "./components/Profile/Profile";
import { Provider } from "react-redux";
import store from "./common/components/redux/store";
import PrivacyStatement from "./components/PrivacyStatement/PrivacyStatement";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import Reviews from "./components/reviews/Reviews";
import * as _ from 'lodash';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#5c5c5c",
    },
  },
});

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

class App extends React.Component {
  state = {
    snackBarProps: { open: false, vertical: 'bottom', horizontal: 'left', autoHideDuration: 30, message: '', severity: '' },
    showBackdrop: false,
    merchantInfo: JSON.parse(localStorage.getItem("merchantInfo")),
    authToken: localStorage.getItem("accessToken")
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    axios.interceptors.request.use((config) => {
      // debugger;
      // if (!_.isEqual(config.url, 'product/data')) {
      this.setState({ showBackdrop: true });
      // }
      return config;
    }, (error) => {
      this.setState({ showBackdrop: false });
      return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
      this.setState({ showBackdrop: false });
      return response;
    }, (error) => {
      this.setState({ showBackdrop: false });
      return Promise.reject(error);
    });
  }

  render() {

    const { vertical, horizontal, open, autoHideDuration, message, severity } = this.state.snackBarProps;
    const showAlert = (newState) => () => {
      this.setState({ open: true, ...newState });
    };
    const setToken = (token) => {
      localStorage.setItem("acessToken", JSON.stringify(token));
      const newState = { ...this.state };
      this.setState({ authToken: token, ...newState });
    }
    const updateState = (key, val) => {
      this.setState({ [key]: val });
      console.log(this.state);
    }

    const handleClose = () => {
      const oldSnackBarProps = { ...this.state.snackBarProps };
      oldSnackBarProps.open = false;
      this.setState({ snackBarProps: oldSnackBarProps });
    };
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          {/* <div id="app" className="App bg-white h-100"> */}

          <Header></Header>
          <Container component='main' className='d-flex app p-0 bhooky-content'>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about-us" component={AboutUs} />
              <Route component={BecomeaPartner} path="/become-a-partner" />
              <Route path="/become-a-promoter" component={FindaRestaurant} />
              <Route path="/contact-us" component={ContactUs} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route path="/restaurants" component={BhookyUserHome} />
              <Route path="/privacy-statement" component={PrivacyStatement} />
              <Route path="/terms-and-conditions" component={TermsAndConditions} />
              <Route path="/:restaurantName/:id/order" component={RestaurantCheckout} />
              <Route path="/:reviews/:merchantid" component={Reviews} />
            </Switch>
          </Container>

          <Footer></Footer>

          {/* </div> */}

          {/* <AppSnackBar severity={severity} message={message} autoHideDuration={autoHideDuration} anchorOrigin={{ vertical, horizontal }} open={open} handleClose={handleClose} /> */}
          <Backdrop open={this.state.showBackdrop} className='backdrop'>
            <CircularProgress color="inherit" />
          </Backdrop>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
