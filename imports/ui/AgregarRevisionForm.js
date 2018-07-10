import React from 'react';
import {Meteor} from 'meteor/meteor';
import {NavBar} from './NavBar';
import {Revisiones} from '../api/revisiones';
import {browserHistory} from 'react-router';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';

const defaultMessage = 'Camaras operativas. Sin observaciones';

export default class AgregarRevisionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      hasSubmitted: false,
      btnClass: '',
      detallesText: defaultMessage,
      fieldHasChanged: false,
      momento: new Date()
    }
  }

  onDetallesChange(e) {
    this.setState({
      detallesText: e.target.value
    });
  }

  onDetallesFocus(e) {
    document.getElementById('detallesId').select();
  }

  setDate(e) {
    this.setState({momento: e});
  }

  onSubmit(e) {
    e.preventDefault();
    if(!this.state.hasSubmitted) {
      this.setState({
        hasSubmitted: true,
        btnClass: 'disabled'
      });
      Meteor.call('revisiones.insert', moment(this.state.momento).valueOf(), this.state.detallesText, (err, res) => {
        if(!err) {
          browserHistory.replace('/');
        }
        else {
          this.setState({
            error: err.reason,
            btnClass: '',
            hasSubmitted: false
          })
        }
      });
    }
  }

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="detallesId">Detalles</label>
              <textarea id="detallesId" className="form-control" rows="3" value={this.state.detallesText} onChange={this.onDetallesChange.bind(this)} onFocus={this.onDetallesFocus.bind(this)} />
            </div>
            <div className="form-group">
              <label htmlFor="pickerId" className="mr-3">Fecha y hora</label>
              <DateTimePicker id="pickerId" value={this.state.momento} onChange={this.setDate.bind(this)}/>
            </div>
            <button className={`btn btn-primary ${this.state.btnClass}`} type="submit">Agregar</button>
            <button className="btn btn-secondary pull-right ml-2" onClick={() =>{ browserHistory.replace('/revisiones') }}>Cancelar</button>
          </form>
        </div>
      </div>
    )
  }

}
