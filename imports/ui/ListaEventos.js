import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Camaras} from '../api/camaras';
import {Eventos} from '../api/eventos';
import AgregarEventoFormContainer from './AgregarEventoForm';
import moment from 'moment';
import {browserHistory} from 'react-router';

class ListaEventosItem extends React.Component {

  removeEvento() {
    if(window.confirm('Seguro desea eliminar el evento?')) {
      Meteor.call('eventos.remove', this.props.evento._id);
    }

  }

  render() {
     return(
       <p> <button className="btn btn-secondary" onClick={this.removeEvento.bind(this)}>Eliminar</button> <strong>{moment(this.props.evento.timestamp).format('D/M/Y H:mm')}</strong> {this.props.evento.descripcion}</p>
     )
  }
}

export class ListaEventos extends React.Component {

  renderEventos() {
    if(this.props.eventos.length !== 0) {
      return(
        this.props.eventos.map((evento) => {
          return (
            <ListaEventosItem key={evento._id} evento={evento}/>
          )
        })
      );
    } else {
      return <h3>No hay eventos</h3>
    }
  }

  render() {
    return(
      <div>
        {this.renderEventos()}
        {!!Session.get('camaraActiva') ? <div className="desktopcontent"><button className="btn btn-primary" onClick={() => {browserHistory.replace('/add')}}>Agregar evento</button></div> : undefined }
        {!!Session.get('camaraActiva') ? <div className="mobilecontent"><button className="btn btn-primary" onClick={() => {browserHistory.replace('/add')}}>Agregar evento</button></div> : undefined }

      </div>
    )
  }
}

export default ListaEventosContainer = withTracker((props) => {
  console.log(Session.get('camaraActiva'));
  Meteor.subscribe('eventos', Session.get('camaraActiva'));
  return {
      eventos: Eventos.find().fetch()
  };
})(ListaEventos);
