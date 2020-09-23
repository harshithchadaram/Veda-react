import axios from 'axios';
import React from "react";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const instance = axios.create({
    baseURL: 'http://bhooky-env.eba-9f4up7yv.ap-south-1.elasticbeanstalk.com/',
    headers: { 'auth-type': 'user' }
});

export default instance;