
import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


const CLIENT_ID = '1075495427275-ec99kc6mc9namjdjjoec4fop8kv2omh5.apps.googleusercontent.com';


class FacebookButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogined: false,
            accessToken: ''
        };

        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    login(response) {
        if (response.accessToken) {
            this.setState(state => ({
                isLogined: true,
                accessToken: response.accessToken
            }));
        }
    }



    handleLoginFailure(response) {
        console.log(response);
        // alert('Failed to log in')
    }


    responseFacebook(response) {
        console.log(response);
    }

    render() {
        return (
            <div className='w-100 mr-3'>
                <FacebookLogin
                    appId="1163373707382823"
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                    onFailure={this.handleLoginFailure}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>This is my custom FB button</button>
                    )} />

                {this.state.accessToken ? <h5>Your Access Token: <br /><br /> {this.state.accessToken}</h5> : null}

            </div>
        )
    }
}

export default FacebookButton;