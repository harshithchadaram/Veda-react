import axios from 'axios';
import React from "react";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const instance = axios.create({
    baseURL: 'http://bhookyapi-env.eba-whwnnhzk.ap-south-1.elasticbeanstalk.com/',
    headers: { 'auth-type': 'merchant', 'Authorization': 'Bearer ' + window.localStorage.accessToken }
});

export default instance;