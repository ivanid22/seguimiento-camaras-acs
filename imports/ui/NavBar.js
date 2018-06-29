import React from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';
import NavbarUserPanel from './NavbarUserPanel';
import {browserHistory} from 'react-router';

  export class NavBar extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <nav className="navbar navbar-expand-md bg-light navbar-light container-fuild bg-dark navbar-dark mb-5">
          <div className="container">
          <a className="navbar-brand" href="#" onClick={() => {browserHistory.replace('/')}}>Seguimiento de camaras</a>


          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link">Camaras</a>
              </li>
              <li className="nav-item">
                <a className="nav-link"  onClick={() => {alert('NYI')}}>Ubicaciones</a>
              </li>
              {/* <NavbarUserPanel/> */}
            </ul>
            <ul className="navbar-nav ml-auto">
              <NavbarUserPanel/>
            </ul>
          </div>
        </div>
        </nav>
      )
    }
  }
