import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Camaras} from '../api/camaras';
import {Meteor} from 'meteor/meteor';

export class DetalleCamara extends React.Component {

  renderInfo() {
    if(this.props.camara) {
      return(
        <div>
          <h1>{this.props.camara.nombre}</h1>
          <h2>{this.props.camara.ubicacion}</h2>
        </div>
      )
    } else {
      return <h1>Ninguna camara seleccionada</h1>
    }
  }

  render() {
    return(
      <div>
        {this.renderInfo()}
      </div>
    );
  }
}

export default DetalleCamaraContainer = withTracker((props) => {
  Meteor.subscribe('camaras');
  return {
    camara: Camaras.findOne({_id: Session.get('camaraActiva')})
  }
})(DetalleCamara);
