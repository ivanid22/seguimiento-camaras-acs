import React from 'react';
import {Session} from 'meteor/session';
import {ListGroup, ListGroupItem, Button} from 'reactstrap';

export class ItemListaCamaras extends React.Component {

  removeItem() {

  }

  itemClick(e) {
    Session.set({
      camaraActiva: this.props.item._id
    });
    const items = document.getElementsByClassName('list-group-item');
    for(var i=0; i<items.length; i++) {
      items[i].classList.remove('active');
    }
    e.target.classList.add('active');
  }

  render() {
    return (
      <a className="list-group-item list-group-item-action" onClick={this.itemClick.bind(this)}><b>{this.props.item.nombre}</b> - <i>{this.props.item.ubicacion}</i></a>
    )
  }

}
