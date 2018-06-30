import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {routes} from '../imports/routes/routes';
import {Camaras} from '../imports/api/camaras';
import {Eventos} from '../imports/api/eventos';
import {onAuthChange} from '../imports/routes/routes';
import {Session} from 'meteor/session';
import ListaCamarasContainer from '../imports/ui/ListaCamaras';
import {Tracker} from 'meteor/tracker';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

Meteor.startup(() => {
    Session.set({
      camaraActiva: undefined
    });
    Tracker.autorun(() => {
        const user = Meteor.user();
        onAuthChange();
    })
    ReactDOM.render(routes, document.getElementById('app'))
})
