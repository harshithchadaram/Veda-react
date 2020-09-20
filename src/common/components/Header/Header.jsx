import AppBar from "@material-ui/core/AppBar";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AppContext from "../store/AuthContext";
import "./Header.scss";
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from '../../../api/axios';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import SignInDialog from "../SignInDialog/SignInDialog";
import SignUpDialog from "../SignUpDialog/SignUpDialog";
import { IconButton, TextField } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as _ from 'lodash';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { BhookyConstants } from '../../AppConstants';
import Geocode from "react-geocode";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddShoppingCartTwoToneIcon from '@material-ui/icons/AddShoppingCartTwoTone';
const useStyles = makeStyles((theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      fontWeight: 600,
      color: 'black',
      fontSize: 25,
      fontFamily: "'BhookyFont-Regular'",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
  })
);
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
    className='user-menu'
  />
));
const StyledMenuItem = withStyles((theme) => ({

}))(MenuItem);

function Header(props) {
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutUser = () => {
    setAnchorEl(null);
    globalDispatch({ type: "LOGOUT" });
    console.log(globalState.isLoggedIn);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showSignInDialog, setShowSignInDialog] = React.useState(false);
  const [showSignUpDialog, setShowSignUpDialog] = React.useState(false);
  const [notiAnchorEl, setNotiAnchorEl] = React.useState(null);
  const [location, setLocation] = React.useState("");

  const toggleSignInDialog = () => {
    setShowSignInDialog(!showSignInDialog);
    setShowSignUpDialog(false);
  }
  const handleSignUp = () => {
    setShowSignInDialog(false);
    setShowSignUpDialog(!showSignUpDialog);
  }

  const onSuccessfulLogin = (response) => {
    debugger;
    axios
      .post(`/auth/login/`,)
      .then(res => {
        const data = res.data;
        if (data.success) {

        }
      })
      .catch((error) => {
      })

    window.localStorage.setItem('accessToken', response.accessToken);
    window.localStorage.setItem('profileObj', JSON.stringify(response.profileObj));
    globalDispatch({ type: "LOGIN" });
    setShowSignInDialog(false);
    setShowSignUpDialog(false)
    history.push('/restaurants');
  }
  const onSuccessfulSignup = (response, formValues, locationDetails, isFormSignup) => {
    debugger;
    console.log(response, formValues, locationDetails);
    const locationObj = locationDetails.results[0];
    const cityName = _.find(locationObj.address_components, l => _.includes(l.types, "locality")).long_name;


    const userObj = {
      userDetails: {
        userName: formValues.firstName + " " + formValues.lastName,
        email: formValues.email,
        mobile: formValues.mobile,
        password: formValues.password,
        profilePic: isFormSignup ? "" : formValues.imageUrl,
        signupType: isFormSignup ? "custom" : "google",
        location: {
          type: "Point",
          coordinates: [
            locationObj.geometry.location.lat,
            locationObj.geometry.location.lng
          ]
        },
        addresss: {
          city: cityName,
          street: _.trim(_.split(locationObj.formatted_address, cityName, 1), ', '),
          pincode: _.find(locationObj.address_components, l => _.includes(l.types, "postal_code")).long_name
        },
        city: cityName
      }
    }
    console.log(userObj);
    axios
      .post(`/user/create`, userObj)
      .then(res => {
        const data = res.data;
        if (data.success) {
          window.localStorage.setItem('accessToken', formValues.password);
          globalDispatch({ type: "LOGIN" });
          setShowSignInDialog(false);
          setShowSignUpDialog(false);
          setLocation(locationDetails.results[0].formatted_address);
          history.push('/restaurants');
        }
      })
      .catch((error) => {
      })


  }
  const [showBackdrop, setShowBackdrop] = React.useState(false);
  const getCurrentLocation = () => {
    Geocode.setApiKey(BhookyConstants.apiKey);
    setShowBackdrop(true);

    // history.push('/restaurants');
    navigator.geolocation.watchPosition(async function (position) {
      await Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
        response => {
          setShowBackdrop(false);
          setLocation(response.results[0].formatted_address);
        },
        error => {
          setShowBackdrop(false);
          console.error(error);
        });
    }, () => {
      setShowBackdrop(false);
    });
  }
  const open = Boolean(anchorEl);
  const openNoti = Boolean(notiAnchorEl);
  const { globalState, globalDispatch } = useContext(AppContext);
  const profileObj = JSON.parse(window.localStorage.getItem('profileObj'));
  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(true);
  // useEffect(() => {
  //   setLoggedIn(window.localStorage.accessToken?.length > 0)
  // });
  return (
    // <div className={`${classes.grow}`}>
    <AppBar position="static" className="header-app">
      <Toolbar className='h-100 pr-0'>
        <Typography className={classes.title} variant="button" noWrap>
          <a href='/' style={{ textDecoration: 'none' }}>Bhooky </a>
        </Typography>
        <TextField
          label="Locate Me"
          variant="standard"
          margin="normal"
          name="location"
          type="location"
          id="location"
          value={location}
          disabled={true}
          autoComplete="location"
          title={location}
          className='ml-4 m-3'
          InputProps={{
            endAdornment: showBackdrop ? <CircularProgress style={{ width: 20, height: 20, color: 'black' }} /> : <IconButton onClick={getCurrentLocation} style={{ color: 'black' }}><MyLocationIcon /></IconButton>
          }}
        />
        <div className={classes.grow} />
        {/* <Nav activeKey={location.pathname} id={location.pathname}>
          <Nav.Link as={Link} to="/about-us" href='#'>
            About us
            </Nav.Link>
          <Nav.Link as={Link} to="/become-a-partner" href='#'>
            Become a partner
            </Nav.Link>
          <Nav.Link as={Link} to="/become-a-promoter" href='#'>
            Become a promoter
            </Nav.Link>
          <Nav.Link as={Link} to="/contact-us" href='#'>
            Contact us
            </Nav.Link>
          <Nav.Link as={Link} to="/sign-in" href='#'>
            Sign in
            </Nav.Link>
        </Nav> */}
        <Navbar>
          <Nav>
            <Nav.Link as={Link} to="/about-us" href='#aboutus'>
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/become-a-partner" href='#becomeapartner'>
              Become a Partner
            </Nav.Link>
            <Nav.Link as={Link} to="/become-a-promoter" href='#becomeapromoter'>
              Become a Promoter
            </Nav.Link>
            <Nav.Link as={Link} to="/contact-us" href='#contactus'>
              Contact Us
            </Nav.Link>
            {globalState.isLoggedIn ?
              <div >
                <div className='d-flex'>
                  <Avatar alt={profileObj?.givenName?.toUpperCase()} src={profileObj?.imageUrl} />
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </div>
                <StyledMenu
                  id="user-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem onClick={() => { history.push('/profile') }}>
                    <ListItemText primary="My Profile" />
                  </StyledMenuItem>

                  <StyledMenuItem onClick={logoutUser} >
                    <ListItemText primary="Logout" />
                  </StyledMenuItem>
                </StyledMenu>
              </div> :
              <div >
                <Nav.Link as={Link} active={globalState.isLoggedIn} href='#signin' onClick={toggleSignInDialog} to="#">
                  Sign In
                </Nav.Link>
                <SignInDialog show={showSignInDialog}
                  onClose={toggleSignInDialog}
                  onSuccessfulLogin={onSuccessfulLogin}
                  onSignup={handleSignUp}>
                </SignInDialog>
                <SignUpDialog show={showSignUpDialog}
                  onClose={handleSignUp}
                  onSignin={toggleSignInDialog}
                  onSuccessfulSignup={onSuccessfulSignup}>
                </SignUpDialog>
              </div>
            }
            <Nav.Link as={Link} to="#" href='#cart'>
              Cart
            </Nav.Link>
          </Nav>
        </Navbar>
      </Toolbar>
    </AppBar>
    // </div>
  );
}
export default Header = withRouter(Header);
