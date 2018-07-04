import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {withTracker} from 'meteor/react-meteor-data';
import {NavBar} from './NavBar';
import ListaEventos from './ListaEventos';
import {browserHistory} from 'react-router';

export class EventosContainerMobile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          { !!this.props.camaraActiva ? <ListaEventos/> : undefined }
          <div className="list-group">
            <button className="mt-3 btn btn-secondary" onClick={() => {browserHistory.replace('/')}}>Volver</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withTracker((props) => {
  return {
    camaraActiva: Session.get('camaraActiva')
  }
})(EventosContainerMobile)
