import {Meteor} from 'meteor/meteor';
import {Camaras} from '../api/camaras';
import {Eventos} from '../api/eventos';
import {ItemListaCamaras} from './ItemListaCamaras';
import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {browserHistory} from 'react-router';
import {ListGroup, ListGroupItem} from 'reactstrap';

export class ListaCamaras extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      camaraActiva: this.props.camaraActiva,
      error: ''
    }
  }

  renderList() {
    if(this.props.items.length !== 0) {
      return this.props.items.map((item) => {
          return <ItemListaCamaras key={item._id} item={item}/>
        });
    }
    else {
      return <h5>No existen camaras</h5>
    }
  }

  render() {
    return (
      <div className="list-group">
        {this.renderList()}
        <button className="btn btn-secondary mt-3" onClick={() => {browserHistory.replace('/agregarCamara')}}>Agregar camara</button>
      </div>
    );
  }
}

export default ListaCamarasContainer = withTracker((props) => {
  Meteor.subscribe('camaras');
  return({
    items: Camaras.find({}, {sort: [['ubicacion', 'desc'], ['nombre', 'asc']]}).fetch(),
    camaraActiva: Session.get('camaraActiva')
  })
})(ListaCamaras);
