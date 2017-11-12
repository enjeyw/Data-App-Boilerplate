import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

import { requestResource } from '../reducers/authenticedResourceReducer'

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestResource: () => dispatch(requestResource())
  };
};


const AuthenticatedResource = ({requestResource}) => {

  return (
    <div>

      <Button onClick={requestResource} >
        Get me some authenticated data!
      </Button>

    </div>
  );

};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedResource);

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
  font-size: 1.5em;
`;
