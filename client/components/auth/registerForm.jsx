import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { registerRequest } from '../../reducers/authReducer'

import { Input, SubmitButton, ErrorMessage } from './styledElements'

const mapStateToProps = (state) => {
  return {
    register_status: state.register
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (payload) => dispatch(registerRequest(payload)),
  };
};

class RegisterFormContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      reenter_password: '',
      user_missing: false,
      invalid_username: false,
      password_missing: false,
      password_missmatch: false,
      invalid_register: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({invalid_register: (nextProps.register_status.error)})

  }

  attemptregister() {

    var invalid_email = (this.state.username.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) == null);

    if (this.state.username == '') {
      this.setState({user_missing: true});
      return
    }
    if (invalid_email) {
      this.setState({invalid_username: true});
      return
    }
    if (this.state.password == '') {
      this.setState({password_missing: true});
      return
    }

    if (this.state.password != this.state.reenter_password) {
      this.setState({password_missmatch: true});
      return
    }

    this.props.registerRequest({username: this.state.username, password: this.state.password})
  }

  onUserFieldKeyPress(e) {
    var username = e.target.value;
    this.setState({username: username, user_missing: false});
    if (e.nativeEvent.keyCode != 13) return;
    this.attemptregister()
  }

  onPasswordFieldKeyPress(e) {
    var password = e.target.value;
    this.setState({password: password, password_missing: false});
    if (e.nativeEvent.keyCode != 13) return;
    this.attemptregister()
  }

  onReenterPasswordFieldKeyPress(e) {
    var reenter_password = e.target.value;
    this.setState({reenter_password: reenter_password, password_missmatch: false});
    if (e.nativeEvent.keyCode != 13) return;
    this.attemptregister()
  }

  onClick(){
    this.attemptregister()
  }


  render() {
    return (
      <RegisterForm
        onUserFieldKeyPress = {(e) => this.onUserFieldKeyPress(e)}
        onPasswordFieldKeyPress = {(e) => this.onPasswordFieldKeyPress(e)}
        onReenterPasswordFieldKeyPress = {(e) => this.onReenterPasswordFieldKeyPress(e)}
        onClick = {() => this.onClick()}
        user_missing = {this.state.user_missing}
        invalid_username = {this.state.invalid_username}
        password_missing = {this.state.password_missing}
        password_missmatch = {this.state.password_missmatch}
        invalid_register = {this.state.invalid_register}
      />
    )
  }
}

const RegisterForm = function(props) {


  if (props.user_missing) {
    var error_message = 'Email Missing'
  } else if (props.invalid_username) {
    error_message = 'Invalid Email'
  } else if (props.password_missing) {
    error_message = 'Password Missing'
  } else if (props.password_missmatch) {
    error_message = 'Passwords do not match'
  } else if (props.invalid_register) {
    error_message = 'User already exists'
  } else {
    error_message = ''
  }

  return(
    <div>
        <h3> Register </h3>

        <Input type="email"
               onKeyUp={props.onUserFieldKeyPress}
               placeholder="Email"
        />

        <Input type="password"
               onKeyUp={props.onPasswordFieldKeyPress}
               placeholder="Password"
        />

        <Input type="password"
                 onKeyUp={props.onReenterPasswordFieldKeyPress}
                 placeholder="Retype Password"
          />

        <ErrorMessage>
          {error_message}
        </ErrorMessage>

        <SubmitButton onClick={props.onClick}> Register </SubmitButton>

    </div>
  );

};export default connect(mapStateToProps, mapDispatchToProps)(RegisterFormContainer);

