import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, Link, Switch, browserHistory} from 'react-router';
import {AppHeader} from '../ui/AppHeader';
import Dashboard from '../ui/Dashboard';
import {AgregarEvento} from '../ui/AgregarEvento';
import AgregarCamara from '../ui/AgregarCamaraForm';
import {Signup} from '../ui/Signup';
import {Login} from '../ui/Login';
import EventosContainerMobile from '../ui/EventosContainerMobile';

export const publicRoutes = ['/login', '/signup', '/about'];
export const privateRoutes = ['/camaras', '/add', '/'];

export const onAuthChange = () => {
    const now = browserHistory.getCurrentLocation().pathname;
    if(!Meteor.user() && privateRoutes.includes(now)) {
      browserHistory.replace('/login');
    }
    if(Meteor.user() && publicRoutes.includes(now)) {
      browserHistory.replace('/');
    }
}

const enterCallback = () => {
  console.log('Entering ' + browserHistory.getCurrentLocation().pathname);
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Dashboard} onEnter={enterCallback}/>
    <Route path="/add" component={AgregarEvento} onEnter={enterCallback}/>
    <Route path="/signup" component={Signup} onEnter={enterCallback}/>
    <Route path="/login" component={Login} onEnter={enterCallback}/>
    <Route path="/camaras" component={Dashboard}/>
    <Route path="/agregarCamara" component={AgregarCamara}/>
    <Route path="/eventos" component={EventosContainerMobile}/>
  </Router>
);
