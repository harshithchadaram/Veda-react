import AppBar from "@material-ui/core/AppBar";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useEffect } from "react";
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
import { Badge, Grid, IconButton, List, ListItem, SwipeableDrawer, TextField } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as _ from 'lodash';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { BhookyConstants } from '../../AppConstants';
import Geocode from "react-geocode";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddShoppingCartTwoToneIcon from '@material-ui/icons/AddShoppingCartTwoTone';
import { connect, useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { updateLocation } from "../redux/actions";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';

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
    list: {
      width: 200,
    },
    padding: {
      paddingRight: 30,
      cursor: "pointer",
    },
    sideBarIcon: {
      marginRight: 30,
      color: "black",
      cursor: "pointer",
      display: 'flex',
      alignSelf: 'start',
      marginTop: 30
    }
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
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);
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
  const [drawer, setDrawer] = React.useState(false);
  const [isResponsive, setIsResponsive] = React.useState(false);
  const [showinNewLine, setShowInNewLine] = React.useState(false);

  const [showSignUpDialog, setShowSignUpDialog] = React.useState(false);
  const [notiAnchorEl, setNotiAnchorEl] = React.useState(null);
  const [location, setLocation] = React.useState('');
  const [pathname, setPathname] = React.useState(window.location.pathname);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const openNoti = Boolean(notiAnchorEl);
  const { globalState, globalDispatch } = useContext(AppContext);
  const profileObj = JSON.parse(window.localStorage.getItem('profileObj'));
  const history = useHistory();

  store.subscribe(() => {
    setLocation(store.getState()['userLocation'][0].formatted_address);

    // history.push('/restaurants');
  })
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
  var options = {
    enableHighAccuracy: true,
    timeout: 2000,
    maximumAge: 10000
  };
  const getCurrentLocation = () => {
    Geocode.setApiKey(BhookyConstants.apiKey);
    setShowBackdrop(true);


    navigator.geolocation.getCurrentPosition(async function (position) {
      await Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
        response => {
          setShowBackdrop(false);
          dispatch(updateLocation(response.results));
          // history.push('/restaurants');
        },
        error => {
          setShowBackdrop(false);
          console.error(error);
        });
    }, (error) => {
      console.error(error);
      setShowBackdrop(false);
    });
  }
  const getLocation = () => {
    getCurrentLocation();
  }


  const [loggedIn, setLoggedIn] = React.useState(true);
  useEffect(() => {
    if (_.isEmpty(store.getState()['userLocation'])) {
      getCurrentLocation();
    }
    if (window.innerWidth <= 1250) {
      setIsResponsive(true);
    }
    if (window.innerWidth <= 550) {
      setShowInNewLine(true);
    }
    history.listen((location, action) => {
      setPathname(location.pathname);
    })
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 1250) {
        setIsResponsive(true);
      }
      else {
        setIsResponsive(false);
      }
      if (window.innerWidth <= 550) {
        setShowInNewLine(true);
      } else {
        setShowInNewLine(false);
      }
    });
  }, [location]);
  return (
    <div className={`${classes.grow}`}>
      <AppBar position="static" className="header-app h-auto">
        <Toolbar className='h-100 pr-0'>
          <div className={`${showinNewLine ? 'flex-column' : 'flex-row align-items-center'} d-flex `}>
            <Typography className={classes.title} variant="button" noWrap style={{ display: 'block' }}>
              <Nav.Link as={Link} to="/" href='#' style={{ textDecoration: 'none', fontSize: '25px' }} className='appName' >
                VuaciFood
            </Nav.Link>
              {/* <a href='/' style={{ textDecoration: 'none' }}>Bhooky </a> */}
            </Typography>
            {!_.isEqual(pathname, '/') && <TextField
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
              className=' m-3'
              InputProps={{
                endAdornment: showBackdrop ? <CircularProgress style={{ width: 20, height: 20, color: 'black' }} /> : <IconButton onClick={getLocation} style={{ color: 'black' }}><MyLocationIcon /></IconButton>
              }}
            />}
          </div>
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
          {isResponsive ?
            <Badge color="primary" variant="dot" invisible={false} className={classes.sideBarIcon}>
              <MenuIcon

                onClick={() => { setDrawer(true) }} />
            </Badge> :
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

                  <Nav.Link as={Link} active={globalState.isLoggedIn} href='#signin' onClick={toggleSignInDialog} to="#">
                    Sign In
                </Nav.Link>
                }
                <Nav.Link as={Link} to="/cart-summary" href='#cart'>
                  Cart
                <StyledBadge badgeContent={4} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </Nav.Link>
                {/* <IconButton aria-label="cart" className='mr-2'>
                <StyledBadge badgeContent={4} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton> */}
                {/* <Nav.Link as={Link} to="#" href='#cart'>
              Cart
            </Nav.Link> */}
              </Nav>
            </Navbar>
          }
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor='right'
        open={drawer}
        onClose={() => { setDrawer(false) }}
        onOpen={() => { setDrawer(true) }}>

        <div
          tabIndex={0}
          role="button"
          onClick={() => { setDrawer(false) }}
          onKeyDown={() => { setDrawer(false) }}>

          <List className={classes.list}>
            {globalState.isLoggedIn ?
              <div >
                <div className='d-flex pl-3 py-3' >
                  <Avatar alt={profileObj?.givenName?.toUpperCase()} src={profileObj?.imageUrl} />
                  <Typography display='block' variant="subtitle2" component='span' className='align-self-center px-2 bhooky-bold'>
                    {profileObj?.givenName?.toUpperCase()}
                  </Typography>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                  </IconButton>
                </div>
                <Nav.Link as={Link} onClick={() => { history.push('/profile') }} to="#" href='#profile'>
                  My Profile
                </Nav.Link>

              </div> :
              <Nav.Link as={Link} active={globalState.isLoggedIn} href='#signin' onClick={toggleSignInDialog} to="#">
                Sign In
                </Nav.Link>
            }
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

            <Nav.Link as={Link} to="/cart-summary" href='#cartsummary'>
              Cart
                <StyledBadge badgeContent={4} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </Nav.Link>
            {globalState.isLoggedIn && <Nav.Link as={Link} onClick={logoutUser} to="#" href='#logout'>
              Logout
            </Nav.Link>}
          </List>

        </div>
      </SwipeableDrawer>
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
  );
}
const mapStateToProps = (state) => {
  return {
    location: state.location
  };
}
export default connect(mapStateToProps)(Header);
