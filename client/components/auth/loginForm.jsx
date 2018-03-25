import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { loginRequest } from '../../reducers/authReducer'

import { Input, SubmitButton, ErrorMessage } from './styledElements'

const mapStateToProps = (state) => {
  return {
    login_status: state.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (payload) => dispatch(loginRequest(payload)),
  };
};

class LoginFormContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      user_missing: false,
      password_missing: false,
      invalid_login: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({invalid_login: (nextProps.login_status.error)})

  }

  attemptlogin() {
    if (this.state.username == '') {
      this.setState({user_missing: true});
      return
    }
    if (this.state.password == '') {
      this.setState({password_missing: true});
      return
    }
    this.props.loginRequest({username: this.state.username, password: this.state.password})
  }

  onUserFieldKeyPress(e) {
    var username = e.target.value;
    this.setState({username: username, user_missing: false, invalid_login: false});
    if (e.nativeEvent.keyCode != 13) return;
    this.attemptlogin()
  }

  onPasswordFieldKeyPress(e) {
    var password = e.target.value;
    this.setState({password: password, password_missing: false, invalid_login: false});
    if (e.nativeEvent.keyCode != 13) return;
    this.attemptlogin()
  }

  onClick(){
    this.attemptlogin()
  }


  render() {
    return (
      <LoginForm
        onUserFieldKeyPress = {(e) => this.onUserFieldKeyPress(e)}
        onPasswordFieldKeyPress = {(e) => this.onPasswordFieldKeyPress(e)}
        onClick = {() => this.onClick()}
        user_missing = {this.state.user_missing}
        password_missing = {this.state.password_missing}
        invalid_login = {this.state.invalid_login}
      />
    )
  }
}

const LoginForm = function(props) {


  if (props.user_missing) {
    var error_message = 'Email Missing'
  } else if (props.password_missing) {
    error_message = 'Password Missing'
  } else if (props.invalid_login) {
    error_message = 'Incorrect email or password'
  } else {
    error_message = ''
  }

  return(
    <div>

        <h3> Login </h3>

        <Input type="email"
               id="UserField"
               onKeyUp={props.onUserFieldKeyPress}
               placeholder="Email"
        />

        <Input type="password"
               id="PasswordField"
               onKeyUp={props.onPasswordFieldKeyPress}
               placeholder="Password"
        />

        <ErrorMessage>
          {error_message}
        </ErrorMessage>

        <SubmitButton onClick={props.onClick}> Login </SubmitButton>

    </div>
  );

};export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);

