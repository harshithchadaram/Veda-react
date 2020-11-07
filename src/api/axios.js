import axios from 'axios';
import React from "react";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const instance = axios.create({
    baseURL: 'https://staging.vuacifoodapp.com/',
    headers: { 'auth-type': 'user' }
});

export default instance;