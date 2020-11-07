import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Typography } from '@material-ui/core';
import AppContext from '../store/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from '../Form/useForm';
import PropTypes from 'prop-types';
import FacebookButton from '../FacebookButton';
import GoogleButton from '../GoogleButton';
import { CloseButton } from 'react-bootstrap';
import './SignInDialog.scss';
import * as _ from 'lodash';
import MuiPhoneNumber from "material-ui-phone-number";
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
function SignInDialog(props) {
    const classes = useStyles();
    const initialFValues = {
        mobile: "",
        password: ""
    };
    const { globalState, globalDispatch } = useContext(AppContext);
    const history = useHistory();

    const {
        values,
        setValues,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true);

    const loginUser = (event) => {

    }

    return (
        <div>
            <Dialog open={props.show} han aria-labelledby="form-dialog-title">
                <div className='d-flex justify-content-between'>
                    <DialogTitle id="form-dialog-title">
                        <Typography variant='h5' className='bhooky-bold'>Sign In</Typography>
                    </DialogTitle>
                    <CloseButton onClick={event => { props.onClose(); resetForm(); }} className='mr-4 mb-2'></CloseButton>
                </div>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
          </DialogContentText> */}
                    <div className={classes.paper}>
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
                        </form>
                    </div>
                </DialogContent>
                <DialogActions className='flex-column mx-3 pt-0 my-auto'>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={_.values(values).some(v => v === "")}
                        className={classes.submit}
                    >
                        Sign In</Button>
                    <div className='d-flex justify-content-between w-100 mb-3 option-btns'>
                        <Link href="#" variant="body2" >
                            Forgot password?
                        </Link>

                        <Link href="#" variant="body2" onClick={event => { props.onSignup(); resetForm(); }}>
                            Don't have an account? Sign Up
                        </Link>
                    </div>
                    {/* <div class="or-div mb-2">
                        <hr class="or-hr" />
                        <span class="or-span">or</span>
                    </div> */}
                    {/* <div className='d-flex mb-4 justify-content-between w-100'>
                        <GoogleButton className='w-100' btnText='Sign In' handleLogin={props.onSuccessfulLogin} />
                        <FacebookButton />
                    </div> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}
SignInDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default SignInDialog;
