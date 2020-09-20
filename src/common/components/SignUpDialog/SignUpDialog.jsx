import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Typography, IconButton, Backdrop } from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import AppContext from '../store/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from '../Form/useForm';
import PropTypes from 'prop-types';
import FacebookButton from '../FacebookButton';
import GoogleButton from '../GoogleButton';
import { CloseButton } from 'react-bootstrap';
import MuiPhoneNumber from "material-ui-phone-number";
import * as _ from 'lodash';
import { useEffect } from 'react';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { BhookyConstants } from '../../AppConstants';
import Geocode from "react-geocode";
import { useState } from 'react';
// import './SignInDialog.scss';
const useStyles = makeStyles((theme) => ({
    paper: {

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
        margin: theme.spacing(2, 0, 2),
    },
}));
function SignUpDialog(props) {
    const classes = useStyles();
    const initialFValues = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        mobile: ""
    };
    const [showBackdrop, setShowBackdrop] = React.useState(false);
    const [locationObj, setLocationObj] = React.useState({ results: [] });
    const [isFormSignUp, setIsFormSignUp] = React.useState(true);
    const getCurrentLocation = () => {
        Geocode.setApiKey(BhookyConstants.apiKey);
        setShowBackdrop(true);

        // history.push('/restaurants');
        navigator.geolocation.getCurrentPosition(async function (position) {
            await Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                response => {
                    setShowBackdrop(false);
                    // handleInputChange({ target: { name: 'location', value: response.results[0].formatted_address } })
                    setLocationObj(response);
                    console.log(response, values);
                },
                error => {
                    setShowBackdrop(false);
                    console.error(error);
                });
        }, () => {
            setShowBackdrop(false);
        });
    }
    const {
        values,
        setValues,
        errors,
        resetForm,
        handleInputChange,
    } = useForm(initialFValues, true);

    const signUp = (data) => {
        initialFValues.firstName = data.profileObj.givenName;
        initialFValues.lastName = data.profileObj.familyName;
        initialFValues.email = data.profileObj.email;
        initialFValues.password = data.accessToken;
        initialFValues.imageUrl = data.profileObj.imageUrl;
        initialFValues.mobile = "";
        setLocationObj({ results: [] });
        setValues(initialFValues);
        setIsFormSignUp(false);
        console.log(initialFValues);
    }



    return (
        <div>
            <Dialog open={props.show} han aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <div className='d-flex justify-content-between'>

                        <Typography variant='h5' className='bhooky-bold'>{!isFormSignUp && 'Complete'} Sign Up</Typography>

                        <CloseButton onClick={() => { props.onClose(); resetForm(); setIsFormSignUp(true); }} className='mb-2' ></CloseButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className={classes.paper}>
                        <form className={classes.form} noValidate>
                            <div className='d-flex'>
                                {isFormSignUp && <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="text"
                                    id="firstName"
                                    value={values.firstName}
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="firstName"
                                    onChange={handleInputChange}
                                    autoFocus
                                    className='mr-3'
                                />}
                                {isFormSignUp && <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="text"
                                    id="lastName"
                                    value={values.lastName}
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lastName"
                                    onChange={handleInputChange}
                                />}
                            </div>
                            <MuiPhoneNumber
                                defaultCountry='in'
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
                            {isFormSignUp && <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="text"
                                id="email"
                                value={values.email}
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={handleInputChange}

                            />}
                            {isFormSignUp && <TextField
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
                            />}
                            <TextField
                                label="Location"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="location"
                                type="location"
                                id="location"
                                value={locationObj?.results[0] ? locationObj?.results[0]?.formatted_address : ""}
                                disabled={true}
                                autoComplete="location"
                                inputRef={input => input && input.focus()}
                                InputProps={{
                                    endAdornment: showBackdrop ? <CircularProgress style={{ width: 20, height: 20, color: 'black' }} /> : <IconButton onClick={getCurrentLocation} style={{ color: 'black' }}><MyLocationIcon /></IconButton>
                                }}
                            />
                        </form>
                    </div>
                    <Typography variant="caption" display="block" gutterBottom>
                        By clicking Sign up or continue with Facebook or Google you agree to the <a href="https://termly.io/resources/templates/terms-and-conditions-template/" target='blank' className='bhooky-semibold'>Terms and Conditions</a> and <a href="https://termly.io/resources/templates/terms-and-conditions-template/" target='blank' className='bhooky-semibold'>Privacy Statement</a>
                    </Typography>
                </DialogContent>
                <DialogActions className='flex-column mx-3 pt-0 pb-4 my-auto'>
                    <Button
                        type="submit"
                        onClick={event => props.onSuccessfulSignup(event, values, locationObj, isFormSignUp)}
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={_.values(values).some(v => v === "") || _.isEmpty(locationObj.results[0])}
                        className={classes.submit}
                    >
                        Sign Up</Button>
                    <div className='d-flex justify-content-between w-100 option-btns'>
                        <Link href="#" variant="body2" onClick={props.onSignin}>
                            Already have an account? Sign In
                        </Link>
                    </div>
                    {isFormSignUp && <div class="or-div my-2">
                        <hr class="or-hr" />
                        <span class="or-span">or</span>
                    </div>}
                    {isFormSignUp && <div className='d-flex justify-content-between w-100'>
                        <GoogleButton className='w-100' btnText='Sign Up' handleLogin={signUp} />
                        <FacebookButton />
                    </div>}
                </DialogActions>
            </Dialog>

        </div>
    );
}
SignUpDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default SignUpDialog;
