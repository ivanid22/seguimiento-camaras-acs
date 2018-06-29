import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import React from 'react';
import {browserHistory} from 'react-router';
import {NavBar} from './NavBar';

export class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
      inputPassword: '',
      inputEmail: '',
      inputConfirmPassword: '',
      error: '',
      passwordValidationState: '',
      emailValidationState: 'is-valid'
    }
  }

  componentDidUpdate() {


  }

  onEmailChange(e) {
    if(e) {
      this.setState({
        inputEmail: e.target.value
      });
    }
  }

  onPasswordChange(e) {
    if(e) {
      this.setState({
        inputPassword: e.target.value
      }, this.checkPasswordConsistency.bind(this));
    }
  }

  checkPasswordConsistency() {
    if(this.state.inputPassword !== this.state.inputConfirmPassword) {
      this.setState({
        passwordValidationState: 'is-invalid'
      })
    }
    else {
      this.setState({
        passwordValidationState: 'is-valid'
      });
    }
  }

  onConfirmPasswordChange(e) {
    if(e) {
      this.setState({
        inputConfirmPassword: e.target.value
      }, this.checkPasswordConsistency.bind(this));
    }

  }

  onSubmit(e) {
    e.preventDefault();
    console.log('successfully submitted');
    if((this.state.emailValidationState === 'is-valid') && (this.state.passwordValidationState === 'is-valid')) {
      Accounts.createUser({
        email: this.state.inputEmail,
        password: this.state.inputPassword
      }, (err) => {
        if(err) {
          this.setState({ error: err.reason });
        }
        else {
          browserHistory.replace('/');
        }
      });
    }
  }

  showErrors() {
    if(this.state.error !== '') {
      return (
        <div class="alert alert-danger">
          <strong>Error! </strong>
          {this.state.error}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="container">
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" value={this.state.inputEmail} onChange={this.onEmailChange.bind(this)} placeholder="ejemplo@ejemplo.com" required/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" value={this.state.inputPassword} onChange={this.onPasswordChange.bind(this)} required/>
              <label htmlFor="passwordConfirm">Confirmar password</label>
              <input type="password" className={'form-control ' + this.state.passwordValidationState} id="passwordConfirm" value={this.state.inputConfirmPassword} onChange={this.onConfirmPasswordChange.bind(this)} required/>
              <div className="invalid-feedback">Las contraseñas no coinciden</div>
            </div>
            <button type="submit" class="btn btn-primary">Crear cuenta</button>
          </form>
        </div>
      </div>
    )
  }
}
