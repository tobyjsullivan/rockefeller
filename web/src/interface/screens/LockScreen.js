import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

const ScreenWrapper = styled.div``;
const Header = styled.h1``;
const Form = styled.div``;
const ControlGroup = styled.p``;
const PasswordLabel = styled.label.attrs({
  htmlFor: 'password'
})``;
const PasswordField = styled.input.attrs({
  id: 'password',
  type: 'password'
})``;
const LoginButton = styled.button``;

const mapDispatchToProps = (dispatch) => ({
  onLoginSubmit: (password) => dispatch({
    type: 'AUTH_SET_PASSWORD',
    payload: {password}
  })
});

class LockScreen extends Component {
  state = {
    passwordValue: ''
  };

  updatePasswordValue = (fieldValue) => {
    this.setState({passwordValue: fieldValue});
  }

  render() {
    const {onLoginSubmit} = this.props;
    const {passwordValue} = this.state;

    return (
      <ScreenWrapper>
        <Header>Locked!</Header>
        <Form>
          <ControlGroup>
            <PasswordLabel>Password</PasswordLabel>
            <PasswordField onChange={e => this.updatePasswordValue(e.target.value)} />
          </ControlGroup>
          <LoginButton onClick={() => onLoginSubmit(passwordValue)}>Login</LoginButton>
        </Form>
      </ScreenWrapper>
    );
  }
};

export default connect(undefined, mapDispatchToProps)(LockScreen);
