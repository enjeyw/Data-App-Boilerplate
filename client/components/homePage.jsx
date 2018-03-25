import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { loginRequest, logout } from '../reducers/authReducer'

import AuthenticatedResource from './authenticatedResourceButton.jsx'
import LoginForm from './auth/loginForm.jsx'
import AuthModule from './auth/authModule.jsx'



const mapStateToProps = (state) => {
  return {
    loggedIn: (state.login.token != null),
    resourceData: state.authenticatedResourceData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout:       () => dispatch(logout())
  };
};


const HomePage = ({logout, loggedIn, resourceData}) => {

  if (resourceData.isRequesting) {
    var dataMessage = 'Loading'
  } else if (resourceData.error) {
    dataMessage = resourceData.error
  } else if (resourceData.data) {
    dataMessage = 'foo: ' + resourceData.data.foo
  } else {
    dataMessage = ''
  }

  return (
    <WrapperDiv>

        <AuthModule/>
        <Message>
          {loggedIn? 'Logged in!':'Not logged in'}
        </Message>
        <AuthenticatedResource/>
        <Message>
          { dataMessage }
        </Message>
    </WrapperDiv>
  );

};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const WrapperDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
  font-size: 1.5em;
`;

const Message = styled.div`
  margin: 1em;
`;

