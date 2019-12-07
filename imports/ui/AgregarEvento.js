import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Camaras} from '../api/camaras';
import {Eventos} from '../api/eventos';
import {browserHistory} from 'react-router';
import {withTracker} from 'meteor/react-meteor-data';
import {NavBar} from './NavBar';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';

//change

export class AgregarEvento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      descripcionEvento: 'Reseteo por software',
      selectedOption: 'soft',
      momento: new Date(),
      buttonClassState: '',
      hasSubmitted: false
    }
    moment.locale('es');
  }

  cerrar() {
    this.setState({
      descripcionEvento: 'Reseteo por software',
      error: '',
      selectedOption: 'soft',
      hasSubmitted: false,
      buttonClassState: ''
    });
    browserHistory.replace('/');
  }

  handleToggle(e) {
    this.setState({selectedOption: e.target.value});
    if(e.target.value==='soft') {
      this.setState({descripcionEvento: 'Reseteo por software'});
    }
    else if (e.target.value==='hard') {
      this.setState({descripcionEvento: 'Reseteo fisico'});
    }
    else {
      this.setState({descripcionEvento: this.refs.txtarea.value});
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({buttonClassState: ' disabled'});
    if(!this.state.hasSubmitted) {
      if(Session.get('camaraActiva')) {
          this.setState({hasSubmitted: true});
          const res = Meteor.call('eventos.insert', Session.get('camaraActiva'), moment(this.state.momento).valueOf(), this.state.descripcionEvento, (err, res) => {
            if(!err) {
              this.cerrar();
            }
            else {
              console.log(err);
              this.setState({error: err.details, buttonClassState: '', hasSubmitted: false});
            }
          });
      }
    }
  }

  setDate(e) {
    this.setState({momento: e});
  }


  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="descripcionEventoGroup" id="softResetId" value="soft" checked={this.state.selectedOption === 'soft'} onChange={this.handleToggle.bind(this)}/>
                <label className="form-check-label" htmlFor="softResetId">Reseteo por software</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="descripcionEventoGroup" id="hardResetId" value="hard" checked={this.state.selectedOption === 'hard'} onChange={this.handleToggle.bind(this)}/>
                <label className="form-check-label" htmlFor="hardResetId">Reseteo fisico</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="descripcionEventoGroup" id="otherId" value="other" checked={this.state.selectedOption === 'other'} onChange={this.handleToggle.bind(this)}/>
                <label className="form-check-label" htmlFor="hardResetId">Otro</label>
                <div className="form-group">
                  <label htmlFor="descripcionText">Descripcion</label>
                  <textarea className="form-control" rows="5" id="descripcionText" ref="txtarea" disabled={!(this.state.selectedOption === 'other')} value={this.state.descripcionEvento} onChange={(e) =>{this.setState({descripcionEvento: e.target.value})}}/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="pickerId" className="mr-3">Fecha y hora</label>
                <DateTimePicker id="pickerId" value={this.state.momento} onChange={this.setDate.bind(this)}/>
              </div>
            </div>
            {this.state.error !== '' ? <div className="alert alert-danger"><strong>Error! </strong><p>{this.state.error}</p></div> : undefined }
            <button className={`btn btn-primary${this.state.buttonClassState}`} type="submit">Agregar</button>
            <button className="btn btn-secondary ml-3" onClick={() => {browserHistory.replace('/')}}>Cancelar</button>
          </form>
        </div>
      </div>

    )
  }
}
