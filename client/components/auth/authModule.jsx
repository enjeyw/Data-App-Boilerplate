import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { loginRequest, logout } from '../../reducers/authReducer'

import { SubmitButton, PlainTextButton } from './styledElements'

import LoginForm from './loginForm.jsx'
import RegisterForm from './registerForm.jsx'


const mapStateToProps = (state) => {
  return {
    loggedIn: (state.login.token != null),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout:       () => dispatch(logout())
  };
};


class authModuleContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      moduleActive: false,
      registerActive: false
    };
  }

  handleLoginButton() {
    this.setState({moduleActive: true, registerActive: false})
  }

  handleRegisterButton() {
    this.setState({moduleActive: true, registerActive: true})
  }

  deactivateAuthModule() {
    this.setState({moduleActive: false})
  }

  render() {

    if (this.props.loggedIn) {
    var button = (
      <div>
        <SubmitButton onClick={this.props.logout} >
          Logout
        </SubmitButton>
      </div>
    )
  } else {
    var button = (
      <div>
        <SubmitButton onClick={() => this.handleLoginButton()} >
          Login
        </SubmitButton>
        <SubmitButton onClick={() => this.handleRegisterButton()} >
          Register
        </SubmitButton>
      </div>
    )
  }

  return (
    <div>
      { button }
      <AuthModule
        props = {{
        moduleActive: this.state.moduleActive,
        registerActive: this.state.registerActive,
        handleLoginButton: () => this.handleLoginButton(),
        handleRegisterButton: () => this.handleRegisterButton(),
        deactivateAuthModule: () => this.deactivateAuthModule(),
        loggedIn: this.props.loggedIn
        }}
      />
    </div>
  );

  }

}

const AuthModule = function( { props } ) {

  if (props.loggedIn) {
    var formcontents =(
      <ModalContent>
        Success!

        <BottomRow>
          <PlainTextButton onClick={props.deactivateAuthModule} >
            Close
          </PlainTextButton>
        </BottomRow>

      </ModalContent>
    )
  } else if (props.registerActive) {
    var formcontents =(
      <ModalContent>
        <RegisterForm/>
        <BottomRow>
          <PlainTextButton onClick={props.handleLoginButton} >
            Already Registered? Login
          </PlainTextButton>
          <PlainTextButton onClick={props.deactivateAuthModule} >
            Close
          </PlainTextButton>
        </BottomRow>
      </ModalContent>
      )
  } else {
    formcontents =(
      <ModalContent>
        <LoginForm/>
        <BottomRow>
          <PlainTextButton onClick={props.handleRegisterButton} >
            No account? Register
          </PlainTextButton>
          <PlainTextButton onClick={props.deactivateAuthModule} >
            Close
          </PlainTextButton>
        </BottomRow>
      </ModalContent>
      )
  }

  if (props.moduleActive && !props.loggedIn) {
    return(
      <Modal>
          {formcontents}
        <div style = {{width: '100%', height: '100%'}}
             onClick={props.deactivateAuthModule}>

        </div>
      </Modal>
    );
  } else {
    return (
      <div>

      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(authModuleContainer);

const Modal  = styled.div`
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;

const ModalContent  = styled.div`
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */

`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;

`
