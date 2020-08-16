import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './footer.scss'
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    main: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 10),
        marginTop: 'auto',
        backgroundColor: 'black'
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (

        <footer className={`${classes.footer} text-center`}>
            <div className="d-flex justify-content-between m-auto footer-icons">
                <FontAwesomeIcon icon={faFacebook} color='white' />
                <FontAwesomeIcon icon={faInstagram} color='white' />
                <FontAwesomeIcon icon={faTwitter} color='white' />
            </div>

        </footer>

    );
}