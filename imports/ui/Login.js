import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {browserHistory, Link} from 'react-router';
import {NavBar} from './NavBar';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      inputName: '',
      inputPassword: '',
      rememberMeChecked: true
    }
  }

  displayErrors() {
    if(this.state.error !== '') {
      return (
        <div className="alert alert-danger">
          <strong>Error! </strong> {this.state.error}
        </div>
      )
    }
    else return undefined
  }

  passwordInputChange(e) {
    this.setState({
      inputPassword: e.target.value
    });
  }

  emailInputChange(e) {
    this.setState({
      inputEmail: e.target.value
    });
  }

  toggleRemember(e) {
    this.setState({
      rememberMeChecked: e.target.checked
    });
  }

  onSubmit(e) {
    e.preventDefault();
    Meteor.loginWithPassword(this.state.inputEmail, this.state.inputPassword, (err) => {
      if(err) {
        this.setState({
          error: err.reason
        });
      }
      else {
        browserHistory.replace('/');
      }
    })
  }


  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" value={this.state.inputEmail} onChange={this.emailInputChange.bind(this)} required/>
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input type="password" className="form-control" id="pwd" value={this.state.inputPassword} onChange={this.passwordInputChange.bind(this)} required/>
            </div>
            <div className="form-group form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" checked={this.state.rememberMeChecked} onChange={this.toggleRemember.bind(this)}/> Recordarme
              </label>
            </div>
            <p className="mb-3"><Link to="/signup">Crear cuenta</Link></p>
            <button type="submit" className="btn btn-primary mb-3">Ingresar</button>
          </form>
          {this.displayErrors()}
        </div>
      </div>
    )
  }
}
