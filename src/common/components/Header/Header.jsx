import AppBar from "@material-ui/core/AppBar";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { Link, useHistory } from "react-router-dom";
import AppContext from "../AuthContext";
import "./Header.scss";
import { withRouter } from "react-router";
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
      fontFamily: "'BhookyFont'",
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
function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notiAnchorEl, setNotiAnchorEl] = React.useState(null);
  const appContext = useContext(AppContext);
  const open = Boolean(anchorEl);
  const openNoti = Boolean(notiAnchorEl);
  const { location } = props;
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotiMenuOpen = (event) => {
    setNotiAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNotiClose = () => {
    setNotiAnchorEl(null);
  };
  const history = useHistory();
  const signOut = () => {
    window.localStorage.clear();
    appContext.updateValue('authToken', localStorage.getItem('accessToken'));
    setNotiAnchorEl(null);
    setAnchorEl(null);
    history.push('/login');
  }
  const [loggedIn, setLoggedIn] = React.useState(true);
  // useEffect(() => {
  //   setLoggedIn(window.localStorage.accessToken?.length > 0)
  // });
  return (
    // <div className={`${classes.grow}`}>
    <AppBar position="static" className="header-app">
      <Toolbar className='h-100'>
        <Typography className={classes.title} variant="button" noWrap>
          <a href='/'>Bhooky </a>
        </Typography>
        <div className={classes.grow} />
        <Nav activeKey={location.pathname} id={location.pathname}>
          <Nav.Link as={Link} to="/about-us">
            About us
            </Nav.Link>
          <Nav.Link as={Link} to="/become-a-partner">
            Become a partner
            </Nav.Link>
          <Nav.Link as={Link} to="/become-a-promoter">
            Become a promoter
            </Nav.Link>
          <Nav.Link as={Link} to="/contact-us">
            Contact us
            </Nav.Link>
          <Nav.Link as={Link} to="/sign-in">
            Sign in
            </Nav.Link>
        </Nav>



      </Toolbar>
    </AppBar>
    // </div>
  );
}
export default Header = withRouter(Header);
