import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useContext, useEffect } from 'react';
import cx from 'clsx';
import { useHistory } from 'react-router-dom';
import axios from '../../api/axios';
import AppContext from '../../common/components/store/AuthContext';
import { useForm } from '../../common/components/Form/useForm';
import GoogleBtn from '../../common/components/GoogleButton';
import FacebookButton from '../../common/components/FacebookButton';
import { Card, CardContent, CardHeader, CardMedia, IconButton } from '@material-ui/core';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import MuiPhoneNumber from "material-ui-phone-number";
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import * as _ from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import './Profile.scss';
const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
        margin: 'auto',
        borderRadius: spacing(2), // 16px
        transition: '0.3s',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        position: 'relative',
        maxWidth: 500,
        marginLeft: 'auto',
        overflow: 'initial',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        marginTop: spacing(20),
        marginBottom: spacing(20),
        overflow: 'hidden',
        alignItems: 'center',
    },
    media: {
        width: '100px',
        height: 100,
        borderRadius: spacing(30),
        backgroundColor: '#fff',
        position: 'relative',

    },

    editBtn: {
        height: 35,
        width: 35,
        marginRight: 5
    }
}));
export default function Profile(props) {
    const classes = useStyles();
    const profileObj = JSON.parse(window.localStorage.getItem('profileObj'));
    const [isEdit, setIsEdit] = React.useState(false);
    const initialFValues = {
        email: profileObj?.email,
        password: "",
        mobile: "",
        address: ""
    };
    useEffect(() => {
        axios
            .post(`/user/info`, {})
            .then(res => {
                console.log(res);
            })
            .catch((error) => {
            })

    }, [])


    const {
        values,
        setValues,
        handleInputChange,
    } = useForm(initialFValues, true);
    const {
        button: buttonStyles,
        ...contentStyles
    } = useBlogTextInfoContentStyles();
    const editOrSaveProfile = () => {
        setIsEdit(!isEdit);
    }
    const shadowStyles = useOverShadowStyles();
    return (
        <Card className={cx(classes.root, shadowStyles.root)}>
            <CardContent>
                <div className='d-flex justify-content-between my-2'>
                    <CardMedia
                        className={classes.media}
                        image={
                            profileObj?.imageUrl
                        }
                    />
                    <Typography component="h1" variant="h5" className={cx(contentStyles, 'user-name bhooky-semibold')}>
                        Hi {profileObj?.givenName}
                    </Typography>

                    <IconButton className={cx(buttonStyles, classes.editBtn, 'profileBtn')} onClick={editOrSaveProfile}>{isEdit ? <DoneIcon /> : <EditIcon />}</IconButton>
                </div>
                <MuiPhoneNumber
                    defaultCountry='us'
                    onlyCountries={['in', 'us']}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="mobile"
                    value={values.mobile}
                    placeholder='Phone Number'
                    label="Mobile"
                    name="mobile"
                    autoComplete="mobile"
                    countryCodeEditable={false}
                    disabled={!isEdit}
                    onChange={event => handleInputChange({ target: { name: 'mobile', value: event } })}
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
                    autoComplete="email"
                    disabled={!isEdit}
                    onChange={handleInputChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"

                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={values.password}
                    disabled={!isEdit}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                />
                <TextField
                    variant="outlined"
                    margin="normal"

                    fullWidth
                    name="address"
                    label="Address"
                    type="address"
                    id="address"
                    value={values.address}
                    disabled={!isEdit}
                    onChange={handleInputChange}
                    autoComplete="address"
                />


            </CardContent>
        </Card>
    )
}