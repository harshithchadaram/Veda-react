
import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { BhookyConstants } from '../AppConstants';


const CLIENT_ID = BhookyConstants.oAuthId;

class GoogleButton extends React.Component {
    state = { isLogined: false }
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
    }

    login(response) {
        console.log(response);
        if (response.accessToken) {
            this.props.history.pushState(null, 'Bhooky', '/restaurants');
            this.setState(state => ({
                isLogined: true,
                accessToken: response.accessToken
            }));
        }
    }

    handleLoginFailure(response) {
        // alert('Failed to log in')
    }


    render() {
        return (
            <div className='w-100 mr-3'>
                <GoogleLogin
                    className='w-100 justify-content-center'
                    clientId={CLIENT_ID}
                    buttonText={this.props.btnText}
                    onSuccess={this.props.handleLogin}
                    onFailure={this.handleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    responseType='code,token'
                />

                {/* {this.state.accessToken ? <h5>Your Access Token: <br /><br /> {this.state.accessToken}</h5> : null} */}

            </div>
        )
    }
}

export default GoogleButton;